import { afterEach, describe, expect, it, vi } from "vitest";
import { IzmirAPI } from "../src/index.js";
import { TUVALET_RESOURCES } from "../src/endpoints/tuvalet.js";
import { ITFAIYE_RESOURCES } from "../src/endpoints/itfaiye.js";
import { IZUM_RESOURCES } from "../src/endpoints/izum.js";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

afterEach(() => {
    vi.clearAllMocks();
});

describe("Yeni Modül Testleri", () => {
    const api = new IzmirAPI();

    describe("CKAN Modülü (api.ckan)", () => {
        it("searchPackages veri setlerini arar", async () => {
            const mockPackages = {
                count: 1,
                results: [
                    {
                        id: "pkg-1",
                        name: "akilli-tuvaletler",
                        title: "Akıllı Tuvaletler",
                        num_resources: 1,
                        num_tags: 2,
                        resources: [],
                        tags: [],
                        metadata_created: "2024-01-01",
                        metadata_modified: "2024-01-02",
                    },
                ],
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockPackages }),
            });

            const result = await api.ckan.searchPackages("tuvalet", { rows: 5 });

            expect(mockFetch).toHaveBeenCalledWith(
                "https://acikveri.bizizmir.com/api/3/action/package_search?q=tuvalet&rows=5",
            );
            expect(result.count).toBe(1);
            expect(result.results[0].name).toBe("akilli-tuvaletler");
        });

        it("getPackage tek bir paketi getirir", async () => {
            const mockPackage = {
                id: "pkg-1",
                name: "akilli-tuvaletler",
                title: "Akıllı Tuvaletler",
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockPackage }),
            });

            const result = await api.ckan.getPackage("akilli-tuvaletler");

            expect(mockFetch).toHaveBeenCalledWith(
                "https://acikveri.bizizmir.com/api/3/action/package_show?id=akilli-tuvaletler",
            );
            expect(result.name).toBe("akilli-tuvaletler");
        });

        it("searchDatastore filtrelerle kayıt sorgular", async () => {
            const mockRecords = {
                include_total: true,
                resource_id: "res-123",
                fields: [{ id: "ILCE", type: "text" }],
                records: [{ ILCE: "KONAK" }],
                limit: 10,
                total: 1,
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockRecords }),
            });

            const result = await api.ckan.searchDatastore("res-123", {
                filters: { ILCE: "KONAK" },
                limit: 10,
            });

            expect(mockFetch).toHaveBeenCalledWith(
                "https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=res-123&filters=%7B%22ILCE%22%3A%22KONAK%22%7D&limit=10",
            );
            expect(result.records.length).toBe(1);
        });

        it("dumpDatastore dump JSON endpointini çağırır", async () => {
            const mockDump = [{ _id: 1, col: "val" }];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockDump,
            });

            const result = await api.ckan.dumpDatastore("res-123");
            expect(mockFetch).toHaveBeenCalledWith("https://acikveri.bizizmir.com/datastore/dump/res-123?format=json");
            expect(result).toEqual(mockDump);
        });
    });

    describe("Tuvalet Modülü (api.tuvalet)", () => {
        it("getAkilliTuvaletler doğru resource_id ile çağrı yapar", async () => {
            const mockData = {
                resource_id: TUVALET_RESOURCES.AKILLI_TUVALETLER,
                records: [{ _id: 1, TESIS_ADI: "WC-1", ILCE: "KONAK" }],
                total: 1,
                limit: 100,
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockData }),
            });

            const result = await api.tuvalet.getAkilliTuvaletler({ limit: 10 });

            expect(mockFetch).toHaveBeenCalledWith(
                `https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=${TUVALET_RESOURCES.AKILLI_TUVALETLER}&limit=10`,
            );
            expect(result.records[0].TESIS_ADI).toBe("WC-1");
        });

        it("getModulerTuvaletler doğru resource_id ile çağrı yapar", async () => {
            const mockData = {
                resource_id: TUVALET_RESOURCES.MODULER_TUVALETLER,
                records: [{ _id: 1, TESIS_ADI: "Moduler WC", BEBEK_BAKIM_ODASI: 1 }],
                total: 1,
                limit: 100,
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockData }),
            });

            const result = await api.tuvalet.getModulerTuvaletler();
            expect(mockFetch).toHaveBeenCalledWith(
                `https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=${TUVALET_RESOURCES.MODULER_TUVALETLER}`,
            );
            expect(result.records[0].BEBEK_BAKIM_ODASI).toBe(1);
        });
    });

    describe("İtfaiye Modülü (api.itfaiye)", () => {
        it("getGruplar CBS servisinden çeker", async () => {
            const mockCBS = {
                onemliyer: [{ ADI: "Konak İtfaiye", ILCE: "KONAK" }],
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockCBS,
            });

            const result = await api.itfaiye.getGruplar();
            expect(mockFetch).toHaveBeenCalledWith("https://openapi.izmir.bel.tr/api/ibb/cbs/itfaiyegruplari");
            expect(result.onemliyer[0].ADI).toBe("Konak İtfaiye");
        });

        it("getAcilMudahaleIstatistigi CKAN datastore çağrısı yapar", async () => {
            const mockData = {
                resource_id: ITFAIYE_RESOURCES.ACIL_MUDAHALE,
                records: [{ _id: 1, KATEGORI: "YANGIN", MUDAHALE_ADEDI: 5 }],
                total: 1,
                limit: 100,
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockData }),
            });

            const result = await api.itfaiye.getAcilMudahaleIstatistigi({ limit: 5 });
            expect(mockFetch).toHaveBeenCalledWith(
                `https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=${ITFAIYE_RESOURCES.ACIL_MUDAHALE}&limit=5`,
            );
            expect(result.records[0].MUDAHALE_ADEDI).toBe(5);
        });
    });

    describe("İZUM Modülü (api.izum)", () => {
        it("getAnaArterHizVeSure hız ve süre verilerini sorgular", async () => {
            const mockData = {
                resource_id: IZUM_RESOURCES.HIZ_VE_SURE,
                records: [{ _id: 1, BASLAMA: "A", BITIS: "B", HIZ: 45, SURE: 12 }],
                total: 1,
                limit: 100,
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ success: true, result: mockData }),
            });

            const result = await api.izum.getAnaArterHizVeSure({ limit: 10 });
            expect(mockFetch).toHaveBeenCalledWith(
                `https://acikveri.bizizmir.com/api/3/action/datastore_search?resource_id=${IZUM_RESOURCES.HIZ_VE_SURE}&limit=10`,
            );
            expect(result.records[0].HIZ).toBe(45);
        });

        it("getOtoparklar İZUM otopark servisini çağırır", async () => {
            const mockOtoparklar = [{ Adi: "Alsancak Katlı Otoparkı", Kapasite: 500 }];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockOtoparklar,
            });

            const result = await api.izum.getOtoparklar();
            expect(mockFetch).toHaveBeenCalledWith("https://openapi.izmir.bel.tr/api/ibb/izum/otoparklar");
            expect(result[0].Adi).toBe("Alsancak Katlı Otoparkı");
        });
    });

    describe("Turuncu Çember Modülü (api.turuncucember)", () => {
        it("getIsletmeler sertifikalı işletmeleri listeler", async () => {
            const mockIsletmeler = [
                {
                    Id: 101,
                    TicariUnvan: "Deniz Restoran",
                    TabelaAdi: "Deniz",
                    FaaliyetAlani: "Restoran",
                    FaaliyetId: 1,
                    LokasyonX: "38.43",
                    LokasyonY: "27.13",
                    EklenmeTarihi: "2024-01-01",
                },
            ];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockIsletmeler,
            });

            const result = await api.turuncucember.getIsletmeler();
            expect(mockFetch).toHaveBeenCalledWith("https://openapi.izmir.bel.tr/api/ibb/turuncucember/isletmeler");
            expect(result.length).toBe(1);
            expect(result[0].TabelaAdi).toBe("Deniz");
        });

        it("getIsletme tekil işletme detayını getirir", async () => {
            const mockIsletme = {
                Id: 101,
                TicariUnvan: "Deniz Restoran",
                TabelaAdi: "Deniz",
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockIsletme,
            });

            const result = await api.turuncucember.getIsletme(101);
            expect(mockFetch).toHaveBeenCalledWith("https://openapi.izmir.bel.tr/api/ibb/turuncucember/isletme/101");
            expect(result.Id).toBe(101);
        });

        it("getSayilar başvuru istatistiklerini getirir", async () => {
            const mockSayilar = {
                BasvuruSayisi: 583,
                IslemdeBekleyen: 2,
                KabulEdilen: 483,
                Reddedilen: 90,
            };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockSayilar,
            });

            const result = await api.turuncucember.getSayilar();
            expect(mockFetch).toHaveBeenCalledWith("https://openapi.izmir.bel.tr/api/ibb/turuncucember/sayilar");
            expect(result.KabulEdilen).toBe(483);
        });
    });

    describe("İklim Modülü Güncellemesi", () => {
        it("getGununHavaKalitesi en son ölçümleri getirir", async () => {
            const mockHava = [
                {
                    BolgeId: 6,
                    BolgeAdi: "CIGLI",
                    GazId: 1,
                    GazAdi: "PM10",
                    OlcumDegeri: "16",
                    OlcumTarihi: "2026-11-20T00:00:00",
                },
            ];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockHava,
            });

            const result = await api.iklim.getGununHavaKalitesi();
            expect(mockFetch).toHaveBeenCalledWith("https://openapi.izmir.bel.tr/api/ibb/cevre/havadegerleri");
            expect(result[0].BolgeAdi).toBe("CIGLI");
        });
    });
});
