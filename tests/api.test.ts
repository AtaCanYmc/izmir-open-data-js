import { afterEach, describe, expect, it, vi } from "vitest";
import { IzmirAPI } from "../src/index";
import { IzmirClient } from "../src/client";
import { installMockFetch } from "./helpers/mockFetch";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("IzmirClient", () => {
  it("baseUrl ve path'i birlestirip JSON doner", async () => {
    const { fetchMock } = installMockFetch({ jsonData: [{ id: 1 }] });
    const client = new IzmirClient("https://example.test/api/");

    const data = await client.get("foo/bar");

    expect(fetchMock).toHaveBeenCalledWith("https://example.test/api/foo/bar");
    expect(data).toEqual([{ id: 1 }]);
  });

  it("ok=false oldugunda hata firlatir", async () => {
    installMockFetch({ ok: false, status: 503, jsonData: { message: "down" } });
    const client = new IzmirClient("https://example.test/api/");

    await expect(client.get("foo/bar")).rejects.toThrow("API response error: 503");
  });
});

describe("IzmirAPI endpoint route sozlesmeleri", () => {
  it("tum endpoint metodlari dogru path'e istek atar", async () => {
    const { fetchMock } = installMockFetch({ jsonData: [] });
    const api = new IzmirAPI("https://example.test/api/");

    const d = new Date("2026-03-10T00:00:00.000Z");

    await api.eczaneler.getNobetciList();
    await api.eczaneler.getList();
    await api.muhtarliklar.getList();
    await api.wizmirnet.getList();

    await api.izsu.getSuUretimiDagilimi();
    await api.izsu.getGunlukSuUretimi();
    await api.izsu.getBarajDolulukOranlari();
    await api.izsu.getHaftalikSuAnalizi();
    await api.izsu.getBarajSuKaliteRaporlari();
    await api.izsu.getArizaKaynakliKesintiList();
    await api.izsu.getBarajVeKuyuList();
    await api.izsu.getIzsuSubeList();

    await api.afetler.getAcilDurumToplanmaAlanlari();
    await api.pazarlar.getList();
    await api.pazarlar.getBalikHalFiyatlari(d);
    await api.pazarlar.getSebzeMeyveHalFiyatlari(d);

    await api.taksi.getDurakList();
    await api.etkinlikler.getList();
    await api.etkinlikler.getEtkinlikById(123);
    await api.iklim.getGunlukHavaKalitesiOlcumleri(d);
    await api.eshot.getYakinDurakList(38.42, 27.12);
    await api.bisim.getIstasyonList();
    await api.tramvay.getHatList();
    await api.tramvay.getSeferList();
    await api.tramvay.getIstasyonList(10);
    await api.tramvay.getSeferSiklikList(10);
    await api.metro.getIstasyonList();

    await api.izban.getTarife(1, 2, 0, 1);
    await api.izban.getIstasyonList();
    await api.izban.getHareketSaatleri(1, 2);

    await api.otopark.getList();
    await api.hizmet.getHizmetNoktaList();

    await api.vapur.getHareketSaatleri("1", "2", 0, 1);
    await api.vapur.getCalismaGunleri();
    await api.vapur.getHareketSaatleriByHat("1", 0);
    await api.vapur.getIskeleList();

    // Yeni eklenen iztek ve eshot endpoint'leri
    await api.iztek.getAskidaIzmirimKartIstatistik();
    await api.eshot.getDuragaYaklasanOtobusList(21050);
    await api.eshot.getHattinYaklasanOtobusleri(446, 21056);
    await api.eshot.getHatOtobusKonumlari(446);

    const calls = (fetchMock.mock.calls as unknown[][]).map((c) => c[0]);

    expect(calls).toEqual([
      "https://example.test/api/ibb/nobetcieczaneler",
      "https://example.test/api/ibb/eczaneler",
      "https://example.test/api/ibb/cbs/muhtarliklar",
      "https://example.test/api/ibb/cbs/wizmirnetnoktalari",

      "https://example.test/api/izsu/suuretiminindagilimi",
      "https://example.test/api/izsu/gunluksuuretimi",
      "https://example.test/api/izsu/barajdurum",
      "https://example.test/api/izsu/haftaliksuanalizleri",
      "https://example.test/api/izsu/barajsukaliteraporlari",
      "https://example.test/api/izsu/arizakaynaklisukesintileri",
      "https://example.test/api/izsu/barajvekuyular",
      "https://example.test/api/izsu/subeler",

      "https://example.test/api/ibb/cbs/afetaciltoplanmaalani",
      "https://example.test/api/ibb/cbs/pazaryerleri",
      "https://example.test/api/ibb/halfiyatlari/balik/2026-03-10",
      "https://example.test/api/ibb/halfiyatlari/sebzemeyve/2026-03-10",

      "https://example.test/api/ibb/cbs/taksiduraklari",
      "https://example.test/api/ibb/kultursanat/etkinlikler",
      "https://example.test/api/ibb/kultursanat/etkinlikler/123",
      "https://example.test/api/ibb/cevre/havadegerleri/2026-03-10",
      "https://example.test/api/ibb/cbs/noktayayakinduraklar?x=38.42&y=27.12",
      "https://example.test/api/izulas/bisim/istasyonlar",
      "https://example.test/api/tramvay/hatlar",
      "https://example.test/api/tramvay/sefer",
      "https://example.test/api/tramvay/istasyonlar/10",
      "https://example.test/api/tramvay/seferler/10",
      "https://example.test/api/metro/istasyonlar",

      "https://example.test/api/izban/tutarhesaplama/1/2/0/1",
      "https://example.test/api/izban/istasyonlar",
      "https://example.test/api/sefersaatleri/1/2",

      "https://example.test/api/izum/otoparklar",
      "https://example.test/api/ibb/cbs/izbbhizmetnoktalari",

      "https://example.test/api/izdeniz/vapursaatleri/1/2/0/1",
      "https://example.test/api/izdeniz/gunler",
      "https://example.test/api/izdeniz/iskelesefersaatleri/1/0",
      "https://example.test/api/izdeniz/iskeleler",

      // Yeni eklenen iztek ve eshot endpoint'leri
      "https://example.test/api/iztek/askidaizmirimkart",
      "https://example.test/api/iztek/duragayaklasanotobusler/21050",
      "https://example.test/api/iztek/hattinyaklasanotobusleri/446/21056",
      "https://example.test/api/iztek/hatotobuskonumlari/446"
    ]);
  });
});

describe("IzmirAPI yuzey sozlesmesi", () => {
  it("mevcut endpoint alanlarini expose eder", () => {
    const api = new IzmirAPI("https://example.test/api/");

    expect(api).toMatchObject({
      eczaneler: expect.any(Object),
      muhtarliklar: expect.any(Object),
      wizmirnet: expect.any(Object),
      izsu: expect.any(Object),
      afetler: expect.any(Object),
      pazarlar: expect.any(Object),
      taksi: expect.any(Object),
      etkinlikler: expect.any(Object),
      iklim: expect.any(Object),
      eshot: expect.any(Object),
      bisim: expect.any(Object),
      tramvay: expect.any(Object),
      metro: expect.any(Object),
      izban: expect.any(Object),
      otopark: expect.any(Object),
      hizmet: expect.any(Object),
      vapur: expect.any(Object),
      // Yeni eklenen endpoint'ler
      egitim: expect.any(Object),
      saglik: expect.any(Object),
      kutuphane: expect.any(Object),
      tarihi: expect.any(Object),
      plaj: expect.any(Object),
      tren: expect.any(Object),
      kamu: expect.any(Object),
      sosyal: expect.any(Object),
      spor: expect.any(Object),
      cografi: expect.any(Object),
      iztek: expect.any(Object)
    });
  });
});

describe("Yeni eklenen endpoint'lerin varligi", () => {
  it("egitim endpoint metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.egitim.getAnaokullarList).toBeDefined();
    expect(api.egitim.getIlkokullarList).toBeDefined();
    expect(api.egitim.getUniversitelerList).toBeDefined();
  });

  it("saglik endpoint metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.saglik.getHastanelerList).toBeDefined();
    expect(api.saglik.getAcilYardimIstasyonlariList).toBeDefined();
  });

  it("kutuphane endpoint metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.kutuphane.getKutuphanelerList).toBeDefined();
    expect(api.kutuphane.getMuzelerList).toBeDefined();
  });

  it("tarihi endpoint metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.tarihi.getAntikKentlerList).toBeDefined();
    expect(api.tarihi.getTarihiYapilarList).toBeDefined();
  });

  it("plaj endpoint metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.plaj.getPlajlarList).toBeDefined();
    expect(api.plaj.getHamamlarList).toBeDefined();
  });

  it("tren endpoint metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.tren.getTrenGarlariList).toBeDefined();
    expect(api.tren.getHavaalaniList).toBeDefined();
  });

  it("kamu endpoint metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.kamu.getBankalarList).toBeDefined();
    expect(api.kamu.getPttList).toBeDefined();
  });

  it("sosyal endpoint metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.sosyal.getHuzurevleriList).toBeDefined();
  });

  it("spor endpoint metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.spor.getStadyumlarList).toBeDefined();
  });

  it("cografi endpoint metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.cografi.getDagTepeList).toBeDefined();
    expect(api.cografi.getGollerList).toBeDefined();
  });

  it("iztek endpoint metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.iztek.getAskidaIzmirimKartIstatistik).toBeDefined();
  });

  it("eshot otobus takip metodlari mevcut", () => {
    const api = new IzmirAPI("https://example.test/api/");
    expect(api.eshot.getDuragaYaklasanOtobusList).toBeDefined();
    expect(api.eshot.getHattinYaklasanOtobusleri).toBeDefined();
    expect(api.eshot.getHatOtobusKonumlari).toBeDefined();
    expect(api.eshot.getHatlar).toBeDefined();
    expect(api.eshot.getHareketSaatleri).toBeDefined();
    expect(api.eshot.getDuraklar).toBeDefined();
  });
});
