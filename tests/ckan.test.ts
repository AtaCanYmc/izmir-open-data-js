import { afterEach, describe, expect, it, vi } from "vitest";
import { IzmirAPI } from "../src/index";
import { IzmirClient } from "../src/client";

// Global fetch'i mock'la
const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

afterEach(() => {
    vi.clearAllMocks();
});

describe("CKAN API testleri", () => {
    describe("IzmirClient.getCKAN", () => {
        it("doğru URL ve parametrelerle fetch çağrısı yapar", async () => {
            const mockResult = {
                records: [{ HAT_NO: 100, HAT_ADI: "Test Hat" }],
                total: 1
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockResult })
            });

            const client = new IzmirClient();
            const result = await client.getCKAN('datastore_search', {
                resource_id: 'test-resource',
                limit: 50
            });

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=test-resource&limit=50'
            );
            expect(result).toEqual(mockResult);
        });

        it("API başarısız olduğunda hata fırlatır", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: false, error: { message: "Resource not found" } })
            });

            const client = new IzmirClient();

            await expect(client.getCKAN('datastore_search', { resource_id: 'invalid' }))
                .rejects.toThrow("Resource not found");
        });

        it("HTTP hatası olduğunda CKAN hatası fırlatır", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 500
            });

            const client = new IzmirClient();

            await expect(client.getCKAN('datastore_search', { resource_id: 'test' }))
                .rejects.toThrow("CKAN API response error: 500");
        });

        it("ağ hatası olduğunda CKAN hatası fırlatır", async () => {
            mockFetch.mockRejectedValueOnce(new Error("Network error"));

            const client = new IzmirClient();

            await expect(client.getCKAN('datastore_search', { resource_id: 'test' }))
                .rejects.toThrow("CKAN Hatası: Network error");
        });
    });

    describe("eshot.getHatlar", () => {
        it("ESHOT hatlarını doğru parametrelerle çeker", async () => {
            const mockRecords = [
                { _id: 1, HAT_NO: 5, HAT_ADI: "NARLIDERE - KUYULAR İSKELE", GUZERGAH_ACIKLAMA: "MİTHAT PAŞA CAD.", ACIKLAMA: "", HAT_BASLANGIC: "NARLIDERE", HAT_BITIS: "KUYULAR İSKELE" },
                { _id: 2, HAT_NO: 6, HAT_ADI: "ARIKENT - KUYULAR İSK.", GUZERGAH_ACIKLAMA: "MİTHAT PAŞA CAD.", ACIKLAMA: "", HAT_BASLANGIC: "ARIKENT", HAT_BITIS: "KUYULAR İSKELE" }
            ];

            const mockResult = {
                include_total: true,
                resource_id: 'bd6c84f8-49ba-4cf4-81f8-81a0fbb5caa3',
                fields: [
                    { type: "int", id: "_id" },
                    { type: "int", id: "HAT_NO" },
                    { type: "text", id: "HAT_ADI" }
                ],
                records_format: "objects",
                records: mockRecords,
                limit: 100,
                total: 2
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockResult })
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHatlar();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=bd6c84f8-49ba-4cf4-81f8-81a0fbb5caa3&limit=100&offset=0'
            );
            expect(result.records).toEqual(mockRecords);
            expect(result.total).toBe(2);
        });

        it("sayfalama parametreleri ile çalışır", async () => {
            const mockResult = {
                records: [],
                total: 500,
                limit: 50,
                offset: 100
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockResult })
            });

            const api = new IzmirAPI();
            await api.eshot.getHatlar(50, 100);

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=bd6c84f8-49ba-4cf4-81f8-81a0fbb5caa3&limit=50&offset=100'
            );
        });

        it("getHatlar metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getHatlar).toBeDefined();
            expect(typeof api.eshot.getHatlar).toBe('function');
        });
    });

    describe("eshot.getHareketSaatleri", () => {
        it("ESHOT hareket saatlerini doğru parametrelerle çeker", async () => {
            const mockRecords = [
                { _id: 1, HAT_NO: 5, TARIFE_ID: 1, GIDIS_SAATI: "06:00", DONUS_SAATI: "06:35", SIRA: 1, GIDIS_ENGELLI_DESTEGI: "True", DONUS_ENGELLI_DESTEGI: "True", BISIKLETLI_GIDIS: "True", BISIKLETLI_DONUS: "True", GIDIS_ELEKTRIKLI_OTOBUS: "False", DONUS_ELEKTRIKLI_OTOBUS: "False" }
            ];

            const mockResult = {
                include_total: true,
                resource_id: 'c6fa6046-f755-47d7-b69e-db6bb06a8b5a',
                records: mockRecords,
                limit: 100,
                total: 1
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockResult })
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHareketSaatleri();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=c6fa6046-f755-47d7-b69e-db6bb06a8b5a&limit=100&offset=0'
            );
            expect(result.records).toEqual(mockRecords);
            expect(result.total).toBe(1);
        });

        it("getHareketSaatleri metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getHareketSaatleri).toBeDefined();
            expect(typeof api.eshot.getHareketSaatleri).toBe('function');
        });
    });

    describe("eshot.getDuraklar", () => {
        it("ESHOT duraklarını doğru parametrelerle çeker", async () => {
            const mockRecords = [
                { _id: 1, DURAK_ID: 10005, DURAK_ADI: "Bahribaba", ENLEM: 38.41526836260150, BOYLAM: 27.12763952722090, DURAKTAN_GECEN_HATLAR: "32" },
                { _id: 2, DURAK_ID: 10007, DURAK_ADI: "Bahribaba", ENLEM: 38.415144105211, BOYLAM: 27.12772009127190, DURAKTAN_GECEN_HATLAR: "29-30" }
            ];

            const mockResult = {
                include_total: true,
                resource_id: '0c791266-a2e4-4f14-82b8-9a9b102fbf94',
                records: mockRecords,
                limit: 100,
                total: 11740
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockResult })
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getDuraklar();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=0c791266-a2e4-4f14-82b8-9a9b102fbf94&limit=100&offset=0'
            );
            expect(result.records).toEqual(mockRecords);
            expect(result.total).toBe(11740);
        });

        it("getDuraklar metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getDuraklar).toBeDefined();
            expect(typeof api.eshot.getDuraklar).toBe('function');
        });
    });

    describe("eshot.getHatGuzergahlari", () => {
        it("ESHOT hat güzergahlarını doğru parametrelerle çeker", async () => {
            const mockRecords = [
                { _id: 1, HAT_NO: 5, YON: 1, BOYLAM: 26.9913, ENLEM: 38.389 },
                { _id: 2, HAT_NO: 5, YON: 1, BOYLAM: 26.9911, ENLEM: 38.389 }
            ];

            const mockResult = {
                include_total: true,
                resource_id: '543f2249-c734-48e4-8739-72efbbfc843c',
                records: mockRecords,
                limit: 100,
                total: 30250
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockResult })
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHatGuzergahlari();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=543f2249-c734-48e4-8739-72efbbfc843c&limit=100&offset=0'
            );
            expect(result.records).toEqual(mockRecords);
            expect(result.total).toBe(30250);
        });

        it("getHatGuzergahlari metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getHatGuzergahlari).toBeDefined();
            expect(typeof api.eshot.getHatGuzergahlari).toBe('function');
        });
    });
});

