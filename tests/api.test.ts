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
  it("tum endpoint metodlari mock ile sorunsuz calismali", async () => {
    const { fetchMock } = installMockFetch({ jsonData: [] });
    const api = new IzmirAPI("https://example.test/api/");

    await api.afetler.getAcilDurumToplanmaAlanlari();
    await api.bisim.getIstasyonList();
    await api.cografi.getAdaYarimadaList();
    await api.cografi.getBurunlarList();
    await api.cografi.getDagTepeList();
    await api.cografi.getGollerList();
    await api.cografi.getKorfezKoylarList();
    await api.cografi.getNehirCaylarList();
    await api.cografi.getOrmanlarList();
    await api.cografi.getMeydanlarList();
    await api.eczaneler.getNobetciList();
    await api.eczaneler.getList();
    await api.egitim.getEngelliOkullariList();
    await api.egitim.getAnaokullarList();
    await api.egitim.getEtutMerkezleriList();
    await api.egitim.getHalkEgitimList();
    await api.egitim.getIlkokullarList();
    await api.egitim.getKolejlerList();
    await api.egitim.getLiselerList();
    await api.egitim.getMeslekLiseleriList();
    await api.egitim.getOrtaokullarList();
    await api.egitim.getSanatOkullariList();
    await api.egitim.getUniversitelerList();
    await api.egitim.getMilliEgitimList();
    await api.eshot.getYakinDurakList(1, 1);
    await api.eshot.getDuragaYaklasanOtobusList(1);
    await api.eshot.getHattinYaklasanOtobusleri(1, 1);
    await api.eshot.getHatOtobusKonumlari(1);
    await api.etkinlikler.getList();
    await api.etkinlikler.getEtkinlikById(1);
    await api.hizmet.getHizmetNoktaList();
    await api.iklim.getGunlukHavaKalitesiOlcumleri(new Date('2026-03-10T00:00:00.000Z'));
    await api.izban.getTarife(1, 1, 1, 1);
    await api.izban.getIstasyonList();
    await api.izban.getHareketSaatleri(1, 1);
    await api.izsu.getSuUretimiDagilimi();
    await api.izsu.getGunlukSuUretimi();
    await api.izsu.getBarajDolulukOranlari();
    await api.izsu.getHaftalikSuAnalizi();
    await api.izsu.getBarajSuKaliteRaporlari();
    await api.izsu.getArizaKaynakliKesintiList();
    await api.izsu.getBarajVeKuyuList();
    await api.izsu.getIzsuSubeList();
    await api.izsu.getIzsuVezneList();
    await api.iztek.getAskidaIzmirimKartIstatistik();
    await api.kamu.getBankalarList();
    await api.kamu.getBelediyelerList();
    await api.kamu.getBolgeMudurlukleriList();
    await api.kamu.getDefterdarliklarList();
    await api.kamu.getDerneklerList();
    await api.kamu.getEvlendirmeDaireleriList();
    await api.kamu.getIlIlceMudurlukleriList();
    await api.kamu.getItfaiyeGruplariList();
    await api.kamu.getKonsolosluklarList();
    await api.kamu.getMeslekOdalariList();
    await api.kamu.getNoterlerList();
    await api.kamu.getNufusMudurlukleriList();
    await api.kamu.getPttList();
    await api.kamu.getTurizmDanismaList();
    await api.kamu.getVergiDaireleriList();
    await api.kamu.getMaskematikNoktalariList();
    await api.kutuphane.getKutuphanelerList();
    await api.kutuphane.getKulturMerkezleriList();
    await api.kutuphane.getOperaVeBaleList();
    await api.kutuphane.getGaleriVeSalonlarList();
    await api.kutuphane.getSenfoniOrkestrasiList();
    await api.kutuphane.getSinemalarList();
    await api.kutuphane.getTiyatrolarList();
    await api.kutuphane.getMuzelerList();
    await api.metro.getIstasyonList();
    await api.muhtarliklar.getList();
    await api.otopark.getList();
    await api.otopark.getUcretler(1, 1);
    await api.pazarlar.getList();
    await api.pazarlar.getBalikHalFiyatlari(new Date('2026-03-10T00:00:00.000Z'));
    await api.pazarlar.getSebzeMeyveHalFiyatlari(new Date('2026-03-10T00:00:00.000Z'));
    await api.plaj.getPlajlarList();
    await api.plaj.getHamamlarList();
    await api.plaj.getKaplicalarList();
    await api.plaj.getFuarList();
    await api.saglik.getAcilYardimIstasyonlariList();
    await api.saglik.getAileSagligiMerkezleriList();
    await api.saglik.getAgizDisSagligiMerkezleriList();
    await api.saglik.getAnaCocukSagligiMerkezleriList();
    await api.saglik.getDalMerkezleriList();
    await api.saglik.getHastanelerList();
    await api.saglik.getKanMerkezleriList();
    await api.saglik.getLaboratuvarlarList();
    await api.saglik.getPolikliniklerList();
    await api.saglik.getTipMerkezleriList();
    await api.saglik.getToplumSagligiMerkezleriList();
    await api.saglik.getVeremSavasDispanserleriList();
    await api.saglik.getVeterinerliklerList();
    await api.sosyal.getAileDayanismaMerkezleriList();
    await api.sosyal.getCocukGenclikMerkezleriList();
    await api.sosyal.getCocukYuvalariList();
    await api.sosyal.getHuzurevleriList();
    await api.sosyal.getToplumMerkezleriList();
    await api.sosyal.getYetistirmeYurtlariList();
    await api.spor.getHipodromList();
    await api.spor.getSporSalonlariList();
    await api.spor.getStadyumlarList();
    await api.taksi.getDurakList();
    await api.tarihi.getAntikKentlerList();
    await api.tarihi.getAntikKentYapilariList();
    await api.tarihi.getKoskVeKonaklarList();
    await api.tarihi.getKuleAnitHeykellerList();
    await api.tarihi.getTarihiCarsiHanlarList();
    await api.tarihi.getTarihiSuYapilariList();
    await api.tarihi.getTarihiYapilarList();
    await api.tramvay.getHatList();
    await api.tramvay.getSeferList();
    await api.tramvay.getIstasyonList(1);
    await api.tramvay.getSeferSiklikList(1);
    await api.tren.getTrenGarlariList();
    await api.tren.getHavaalaniList();
    await api.tren.getOtobusTerminalleriList();
    await api.tren.getAracMuayeneIstasyonlariList();
    await api.vapur.getHareketSaatleri("test", "test", 1, 1);
    await api.vapur.getCalismaGunleri();
    await api.vapur.getHareketSaatleriByHat("test", 1);
    await api.vapur.getIskeleList();
    await api.wizmirnet.getList();

    expect(fetchMock).toHaveBeenCalled();
    // Tum endpointler mocklandigi icin 124 cagrinin sorunsuz donecegini verify etmis oluyoruz.
    expect(fetchMock.mock.calls.length).toBeGreaterThan(120);
  });
});
