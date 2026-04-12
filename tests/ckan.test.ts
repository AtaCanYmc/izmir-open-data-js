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
        it("ESHOT hatlarını CSV'den çeker", async () => {
            const mockCSV = `HAT_NO;HAT_ADI;GUZERGAH_ACIKLAMA;ACIKLAMA;HAT_BASLANGIC;HAT_BITIS
5;NARLIDERE - KUYULAR İSKELE;MİTHAT PAŞA CAD.;;NARLIDERE;KUYULAR İSKELE
6;ARIKENT - KUYULAR İSK.;MİTHAT PAŞA CAD.;;ARIKENT;KUYULAR İSKELE`;

            mockFetch.mockResolvedValueOnce({
                ok: true,
                text: async () => mockCSV
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHatlar();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-hatlari.csv'
            );
            expect(result).toEqual([
                { HAT_NO: 5, HAT_ADI: "NARLIDERE - KUYULAR İSKELE", GUZERGAH_ACIKLAMA: "MİTHAT PAŞA CAD.", ACIKLAMA: "", HAT_BASLANGIC: "NARLIDERE", HAT_BITIS: "KUYULAR İSKELE" },
                { HAT_NO: 6, HAT_ADI: "ARIKENT - KUYULAR İSK.", GUZERGAH_ACIKLAMA: "MİTHAT PAŞA CAD.", ACIKLAMA: "", HAT_BASLANGIC: "ARIKENT", HAT_BITIS: "KUYULAR İSKELE" }
            ]);
        });

        it("getHatlar metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getHatlar).toBeDefined();
            expect(typeof api.eshot.getHatlar).toBe('function');
        });
    });

    describe("eshot.getHareketSaatleri", () => {
        it("ESHOT hareket saatlerini CSV'den çeker", async () => {
            const mockCSV = `HAT_NO;TARIFE_ID;GIDIS_SAATI;DONUS_SAATI;SIRA;GIDIS_ENGELLI_DESTEGI;DONUS_ENGELLI_DESTEGI;BISIKLETLI_GIDIS;BISIKLETLI_DONUS;GIDIS_ELEKTRIKLI_OTOBUS;DONUS_ELEKTRIKLI_OTOBUS
5;1;06:00;06:35;1;True;True;True;True;False;False
5;1;06:30;07:05;2;True;True;True;True;False;False`;

            mockFetch.mockResolvedValueOnce({
                ok: true,
                text: async () => mockCSV
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getHareketSaatleri();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-hareketsaatleri.csv'
            );
            expect(result.length).toBe(2);
            expect(result[0].HAT_NO).toBe(5);
            expect(result[0].GIDIS_SAATI).toBe("06:00");
            expect(result[0].TARIFE_ID).toBe(1);
        });

        it("getHareketSaatleri metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getHareketSaatleri).toBeDefined();
            expect(typeof api.eshot.getHareketSaatleri).toBe('function');
        });
    });

    describe("eshot.getDuraklar", () => {
        it("ESHOT duraklarını CSV'den çeker", async () => {
            const mockCSV = `DURAK_ID;DURAK_ADI;ENLEM;BOYLAM;DURAKTAN_GECEN_HATLAR
10005;Bahribaba;38.4152683626015;27.1276395272209;32
10007;Bahribaba;38.415144105211;27.1277200912719;29-30`;

            mockFetch.mockResolvedValueOnce({
                ok: true,
                text: async () => mockCSV
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getDuraklar();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-duraklari.csv'
            );
            expect(result.length).toBe(2);
            expect(result[0].DURAK_ID).toBe(10005);
            expect(result[0].DURAK_ADI).toBe("Bahribaba");
            expect(result[1].DURAKTAN_GECEN_HATLAR).toBe("29-30");
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
        it("ESHOT bağlantı tiplerini CSV'den çeker", async () => {
            const mockCSV = `BAGLANTI_TIP_ID;BAGLANTI_TIPI
1;METRO
2;IZBAN
3;VAPUR`;

            mockFetch.mockResolvedValueOnce({
                ok: true,
                text: async () => mockCSV
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getBaglantiTipleri();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/dataset/f0964595-53e0-4b94-bf11-9423f8bb595e/resource/c228da75-adfd-422a-a480-2a4c7ffa7586/download/eshot-otobus-baglanti-tipleri.csv'
            );
            expect(result.length).toBe(3);
            expect(result[0].BAGLANTI_TIP_ID).toBe(1);
            expect(result[0].BAGLANTI_TIPI).toBe("METRO");
            expect(result[1].BAGLANTI_TIPI).toBe("IZBAN");
        });

        it("getBaglantiTipleri metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getBaglantiTipleri).toBeDefined();
            expect(typeof api.eshot.getBaglantiTipleri).toBe('function');
        });
    });

    describe("eshot.getBaglantiHatlari", () => {
        it("ESHOT bağlantılı hatlarını CSV'den çeker", async () => {
            const mockCSV = `BAGLANTI_TIP_ID;HAT_NO;HAT_ADI;GUZERGAH_ACIKLAMA;ACIKLAMA;HAT_BASLANGIC;HAT_BITIS;GIDIS_CALISMA_SAATI;DONUS_CALISMA_SAATI
1;5;NARLIDERE - KUYULAR İSKELE;MİTHAT PAŞA CAD.;;NARLIDERE;KUYULAR İSKELE;06:00 - 23:00;06:35 - 23:40
2;100;TEST HAT;GUZERGAH;;BASLANGIC;BITIS;05:00 - 22:00;05:30 - 22:30`;

            mockFetch.mockResolvedValueOnce({
                ok: true,
                text: async () => mockCSV
            });

            const api = new IzmirAPI();
            const result = await api.eshot.getBaglantiHatlari();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-baglantili-hatlar.csv'
            );
            expect(result.length).toBe(2);
            expect(result[0].BAGLANTI_TIP_ID).toBe(1);
            expect(result[0].HAT_NO).toBe(5);
            expect(result[0].HAT_ADI).toBe("NARLIDERE - KUYULAR İSKELE");
            expect(result[0].GIDIS_CALISMA_SAATI).toBe("06:00 - 23:00");
        });

        it("getBaglantiHatlari metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.eshot.getBaglantiHatlari).toBeDefined();
            expect(typeof api.eshot.getBaglantiHatlari).toBe('function');
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

    describe("tramvay.getPlanlananiSeferSayilari", () => {
        it("Planlanan sefer sayılarını CSV'den çeker", async () => {
            const mockCSV = `YIL;AY;IZMIR_METROSU;KARSIYAKA_TRAMVAYI_VE_CIGLI_TRAMVAYI;KONAK_TRAMVAYI
2020;1;15195;8498;11642
2020;2;15273;8057;10924`;

            mockFetch.mockResolvedValueOnce({
                ok: true,
                text: async () => mockCSV
            });

            const api = new IzmirAPI();
            const result = await api.tramvay.getPlanlananiSeferSayilari();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/dataset/ace45290-413e-4786-82e4-d23fd56591b1/resource/2fc4d0cf-9628-43b7-95d3-df5742a95f02/download/planlanan_sefer_sayilari.csv'
            );
            expect(result.length).toBe(2);
            expect(result[0].YIL).toBe(2020);
            expect(result[0].AY).toBe(1);
            expect(result[0].IZMIR_METROSU).toBe(15195);
        });

        it("getPlanlananiSeferSayilari metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.tramvay.getPlanlananiSeferSayilari).toBeDefined();
            expect(typeof api.tramvay.getPlanlananiSeferSayilari).toBe('function');
        });
    });

    describe("trafik.getKameraList", () => {
        it("Trafik kameralarını CSV'den çeker", async () => {
            const mockCSV = `ADI;ENLEM;BOYLAM
TEPECIK KAVSAGI;38.42222492;27.15298285
ESREFPASA HAST. KAVSAGI;38.42319238;27.16143187`;

            mockFetch.mockResolvedValueOnce({
                ok: true,
                text: async () => mockCSV
            });

            const api = new IzmirAPI();
            const result = await api.trafik.getKameraList();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/dataset/a5cda2f2-ccbd-4fac-a4bb-c691abff28f1/resource/b91cb15d-05c6-45b7-8a75-48e030aad368/download/trafikkameralari.csv'
            );
            expect(result.length).toBe(2);
            expect(result[0].ADI).toBe("TEPECIK KAVSAGI");
            expect(result[0].ENLEM).toBe(38.42222492);
            expect(result[0].BOYLAM).toBe(27.15298285);
        });

        it("getKameraList metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.trafik.getKameraList).toBeDefined();
            expect(typeof api.trafik.getKameraList).toBe('function');
        });
    });

    describe("vapur.getDetayList", () => {
        it("Vapur detaylarını CSV'den çeker", async () => {
            const mockCSV = `GEMI_ADI;GEMI_TIPI;YOLCU_KAPASITESI;ARAC_KAPASITESI;BISIKLET_PARK_YERI_KAPASITESI;ENGELLI_ERISIMINE_UYGUNLUK;ENGELLI_ASANSORU_SAYISI;ERKEK_TUVALETI_SAYISI;KADIN_TUVALETI_SAYISI;ENGELLI_TUVALETI_SAYISI;BEBEK_BAKIM_ODASI_SAYISI;BUFE_VEYA_OTOMAT;EVCIL_HAYVAN_TASIMA_KAFESI_SAYISI;WIZMIRNET_KABLOSUZ_INTERNET
AKABEY;Yolcu Gemisi;426;-;13;Var;-;1;1;1;1;Var;3;Var
DOKUZEYLÜL;Yolcu Gemisi;426;-;13;Var;-;1;1;1;1;Var;3;Var`;

            mockFetch.mockResolvedValueOnce({
                ok: true,
                text: async () => mockCSV
            });

            const api = new IzmirAPI();
            const result = await api.vapur.getDetayList();

            expect(mockFetch).toHaveBeenCalledWith(
                'https://acikveri.bizizmir.com/dataset/87b38b23-4f73-4650-9d96-c72ad6ee73e3/resource/e6d7425a-694c-4f39-b452-4aade132635c/download/vapurdetay.csv'
            );
            expect(result.length).toBe(2);
            expect(result[0].GEMI_ADI).toBe("AKABEY");
            expect(result[0].GEMI_TIPI).toBe("Yolcu Gemisi");
            expect(result[0].YOLCU_KAPASITESI).toBe(426);
        });

        it("getDetayList metodu mevcut", () => {
            const api = new IzmirAPI();
            expect(api.vapur.getDetayList).toBeDefined();
            expect(typeof api.vapur.getDetayList).toBe('function');
        });
    });
});

