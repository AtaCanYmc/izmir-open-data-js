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
            const mockResponse = {
                fields: [
                    { type: "int", id: "_id" },
                    { type: "numeric", id: "HAT_NO" },
                    { type: "numeric", id: "YON" },
                    { type: "numeric", id: "BOYLAM" },
                    { type: "numeric", id: "ENLEM" }
                ],
                records: [
                    [1, 5, 1, 26.9913, 38.389],
                    [2, 5, 1, 26.9911, 38.389]
                ]
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHatGuzergahlari();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/datastore/dump/543f2249-c734-48e4-8739-72efbbfc843c?format=json'
            );
            expect(result.records).toEqual(mockResponse.records);
            expect(result.fields.length).toBe(5);
        });

        it("getHatGuzergahlariParsed nesne formatında döndürür", async () => {
            const mockResponse = {
                fields: [
                    { type: "int", id: "_id" },
                    { type: "numeric", id: "HAT_NO" },
                    { type: "numeric", id: "YON" },
                    { type: "numeric", id: "BOYLAM" },
                    { type: "numeric", id: "ENLEM" }
                ],
                records: [
                    [1, 5, 1, 26.9913, 38.389],
                    [2, 5, 1, 26.9911, 38.389]
                ]
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHatGuzergahlariParsed();

            expect(result).toEqual([
                { _id: 1, HAT_NO: 5, YON: 1, BOYLAM: 26.9913, ENLEM: 38.389 },
                { _id: 2, HAT_NO: 5, YON: 1, BOYLAM: 26.9911, ENLEM: 38.389 }
            ]);
        });

        it("getHatGuzergahlari metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getHatGuzergahlari).toBeDefined();
            expect(typeof api.eshot.getHatGuzergahlari).toBe('function');
        });
    });

    describe("eshot.getBaglantiTipleri", () => {
        it("ESHOT bağlantı tiplerini doğru parametrelerle çeker", async () => {
            const mockRecords = [
                { _id: 1, BAGLANTI_TIP_ID: 1, BAGLANTI_TIPI: "METRO" },
                { _id: 2, BAGLANTI_TIP_ID: 2, BAGLANTI_TIPI: "IZBAN" },
                { _id: 3, BAGLANTI_TIP_ID: 3, BAGLANTI_TIPI: "VAPUR" }
            ];

            const mockResult = {
                include_total: true,
                resource_id: 'c228da75-adfd-422a-a480-2a4c7ffa7586',
                records: mockRecords,
                limit: 100,
                total: 5
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockResult })
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getBaglantiTipleri();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=c228da75-adfd-422a-a480-2a4c7ffa7586&limit=100&offset=0'
            );
            expect(result.records).toEqual(mockRecords);
            expect(result.total).toBe(5);
        });

        it("getBaglantiTipleri metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getBaglantiTipleri).toBeDefined();
            expect(typeof api.eshot.getBaglantiTipleri).toBe('function');
        });
    });

    describe("otopark.getUcretler", () => {
        it("otopark ücretlerini doğru parametrelerle çeker", async () => {
            const mockRecords = [
                { _id: 1, "Otopark / Fiyat": "Alsancak Punta Katlı Otoparkı", "0-2 saat": 150, "2-4 saat": 180 }
            ];

            const mockResult = {
                include_total: true,
                resource_id: 'b45d2e9f-f258-476e-a12d-d0ff62471ee0',
                records: mockRecords,
                limit: 100,
                total: 10
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockResult })
            });

            const api = new IzmirAPI();
            const result = await api.otopark.getUcretler();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=b45d2e9f-f258-476e-a12d-d0ff62471ee0&limit=100&offset=0'
            );
            expect(result.records).toEqual(mockRecords);
            expect(result.total).toBe(10);
        });

        it("getUcretler metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.otopark.getUcretler).toBeDefined();
            expect(typeof api.otopark.getUcretler).toBe('function');
        });
    });
});

