import { describe, expect, it, vi } from "vitest";
import {
    calculateBackoff,
    CKANQueryBuilder,
    executeWithRetry,
    extractCoordinates,
    isRetryableError,
    IzmirAPI,
    IzmirClient,
    MemoryCache,
    toGeoJSON,
    toGeoJSONFeature,
} from "../src/index.js";

describe("v2.1.0 Roadmap Features", () => {
    describe("1. Configurable In-Memory Cache (MemoryCache)", () => {
        it("veriyi saklar ve geri okur", async () => {
            const cache = new MemoryCache({ defaultTtlMs: 1000 });
            await cache.set("key1", { name: "Konak" });

            expect(await cache.has("key1")).toBe(true);
            expect(await cache.get("key1")).toEqual({ name: "Konak" });
            expect(await cache.size()).toBe(1);
        });

        it("TTL süresi dolduğunda kaydı geçersiz kılar", async () => {
            const cache = new MemoryCache();
            // 20ms TTL ile ekle
            await cache.set("expireKey", "testValue", 20);
            expect(await cache.get("expireKey")).toBe("testValue");

            await new Promise((r) => setTimeout(r, 35));
            expect(await cache.get("expireKey")).toBeUndefined();
            expect(await cache.has("expireKey")).toBe(false);
        });

        it("maxItems aşıldığında en eski kaydı temizler (FIFO)", async () => {
            const cache = new MemoryCache({ maxItems: 2, defaultTtlMs: 10000 });
            await cache.set("k1", 1);
            await cache.set("k2", 2);
            await cache.set("k3", 3);

            expect(await cache.size()).toBe(2);
            expect(await cache.get("k1")).toBeUndefined();
            expect(await cache.get("k2")).toBe(2);
            expect(await cache.get("k3")).toBe(3);
        });

        it("delete ve clear metotları çalışır", async () => {
            const cache = new MemoryCache();
            await cache.set("a", 1);
            await cache.set("b", 2);

            expect(await cache.delete("a")).toBe(true);
            expect(await cache.get("a")).toBeUndefined();

            await cache.clear();
            expect(await cache.size()).toBe(0);
        });

        it("IzmirClient ve IzmirAPI cache aktif olduğunda mükerrer istek atmaz", async () => {
            const mockFetch = vi.fn().mockResolvedValue({
                ok: true,
                json: async () => [{ Id: 1, Adi: "Alsancak" }],
            });
            vi.stubGlobal("fetch", mockFetch);

            const api = new IzmirAPI({
                cache: true,
            });

            const res1 = await api.eczaneler.getNobetciList();
            const res2 = await api.eczaneler.getNobetciList();

            expect(res1).toEqual([{ Id: 1, Adi: "Alsancak" }]);
            expect(res2).toEqual([{ Id: 1, Adi: "Alsancak" }]);
            expect(mockFetch).toHaveBeenCalledTimes(1);

            api.clearCache();
            await api.eczaneler.getNobetciList();
            expect(mockFetch).toHaveBeenCalledTimes(2);

            vi.unstubAllGlobals();
        });
    });

    describe("2. Request Retry Middleware with Jitter", () => {
        it("geçici 500 hatasında yeniden deneyip sonraki denemede başarılı olur", async () => {
            let calls = 0;
            const operation = vi.fn().mockImplementation(async () => {
                calls++;
                if (calls < 3) {
                    throw new Error("API response error: 500");
                }
                return { success: true };
            });

            const result = await executeWithRetry(operation, {
                retries: 3,
                baseDelayMs: 5,
                maxDelayMs: 20,
                jitter: false,
            });

            expect(result).toEqual({ success: true });
            expect(calls).toBe(3);
        });

        it("tekrarlanamaz (örn. 404) hatalarda tekrar denemez", async () => {
            let calls = 0;
            const operation = vi.fn().mockImplementation(async () => {
                calls++;
                throw new Error("API response error: 404");
            });

            await expect(
                executeWithRetry(operation, {
                    retries: 3,
                    baseDelayMs: 5,
                }),
            ).rejects.toThrow("API response error: 404");

            expect(calls).toBe(1);
        });

        it("isRetryableError hata mesajlarını ve kodlarını doğru tespit eder", () => {
            const codes = [408, 429, 500, 502, 503, 504];
            expect(isRetryableError(new Error("API response error: 503"), codes)).toBe(true);
            expect(isRetryableError(new Error("fetch failed"), codes)).toBe(true);
            expect(isRetryableError(new Error("ECONNRESET"), codes)).toBe(true);
            expect(isRetryableError(new Error("API response error: 404"), codes)).toBe(false);
            expect(isRetryableError(null, codes)).toBe(false);
        });

        it("calculateBackoff jitter ve tavan sınırlarını (maxDelayMs) korur", () => {
            const config = {
                retries: 3,
                baseDelayMs: 100,
                maxDelayMs: 500,
                statusCodes: [500],
                jitter: false,
            };

            expect(calculateBackoff(1, config)).toBe(100);
            expect(calculateBackoff(2, config)).toBe(200);
            expect(calculateBackoff(3, config)).toBe(400);
            expect(calculateBackoff(4, config)).toBe(500); // capped at maxDelayMs

            const jitterDelay = calculateBackoff(2, { ...config, jitter: true });
            expect(jitterDelay).toBeGreaterThanOrEqual(0);
            expect(jitterDelay).toBeLessThanOrEqual(200);
        });

        it("IzmirClient retry seçeneğiyle entegre çalışır", async () => {
            let fetchCount = 0;
            const mockFetch = vi.fn().mockImplementation(async () => {
                fetchCount++;
                if (fetchCount === 1) {
                    return { ok: false, status: 502 };
                }
                return {
                    ok: true,
                    json: async () => ({ test: true }),
                };
            });
            vi.stubGlobal("fetch", mockFetch);

            const client = new IzmirClient({
                retry: {
                    retries: 2,
                    baseDelayMs: 5,
                    maxDelayMs: 20,
                },
            });

            const result = await client.get("test-path");
            expect(result).toEqual({ test: true });
            expect(fetchCount).toBe(2);

            vi.unstubAllGlobals();
        });
    });

    describe("3. CKAN Query Builder", () => {
        it("filtre ve sayfalama parametrelerini akıcı (fluent) arayüzle derler", () => {
            const client = new IzmirClient();
            const builder = new CKANQueryBuilder(client, "test-resource-id")
                .where("ILCE", "KONAK")
                .where("DURUM", "AKTIF")
                .search("Alsancak")
                .page(2, 25)
                .sort("TARIH", "desc")
                .fields(["ID", "ADI", "KONUM"]);

            const params = builder.toParams();

            expect(params.resource_id).toBe("test-resource-id");
            expect(params.q).toBe("Alsancak");
            expect(params.filters).toEqual({ ILCE: "KONAK", DURUM: "AKTIF" });
            expect(params.limit).toBe(25);
            expect(params.offset).toBe(25);
            expect(params.sort).toBe("TARIH desc");
            expect(params.fields).toEqual(["ID", "ADI", "KONUM"]);
        });

        it("execute metodu CKAN API üzerinden sorguyu çalıştırır", async () => {
            const mockFetch = vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({
                    success: true,
                    result: {
                        resource_id: "res-123",
                        total: 1,
                        records: [{ _id: 1, title: "Park" }],
                        fields: [{ id: "_id", type: "int" }],
                        records_format: "objects",
                        limit: 10,
                        include_total: true,
                    },
                }),
            });
            vi.stubGlobal("fetch", mockFetch);

            const api = new IzmirAPI();
            const result = await api.ckan.query("res-123").filter("MAHALLE", "GÖZTEPE").limit(10).execute();

            expect(result.records).toEqual([{ _id: 1, title: "Park" }]);
            expect(result.total).toBe(1);

            vi.unstubAllGlobals();
        });

        it("fetchAll ile sayfalama yaparak tüm kayıtları toplar", async () => {
            let offsetRequested = 0;
            const mockFetch = vi.fn().mockImplementation(async (url: string) => {
                const parsedUrl = new URL(url);
                const offset = parseInt(parsedUrl.searchParams.get("offset") || "0", 10);
                offsetRequested = offset;

                if (offset === 0) {
                    return {
                        ok: true,
                        json: async () => ({
                            success: true,
                            result: {
                                total: 3,
                                records: [{ id: 1 }, { id: 2 }],
                            },
                        }),
                    };
                }
                return {
                    ok: true,
                    json: async () => ({
                        success: true,
                        result: {
                            total: 3,
                            records: [{ id: 3 }],
                        },
                    }),
                };
            });
            vi.stubGlobal("fetch", mockFetch);

            const client = new IzmirClient();
            const builder = new CKANQueryBuilder(client, "res-all");
            const allRecords = await builder.fetchAll({ batchSize: 2, maxRecords: 10 });

            expect(allRecords).toHaveLength(3);
            expect(allRecords).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
            expect(offsetRequested).toBe(2);

            vi.unstubAllGlobals();
        });
    });

    describe("4. GeoJSON Geometry Normalizers", () => {
        it("CBS formatındaki koordinatları (BOYLAM, ENLEM) doğru ayıklar", () => {
            const cbsItem = {
                Adi: "Kültürpark",
                BOYLAM: 27.1428,
                ENLEM: 38.4237,
            };

            const coords = extractCoordinates(cbsItem);
            expect(coords).toEqual([27.1428, 38.4237]);
        });

        it("Yazılım Şube formatındaki koordinatları (LokasyonX/LokasyonY) GeoJSON [lon, lat] sırasına dönüştürür", () => {
            // LokasyonX = Enlem (lat), LokasyonY = Boylam (lon)
            const item = {
                Adi: "Otobüs Durağı",
                LokasyonX: "38.4192",
                LokasyonY: "27.1287",
            };

            const coords = extractCoordinates(item);
            expect(coords).toEqual([27.1287, 38.4192]);
        });

        it("Virgüllü ondalık sayıları da parse eder", () => {
            const item = {
                Boylam: "27,1500",
                Enlem: "38,4200",
            };

            const coords = extractCoordinates(item);
            expect(coords).toEqual([27.15, 38.42]);
        });

        it("Koordinatı eksik veya geçersiz nesneler için null döner", () => {
            expect(extractCoordinates({})).toBeNull();
            expect(extractCoordinates({ ENLEM: "invalid", BOYLAM: "123" })).toBeNull();
            expect(extractCoordinates({ ENLEM: 95, BOYLAM: 27 })).toBeNull(); // enlem > 90
        });

        it("toGeoJSONFeature tekil kaydı standart GeoJSON Feature nesnesine dönüştürür", () => {
            const poi = {
                Adi: "Konak Meydanı",
                Ilce: "Konak",
                BOYLAM: 27.1287,
                ENLEM: 38.4189,
            };

            const feature = toGeoJSONFeature(poi);
            expect(feature).not.toBeNull();
            expect(feature?.type).toBe("Feature");
            expect(feature?.geometry.type).toBe("Point");
            expect(feature?.geometry.coordinates).toEqual([27.1287, 38.4189]);
            expect(feature?.properties.Adi).toBe("Konak Meydanı");
            expect(feature?.properties.Ilce).toBe("Konak");
        });

        it("toGeoJSON dizi veya OnemliYerWrapper nesnesini FeatureCollection'a çevirir", () => {
            const rawData = [
                { Adi: "Nokta 1", BOYLAM: 27.1, ENLEM: 38.4 },
                { Adi: "Nokta 2", BOYLAM: 27.2, ENLEM: 38.5 },
                { Adi: "Koordinatsız Nokta" }, // Atlanmalı
            ];

            const featureCollection = toGeoJSON(rawData);
            expect(featureCollection.type).toBe("FeatureCollection");
            expect(featureCollection.features).toHaveLength(2);
            expect(featureCollection.features[0].geometry.coordinates).toEqual([27.1, 38.4]);
            expect(featureCollection.features[1].geometry.coordinates).toEqual([27.2, 38.5]);

            // Wrapper nesne testi
            const wrapped = { onemliyer: rawData };
            const fromWrapper = toGeoJSON(wrapped);
            expect(fromWrapper.features).toHaveLength(2);
        });
    });
});
