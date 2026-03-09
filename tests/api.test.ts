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
      "https://example.test/api/izdeniz/iskeleler"
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
      vapur: expect.any(Object)
    });
  });
});

describe("Implement edilmemis endpoint gorunurlugu (soft mode)", () => {
  it.todo("egitim endpoint'i IzmirAPI uzerine eklendiginde route testleri yazilacak");
  it.todo("kutuphane endpoint'i IzmirAPI uzerine eklendiginde route testleri yazilacak");
  it.todo("plaj endpoint'i IzmirAPI uzerine eklendiginde route testleri yazilacak");
  it.todo("saglik endpoint'i IzmirAPI uzerine eklendiginde route testleri yazilacak");
  it.todo("tarihi endpoint'i IzmirAPI uzerine eklendiginde route testleri yazilacak");
  it.todo("tren endpoint'i IzmirAPI uzerine eklendiginde route testleri yazilacak");
});
