#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { IzmirAPI } from "../index.js";

const api = new IzmirAPI();

const DISALLOWED_PROPERTIES = new Set(["__proto__", "constructor", "prototype", "client", "cache", "clearCache"]);

const server = new Server(
    {
        name: "izmir-open-data-mcp",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {},
        },
    },
);

function getEndpoints() {
    const endpoints: string[] = [];
    for (const [namespace, service] of Object.entries(api)) {
        if (
            typeof service === "object" &&
            service !== null &&
            !DISALLOWED_PROPERTIES.has(namespace) &&
            Object.prototype.hasOwnProperty.call(api, namespace)
        ) {
            for (const methodName of Object.keys(service)) {
                if (!DISALLOWED_PROPERTIES.has(methodName) && typeof (service as any)[methodName] === "function") {
                    endpoints.push(`${namespace}.${methodName}`);
                }
            }
        }
    }
    return endpoints;
}

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "list_endpoints",
                description: "İzmir Open Data API içerisindeki tüm erişilebilir servisleri ve metodları listeler.",
                inputSchema: {
                    type: "object",
                    properties: {},
                },
            },
            {
                name: "call_endpoint",
                description: "İzmir Open Data API'sinden belirli bir servisi çağırır.",
                inputSchema: {
                    type: "object",
                    properties: {
                        namespace: {
                            type: "string",
                            description: "Servis adı (Örn: 'bisim', 'eshot', 'otopark')",
                        },
                        endpoint_name: {
                            type: "string",
                            description: "Çalıştırılacak metodun adı (Örn: 'getIstasyonList')",
                        },
                        args: {
                            type: "array",
                            description: "Metoda geçirilecek argümanlar dizisi (opsiyonel)",
                            items: {},
                        },
                    },
                    required: ["namespace", "endpoint_name"],
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "list_endpoints") {
        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(getEndpoints(), null, 2),
                },
            ],
        };
    }

    if (request.params.name === "call_endpoint") {
        const { namespace, endpoint_name, args = [] } = request.params.arguments as any;

        if (!namespace || !endpoint_name) {
            throw new Error("namespace ve endpoint_name gereklidir.");
        }

        if (DISALLOWED_PROPERTIES.has(namespace) || !Object.prototype.hasOwnProperty.call(api, namespace)) {
            throw new Error(`Yetkisiz veya geçersiz namespace: '${namespace}'.`);
        }

        const service = (api as any)[namespace];
        if (!service || typeof service !== "object") {
            throw new Error(`Namespace '${namespace}' bulunamadı.`);
        }

        if (DISALLOWED_PROPERTIES.has(endpoint_name) || !Object.prototype.hasOwnProperty.call(service, endpoint_name)) {
            throw new Error(`Metod '${endpoint_name}', '${namespace}' içerisinde bulunamadı.`);
        }

        const method = service[endpoint_name];
        if (typeof method !== "function") {
            throw new Error(`Metod '${endpoint_name}', '${namespace}' içerisinde geçerli bir fonksiyon değil.`);
        }

        try {
            const result = await method.apply(service, args);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result, null, 2),
                    },
                ],
            };
        } catch (error: any) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Endpoint çağrılırken hata oluştu: ${error.message}`,
                    },
                ],
                isError: true,
            };
        }
    }

    throw new Error(`Araç (Tool) bulunamadı: ${request.params.name}`);
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Izmir Open Data MCP Server başlatıldı (stdio üzerinden iletisim kuruyor)");
}

main().catch((error) => {
    console.error("MCP Sunucusu başlatılırken hata oluştu:", error);
    process.exit(1);
});
