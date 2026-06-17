import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log("MCP Client başlatılıyor...");
  
  // MCP Sunucusunun yolunu belirliyoruz
  const serverPath = resolve(__dirname, "../src/mcp/index.ts");

  const transport = new StdioClientTransport({
    command: "npx",
    args: ["tsx", serverPath],
  });

  const client = new Client(
    {
      name: "izmir-mcp-test-client",
      version: "1.0.0",
    },
    {
      capabilities: {}
    }
  );

  console.log("MCP Sunucusuna bağlanılıyor...");
  await client.connect(transport);
  console.log("Bağlantı başarılı!\n");

  try {
    // 1. Sunucudaki araçları listele
    console.log("=== Sunucudaki Araçlar (Tools) Sorgulanıyor ===");
    const tools = await client.listTools();
    console.log(`Sunucu toplam ${tools.tools.length} adet araç destekliyor.`);
    tools.tools.forEach(tool => {
        console.log(`- ${tool.name}: ${tool.description}`);
    });
    console.log("\n");

    // 2. list_endpoints aracını çağır
    console.log("=== list_endpoints Aracı Çağrılıyor ===");
    const endpointsResult = await client.callTool({
        name: "list_endpoints",
        arguments: {}
    });
    
    // endpointsResult.content[0].text json string'dir
    const endpoints = JSON.parse((endpointsResult.content as any)[0].text);
    console.log(`Toplam ${endpoints.length} adet endpoint bulundu.`);
    console.log("İlk 5 endpoint:");
    console.log(endpoints.slice(0, 5));
    console.log("\n");

    // 3. call_endpoint aracını çağırarak veri çek (Örnek: bisim.getIstasyonList)
    console.log("=== call_endpoint Aracı Çağrılıyor (bisim.getIstasyonList) ===");
    const bisimResult = await client.callTool({
        name: "call_endpoint",
        arguments: {
            namespace: "bisim",
            endpoint_name: "getIstasyonList"
        }
    });

    if (bisimResult.isError) {
        console.error("Hata oluştu:", (bisimResult.content as any)[0].text);
    } else {
        const istasyonlar = JSON.parse((bisimResult.content as any)[0].text);
        console.log(`Başarıyla ${istasyonlar.length} adet BİSİM istasyonu çekildi.`);
        console.log("İlk istasyon örneği:");
        console.log(istasyonlar[0]);
    }

  } catch (error) {
    console.error("Beklenmeyen hata:", error);
  } finally {
    // Bağlantıyı kapat
    console.log("\nBağlantı kapatılıyor...");
    await client.close();
  }
}

main().catch(console.error);
