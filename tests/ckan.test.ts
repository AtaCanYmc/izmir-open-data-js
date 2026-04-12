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
            const mockResponse = {
                fields: [
                    { type: "int", id: "_id" },
                    { type: "numeric", id: "HAT_NO" },
                    { type: "text", id: "HAT_ADI" },
                    { type: "text", id: "HAT_BASLANGIC" },
                    { type: "text", id: "HAT_BITIS" }
                ],
                records: [
                    [1, 5, "NARLIDERE - KUYULAR İSKELE", "NARLIDERE", "KUYULAR İSKELE"],
                    [2, 6, "ARIKENT - KUYULAR İSK.", "ARIKENT", "KUYULAR İSKELE"]
                ]
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHatlar();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/datastore/dump/bd6c84f8-49ba-4cf4-81f8-81a0fbb5caa3?format=json'
            );
            expect(result.records).toEqual(mockResponse.records);
            expect(result.fields.length).toBe(5);
        });

        it("getHatlarParsed nesne formatında döndürür", async () => {
            const mockResponse = {
                fields: [
                    { type: "int", id: "_id" },
                    { type: "numeric", id: "HAT_NO" },
                    { type: "text", id: "HAT_ADI" },
                    { type: "text", id: "GUZERGAH_ACIKLAMA" },
                    { type: "text", id: "ACIKLAMA" },
                    { type: "text", id: "HAT_BASLANGIC" },
                    { type: "text", id: "HAT_BITIS" }
                ],
                records: [
                    [1, 5, "NARLIDERE - KUYULAR İSKELE", "MİTHAT PAŞA CAD.", "", "NARLIDERE", "KUYULAR İSKELE"],
                    [2, 6, "ARIKENT - KUYULAR İSK.", "MİTHAT PAŞA CAD.", "", "ARIKENT", "KUYULAR İSKELE"]
                ]
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHatlarParsed();

            expect(result).toEqual([
                { _id: 1, HAT_NO: 5, HAT_ADI: "NARLIDERE - KUYULAR İSKELE", GUZERGAH_ACIKLAMA: "MİTHAT PAŞA CAD.", ACIKLAMA: "", HAT_BASLANGIC: "NARLIDERE", HAT_BITIS: "KUYULAR İSKELE" },
                { _id: 2, HAT_NO: 6, HAT_ADI: "ARIKENT - KUYULAR İSK.", GUZERGAH_ACIKLAMA: "MİTHAT PAŞA CAD.", ACIKLAMA: "", HAT_BASLANGIC: "ARIKENT", HAT_BITIS: "KUYULAR İSKELE" }
            ]);
        });

        it("getHatlar metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getHatlar).toBeDefined();
            expect(typeof api.eshot.getHatlar).toBe('function');
        });
    });

    describe("eshot.getHareketSaatleri", () => {
        it("ESHOT hareket saatlerini doğru parametrelerle çeker", async () => {
            const mockResponse = {
                fields: [
                    { type: "int", id: "_id" },
                    { type: "numeric", id: "HAT_NO" },
                    { type: "numeric", id: "TARIFE_ID" },
                    { type: "text", id: "GIDIS_SAATI" },
                    { type: "text", id: "DONUS_SAATI" },
                    { type: "numeric", id: "SIRA" },
                    { type: "text", id: "GIDIS_ENGELLI_DESTEGI" },
                    { type: "text", id: "DONUS_ENGELLI_DESTEGI" },
                    { type: "text", id: "BISIKLETLI_GIDIS" },
                    { type: "text", id: "BISIKLETLI_DONUS" },
                    { type: "text", id: "GIDIS_ELEKTRIKLI_OTOBUS" },
                    { type: "text", id: "DONUS_ELEKTRIKLI_OTOBUS" }
                ],
                records: [
                    [1, 5, 1, "06:00", "06:35", 1, "True", "True", "True", "True", "False", "False"],
                    [2, 5, 1, "06:30", "07:05", 2, "True", "True", "True", "True", "False", "False"]
                ]
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHareketSaatleri();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/datastore/dump/c6fa6046-f755-47d7-b69e-db6bb06a8b5a?format=json'
            );
            expect(result.records).toEqual(mockResponse.records);
            expect(result.fields.length).toBe(12);
        });

        it("getHareketSaatleriParsed nesne formatında döndürür", async () => {
            const mockResponse = {
                fields: [
                    { type: "int", id: "_id" },
                    { type: "numeric", id: "HAT_NO" },
                    { type: "numeric", id: "TARIFE_ID" },
                    { type: "text", id: "GIDIS_SAATI" },
                    { type: "text", id: "DONUS_SAATI" },
                    { type: "numeric", id: "SIRA" },
                    { type: "text", id: "GIDIS_ENGELLI_DESTEGI" },
                    { type: "text", id: "DONUS_ENGELLI_DESTEGI" },
                    { type: "text", id: "BISIKLETLI_GIDIS" },
                    { type: "text", id: "BISIKLETLI_DONUS" },
                    { type: "text", id: "GIDIS_ELEKTRIKLI_OTOBUS" },
                    { type: "text", id: "DONUS_ELEKTRIKLI_OTOBUS" }
                ],
                records: [
                    [1, 5, 1, "06:00", "06:35", 1, "True", "True", "True", "True", "False", "False"]
                ]
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHareketSaatleriParsed();

            expect(result).toEqual([
                { _id: 1, HAT_NO: 5, TARIFE_ID: 1, GIDIS_SAATI: "06:00", DONUS_SAATI: "06:35", SIRA: 1, GIDIS_ENGELLI_DESTEGI: "True", DONUS_ENGELLI_DESTEGI: "True", BISIKLETLI_GIDIS: "True", BISIKLETLI_DONUS: "True", GIDIS_ELEKTRIKLI_OTOBUS: "False", DONUS_ELEKTRIKLI_OTOBUS: "False" }
            ]);
        });

        it("getHareketSaatleri metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getHareketSaatleri).toBeDefined();
            expect(typeof api.eshot.getHareketSaatleri).toBe('function');
        });
    });

    describe("eshot.getDuraklar", () => {
        it("ESHOT duraklarını doğru parametrelerle çeker", async () => {
            const mockResponse = {
                fields: [
                    { type: "int", id: "_id" },
                    { type: "numeric", id: "DURAK_ID" },
                    { type: "text", id: "DURAK_ADI" },
                    { type: "numeric", id: "ENLEM" },
                    { type: "numeric", id: "BOYLAM" },
                    { type: "text", id: "DURAKTAN_GECEN_HATLAR" }
                ],
                records: [
                    [1, 10005, "Bahribaba", 38.4152683626015, 27.1276395272209, "32"],
                    [2, 10007, "Bahribaba", 38.415144105211, 27.1277200912719, "29-30"]
                ]
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getDuraklar();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/datastore/dump/0c791266-a2e4-4f14-82b8-9a9b102fbf94?format=json'
            );
            expect(result.records).toEqual(mockResponse.records);
            expect(result.fields.length).toBe(6);
        });

        it("getDurakalarParsed nesne formatında döndürür", async () => {
            const mockResponse = {
                fields: [
                    { type: "int", id: "_id" },
                    { type: "numeric", id: "DURAK_ID" },
                    { type: "text", id: "DURAK_ADI" },
                    { type: "numeric", id: "ENLEM" },
                    { type: "numeric", id: "BOYLAM" },
                    { type: "text", id: "DURAKTAN_GECEN_HATLAR" }
                ],
                records: [
                    [1, 10005, "Bahribaba", 38.4152683626015, 27.1276395272209, "32"],
                    [2, 10007, "Bahribaba", 38.415144105211, 27.1277200912719, "29-30"]
                ]
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getDurakalarParsed();

            expect(result).toEqual([
                { _id: 1, DURAK_ID: 10005, DURAK_ADI: "Bahribaba", ENLEM: 38.4152683626015, BOYLAM: 27.1276395272209, DURAKTAN_GECEN_HATLAR: "32" },
                { _id: 2, DURAK_ID: 10007, DURAK_ADI: "Bahribaba", ENLEM: 38.415144105211, BOYLAM: 27.1277200912719, DURAKTAN_GECEN_HATLAR: "29-30" }
            ]);
        });

        it("getDuraklar metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getDuraklar).toBeDefined();
            expect(typeof api.eshot.getDuraklar).toBe('function');
        });
    });

    describe("eshot.getHatGuzergahlari", () => {
        it("ESHOT hat güzergahlarını CSV'den çeker", async () => {
            const mockCSV = `HAT_NO;YON;BOYLAM;ENLEM
5;1;26.9899;38.3926
5;1;26.9899;38.3927`;

            mockFetch.mockResolvedValueOnce({
                ok: true,
                text: async () => mockCSV
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHatGuzergahlari();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-hat-guzergahlari.csv'
            );
            expect(result).toEqual([
                { HAT_NO: 5, YON: 1, BOYLAM: 26.9899, ENLEM: 38.3926 },
                { HAT_NO: 5, YON: 1, BOYLAM: 26.9899, ENLEM: 38.3927 }
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

