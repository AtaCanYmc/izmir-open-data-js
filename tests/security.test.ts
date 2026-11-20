import { describe, expect, it, vi } from "vitest";
import { IzmirClient } from "../src/client.js";

describe("Security Audit & Protections", () => {
    describe("1. CSV Prototype Pollution Protection", () => {
        it("CSV başlıklarındaki __proto__, constructor ve prototype alanlarını yok sayar", async () => {
            const maliciousCSV = `__proto__;constructor;prototype;HAT_NO;HAT_ADI
{"polluted":true};malicious;malicious;5;NARLIDERE`;

            const mockFetch = vi.fn().mockResolvedValue({
                ok: true,
                text: async () => maliciousCSV,
            });
            vi.stubGlobal("fetch", mockFetch);

            const client = new IzmirClient();
            const results = await client.getCSV<any>("https://test.com/malicious.csv");

            // Prototype kirlenmemeli
            expect((Object.prototype as any).polluted).toBeUndefined();
            expect(results).toHaveLength(1);
            expect(results[0].HAT_NO).toBe(5);
            expect(results[0].HAT_ADI).toBe("NARLIDERE");
            expect(results[0].__proto__).not.toEqual('{"polluted":true}');

            vi.unstubAllGlobals();
        });
    });

    describe("2. Path Traversal & SSRF Protection", () => {
        it("client.get '../' içeren yolları engeller", async () => {
            const client = new IzmirClient();
            await expect(client.get("../../../etc/passwd")).rejects.toThrow("Geçersiz veya güvensiz istek yolu");
        });

        it("client.get harici protokol (http://, https://) içeren yolları engeller", async () => {
            const client = new IzmirClient();
            await expect(client.get("https://malicious-server.com/api")).rejects.toThrow(
                "Geçersiz veya güvensiz istek yolu",
            );
        });

        it("client.getCKAN güvensiz aksiyon parametrelerini engeller", async () => {
            const client = new IzmirClient();
            await expect(client.getCKAN("../../escape_action")).rejects.toThrow("Geçersiz veya güvensiz CKAN aksiyonu");
        });

        it("client.getCKANDump resourceId encode edilir", async () => {
            const mockFetch = vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ data: [] }),
            });
            vi.stubGlobal("fetch", mockFetch);

            const client = new IzmirClient();
            await client.getCKANDump("res-id/with/slash");

            expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining("res-id%2Fwith%2Fslash?format=json"));

            vi.unstubAllGlobals();
        });
    });
});
