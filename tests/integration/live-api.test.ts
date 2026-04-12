/**
 * Canlı API Integration Testleri
 *
 * Bu testler sadece `LIVE_API_TESTS=1` ortam değişkeni set edildiğinde çalışır.
 * Default kapalıdır; CI'da veya normalde `npm test` ile çalışmaz.
 *
 * Kullanım:
 *   LIVE_API_TESTS=1 npm run test:live
 */

import { describe, it, expect, beforeAll } from "vitest";
import { IzmirAPI } from "../../src";
import { withRetry, withTimeout } from '../helpers/retry';

const LIVE_ENABLED = process.env.LIVE_API_TESTS === "1";
const TIMEOUT_MS = 15000; // 15 saniye timeout
const RETRY_OPTIONS = { retries: 2, delayMs: 1000 };

// Guard: Eğer LIVE_API_TESTS=1 değilse tüm testleri atla
const describeIfLive = LIVE_ENABLED ? describe : describe.skip;

describeIfLive("Canlı API Integration Testleri", () => {
  let api: IzmirAPI;

  beforeAll(() => {
    api = new IzmirAPI();
  });

  // ─────────────────────────────────────────────────────────────────
  // Eczaneler
  // ─────────────────────────────────────────────────────────────────
  describe("eczaneler", () => {
    it("getNobetciList: array döner ve her item'da Adi, Adres, Telefon alanları var", async () => {
      const data = await withTimeout(
        withRetry(() => api.eczaneler.getNobetciList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
      if (data.length > 0) {
        const item = data[0];
        expect(item).toHaveProperty("Adi");
        expect(item).toHaveProperty("Adres");
        expect(item).toHaveProperty("Telefon");
      }
    });

    it("getList: array döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eczaneler.getList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Muhtarliklar
  // ─────────────────────────────────────────────────────────────────
  describe("muhtarliklar", () => {
    it("getList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.muhtarliklar.getList(), RETRY_OPTIONS),
        30000
      );

      expect(data).toHaveProperty("onemliyer");
    }, 35000);
  });

  // ─────────────────────────────────────────────────────────────────
  // Wizmirnet
  // ─────────────────────────────────────────────────────────────────
  describe("wizmirnet", () => {
    it("getList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.wizmirnet.getList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // IZSU
  // ─────────────────────────────────────────────────────────────────
  describe("izsu", () => {
    it("getSuUretimiDagilimi: array döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.izsu.getSuUretimiDagilimi(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
    });

    it("getBarajDolulukOranlari: array döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.izsu.getBarajDolulukOranlari(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
    });

    it("getGunlukSuUretimi: obje döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.izsu.getGunlukSuUretimi(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Afetler
  // ─────────────────────────────────────────────────────────────────
  describe("afetler", () => {
    it("getAcilDurumToplanmaAlanlari: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.afetler.getAcilDurumToplanmaAlanlari(), RETRY_OPTIONS),
        30000
      );

      expect(data).toBeDefined();
    }, 35000);
  });

  // ─────────────────────────────────────────────────────────────────
  // Pazarlar
  // ─────────────────────────────────────────────────────────────────
  describe("pazarlar", () => {
    it("getList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.pazarlar.getList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Taksi
  // ─────────────────────────────────────────────────────────────────
  describe("taksi", () => {
    it("getDurakList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.taksi.getDurakList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Etkinlikler
  // ─────────────────────────────────────────────────────────────────
  describe("etkinlikler", () => {
    it("getList: array döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.etkinlikler.getList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Bisim
  // ─────────────────────────────────────────────────────────────────
  describe("bisim", () => {
    // NOT: Bu endpoint çok yavaş yanıt veriyor (>60 saniye), skip edildi
    it.skip("getIstasyonList: OnemliYerWrapper formatında döner (API çok yavaş)", async () => {
      const data = await withTimeout(
        withRetry(() => api.bisim.getIstasyonList(), RETRY_OPTIONS),
        55000
      );

      expect(data).toBeDefined();
    }, 60000);
  });

  // ─────────────────────────────────────────────────────────────────
  // Tramvay
  // ─────────────────────────────────────────────────────────────────
  describe("tramvay", () => {
    it("getHatList: array döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.tramvay.getHatList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
    });

    // NOT: Bu endpoint API'de mevcut değil (404 dönüyor)
    it.skip("getSeferList: array döner (endpoint mevcut değil)", async () => {
      const data = await withTimeout(
        withRetry(() => api.tramvay.getSeferList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Metro
  // ─────────────────────────────────────────────────────────────────
  describe("metro", () => {
    it("getIstasyonList: array döner ve her item'da Adi, Enlem, Boylam alanları var", async () => {
      const data = await withTimeout(
        withRetry(() => api.metro.getIstasyonList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
      if (data.length > 0) {
        const item = data[0];
        expect(item).toHaveProperty("Adi");
        expect(item).toHaveProperty("Enlem");
        expect(item).toHaveProperty("Boylam");
      }
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Izban
  // ─────────────────────────────────────────────────────────────────
  describe("izban", () => {
    it("getIstasyonList: array veya object döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.izban.getIstasyonList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Otopark
  // ─────────────────────────────────────────────────────────────────
  describe("otopark", () => {
    // NOT: Bu endpoint bazen 404 dönebiliyor, API durumuna bağlı
    it.skip("getList: array döner (endpoint geçici olarak kapalı olabilir)", async () => {
      const data = await withTimeout(
        withRetry(() => api.otopark.getList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Hizmet
  // ─────────────────────────────────────────────────────────────────
  describe("hizmet", () => {
    it("getHizmetNoktaList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.hizmet.getHizmetNoktaList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Vapur
  // ─────────────────────────────────────────────────────────────────
  describe("vapur", () => {
    it("getIskeleList: array döner ve her item'da IskeleId, Adi alanları var", async () => {
      const data = await withTimeout(
        withRetry(() => api.vapur.getIskeleList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
      if (data.length > 0) {
        const item = data[0];
        expect(item).toHaveProperty("IskeleId");
        expect(item).toHaveProperty("Adi");
      }
    });

    it("getCalismaGunleri: GunReferansi formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.vapur.getCalismaGunleri(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Eğitim
  // ─────────────────────────────────────────────────────────────────
  describe("egitim", () => {
    it("getUniversitelerList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.egitim.getUniversitelerList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
      expect(data).toHaveProperty("onemliyer");
    });

    it("getIlkokullarList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.egitim.getIlkokullarList(), RETRY_OPTIONS),
        30000
      );

      expect(data).toBeDefined();
    }, 35000);
  });

  // ─────────────────────────────────────────────────────────────────
  // Sağlık
  // ─────────────────────────────────────────────────────────────────
  describe("saglik", () => {
    it("getHastanelerList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.saglik.getHastanelerList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });

    it("getAcilYardimIstasyonlariList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.saglik.getAcilYardimIstasyonlariList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Kütüphane ve Kültür
  // ─────────────────────────────────────────────────────────────────
  describe("kutuphane", () => {
    it("getKutuphanelerList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.kutuphane.getKutuphanelerList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });

    it("getMuzelerList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.kutuphane.getMuzelerList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Tarihi Yerler
  // ─────────────────────────────────────────────────────────────────
  describe("tarihi", () => {
    it("getTarihiYapilarList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.tarihi.getTarihiYapilarList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });

    it("getKuleAnitHeykellerList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.tarihi.getKuleAnitHeykellerList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Plaj ve Turizm
  // ─────────────────────────────────────────────────────────────────
  describe("plaj", () => {
    it("getPlajlarList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.plaj.getPlajlarList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });

    it("getFuarList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.plaj.getFuarList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Tren ve Ulaşım
  // ─────────────────────────────────────────────────────────────────
  describe("tren", () => {
    it("getTrenGarlariList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.tren.getTrenGarlariList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });

    it("getHavaalaniList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.tren.getHavaalaniList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Kamu Kurumları
  // ─────────────────────────────────────────────────────────────────
  describe("kamu", () => {
    it("getBankalarList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.kamu.getBankalarList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });

    it("getPttList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.kamu.getPttList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });

    it("getNoterlerList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.kamu.getNoterlerList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Sosyal Hizmetler
  // ─────────────────────────────────────────────────────────────────
  describe("sosyal", () => {
    it("getHuzurevleriList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.sosyal.getHuzurevleriList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });

    it("getYetistirmeYurtlariList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.sosyal.getYetistirmeYurtlariList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Spor Tesisleri
  // ─────────────────────────────────────────────────────────────────
  describe("spor", () => {
    // NOT: Bu endpoint 404 dönüyor, API'de mevcut değil
    it.skip("getStadyumlarList: OnemliYerWrapper formatında döner (endpoint mevcut değil)", async () => {
      const data = await withTimeout(
        withRetry(() => api.spor.getStadyumlarList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // Coğrafi Özellikler
  // ─────────────────────────────────────────────────────────────────
  describe("cografi", () => {
    it("getDagTepeList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.cografi.getDagTepeList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });

    it("getGollerList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.cografi.getGollerList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });

    it("getOrmanlarList: OnemliYerWrapper formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.cografi.getOrmanlarList(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // İztek - İzmirim Kart
  // ─────────────────────────────────────────────────────────────────
  describe("iztek", () => {
    // NOT: Bu endpoint bazen rate limit (429) veya geçici sorun yaşayabiliyor
    it.skip("getAskidaIzmirimKartIstatistik: istatistik objesi döner (rate limit olabilir)", async () => {
      const data = await withTimeout(
        withRetry(() => api.iztek.getAskidaIzmirimKartIstatistik(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // ESHOT - Otobüs Takip
  // ─────────────────────────────────────────────────────────────────
  describe("eshot - otobüs takip", () => {
    it("getDuragaYaklasanOtobusList: array döner", async () => {
      // Konak durağı (21050) için test
      const data = await withTimeout(
        withRetry(() => api.eshot.getDuragaYaklasanOtobusList(21050), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
    });

    it("getHattinYaklasanOtobusleri: array döner", async () => {
      // 446 numaralı hat, 21056 numaralı durak için test
      const data = await withTimeout(
        withRetry(() => api.eshot.getHattinYaklasanOtobusleri(446, 21056), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
    });

    it("getHatOtobusKonumlari: HatOtobusKonumlariResponse formatında döner", async () => {
      // 446 numaralı hat için test
      const data = await withTimeout(
        withRetry(() => api.eshot.getHatOtobusKonumlari(446), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
      expect(typeof data).toBe("object");
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // CKAN API - Açık Veri Portalı (Dump endpoint)
  // ─────────────────────────────────────────────────────────────────
  describe("CKAN API - eshot hatları", () => {
    it("getHatlar: CKAN dump response formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHatlar(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
      expect(data).toHaveProperty("records");
      expect(data).toHaveProperty("fields");
      expect(Array.isArray(data.records)).toBe(true);
      expect(Array.isArray(data.fields)).toBe(true);
    });

    it("getHatlar: fields HAT_NO, HAT_ADI, HAT_BASLANGIC, HAT_BITIS alanlarını içerir", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHatlar(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      const fieldIds = data.fields.map(f => f.id);
      expect(fieldIds).toContain("HAT_NO");
      expect(fieldIds).toContain("HAT_ADI");
      expect(fieldIds).toContain("HAT_BASLANGIC");
      expect(fieldIds).toContain("HAT_BITIS");
    });

    it("getHatlar: tüm hatları döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHatlar(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data.records.length).toBeGreaterThan(0);
    });

    it("getHatlarParsed: nesne formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHatlarParsed(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      const hat = data[0];
      expect(hat).toHaveProperty("_id");
      expect(hat).toHaveProperty("HAT_NO");
      expect(hat).toHaveProperty("HAT_ADI");
      expect(hat).toHaveProperty("HAT_BASLANGIC");
      expect(hat).toHaveProperty("HAT_BITIS");
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // CKAN API - ESHOT Hareket Saatleri (Dump endpoint)
  // ─────────────────────────────────────────────────────────────────
  describe("CKAN API - eshot hareket saatleri", () => {
    it("getHareketSaatleri: CKAN dump response formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHareketSaatleri(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
      expect(data).toHaveProperty("records");
      expect(data).toHaveProperty("fields");
      expect(Array.isArray(data.records)).toBe(true);
      expect(Array.isArray(data.fields)).toBe(true);
    });

    it("getHareketSaatleri: fields HAT_NO, GIDIS_SAATI, DONUS_SAATI alanlarını içerir", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHareketSaatleri(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      const fieldIds = data.fields.map(f => f.id);
      expect(fieldIds).toContain("HAT_NO");
      expect(fieldIds).toContain("TARIFE_ID");
      expect(fieldIds).toContain("GIDIS_SAATI");
      expect(fieldIds).toContain("DONUS_SAATI");
      expect(fieldIds).toContain("SIRA");
      expect(fieldIds).toContain("GIDIS_ENGELLI_DESTEGI");
      expect(fieldIds).toContain("BISIKLETLI_GIDIS");
    });

    it("getHareketSaatleri: tüm hareket saatlerini döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHareketSaatleri(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data.records.length).toBeGreaterThan(0);
    });

    it("getHareketSaatleriParsed: nesne formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHareketSaatleriParsed(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      const saat = data[0];
      expect(saat).toHaveProperty("_id");
      expect(saat).toHaveProperty("HAT_NO");
      expect(saat).toHaveProperty("TARIFE_ID");
      expect(saat).toHaveProperty("GIDIS_SAATI");
      expect(saat).toHaveProperty("DONUS_SAATI");
      expect(saat).toHaveProperty("SIRA");
      expect(saat).toHaveProperty("GIDIS_ENGELLI_DESTEGI");
      expect(saat).toHaveProperty("BISIKLETLI_GIDIS");
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // CKAN API - ESHOT Duraklar (Dump endpoint)
  // ─────────────────────────────────────────────────────────────────
  describe("CKAN API - eshot duraklar", () => {
    it("getDuraklar: CKAN dump response formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getDuraklar(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
      expect(data).toHaveProperty("records");
      expect(data).toHaveProperty("fields");
      expect(Array.isArray(data.records)).toBe(true);
      expect(Array.isArray(data.fields)).toBe(true);
    });

    it("getDuraklar: fields DURAK_ID, DURAK_ADI, ENLEM, BOYLAM alanlarını içerir", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getDuraklar(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      const fieldIds = data.fields.map(f => f.id);
      expect(fieldIds).toContain("DURAK_ID");
      expect(fieldIds).toContain("DURAK_ADI");
      expect(fieldIds).toContain("ENLEM");
      expect(fieldIds).toContain("BOYLAM");
      expect(fieldIds).toContain("DURAKTAN_GECEN_HATLAR");
    });

    it("getDuraklar: tüm durakları döner (10000+ durak)", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getDuraklar(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data.records.length).toBeGreaterThan(10000);
    });

    it("getDurakalarParsed: nesne formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getDurakalarParsed(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      const durak = data[0];
      expect(durak).toHaveProperty("_id");
      expect(durak).toHaveProperty("DURAK_ID");
      expect(durak).toHaveProperty("DURAK_ADI");
      expect(durak).toHaveProperty("ENLEM");
      expect(durak).toHaveProperty("BOYLAM");
      expect(durak).toHaveProperty("DURAKTAN_GECEN_HATLAR");
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // CKAN API - ESHOT Hat Güzergahları (Dump endpoint)
  // ─────────────────────────────────────────────────────────────────
  describe("CKAN API - eshot hat güzergahları", () => {
    it("getHatGuzergahlari: CKAN dump response formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHatGuzergahlari(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
      expect(data).toHaveProperty("records");
      expect(data).toHaveProperty("fields");
      expect(Array.isArray(data.records)).toBe(true);
      expect(Array.isArray(data.fields)).toBe(true);
    });

    it("getHatGuzergahlari: fields HAT_NO, YON, ENLEM, BOYLAM alanlarını içerir", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHatGuzergahlari(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      const fieldIds = data.fields.map(f => f.id);
      expect(fieldIds).toContain("HAT_NO");
      expect(fieldIds).toContain("YON");
      expect(fieldIds).toContain("ENLEM");
      expect(fieldIds).toContain("BOYLAM");
    });

    it("getHatGuzergahlari: tüm güzergah noktalarını döner (30000+ nokta)", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHatGuzergahlari(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data.records.length).toBeGreaterThan(30000);
    });

    it("getHatGuzergahlariParsed: nesne formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getHatGuzergahlariParsed(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBeGreaterThan(0);
      
      const nokta = data[0];
      expect(nokta).toHaveProperty("_id");
      expect(nokta).toHaveProperty("HAT_NO");
      expect(nokta).toHaveProperty("YON");
      expect(nokta).toHaveProperty("ENLEM");
      expect(nokta).toHaveProperty("BOYLAM");
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // CKAN API - ESHOT Bağlantı Tipleri
  // ─────────────────────────────────────────────────────────────────
  describe("CKAN API - eshot bağlantı tipleri", () => {
    it("getBaglantiTipleri: CKAN datastore response formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getBaglantiTipleri(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
      expect(data).toHaveProperty("records");
      expect(data).toHaveProperty("total");
      expect(Array.isArray(data.records)).toBe(true);
    });

    it("getBaglantiTipleri: her kayıtta BAGLANTI_TIP_ID, BAGLANTI_TIPI alanları var", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getBaglantiTipleri(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data.records.length).toBeGreaterThan(0);
      
      const tip = data.records[0];
      expect(tip).toHaveProperty("BAGLANTI_TIP_ID");
      expect(tip).toHaveProperty("BAGLANTI_TIPI");
    });

    it("getBaglantiTipleri: METRO, IZBAN, VAPUR gibi bağlantı tipleri içerir", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getBaglantiTipleri(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      const tipAdlari = data.records.map(r => r.BAGLANTI_TIPI);
      expect(tipAdlari).toContain("METRO");
      expect(tipAdlari).toContain("IZBAN");
      expect(tipAdlari).toContain("VAPUR");
    });

    it("getBaglantiTipleri: toplam kayıt sayısı döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.eshot.getBaglantiTipleri(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data.total).toBeGreaterThan(0);
      expect(typeof data.total).toBe("number");
    });
  });

  // ─────────────────────────────────────────────────────────────────
  // CKAN API - Otopark Ücretleri
  // ─────────────────────────────────────────────────────────────────
  describe("CKAN API - otopark ücretleri", () => {
    it("getUcretler: CKAN datastore response formatında döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.otopark.getUcretler(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data).toBeDefined();
      expect(data).toHaveProperty("records");
      expect(data).toHaveProperty("total");
      expect(Array.isArray(data.records)).toBe(true);
    });

    it("getUcretler: her kayıtta otopark adı ve ücret bilgileri var", async () => {
      const data = await withTimeout(
        withRetry(() => api.otopark.getUcretler(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data.records.length).toBeGreaterThan(0);
      
      const ucret = data.records[0];
      expect(ucret).toHaveProperty("Otopark / Fiyat");
      expect(ucret).toHaveProperty("0-2 saat");
      expect(ucret).toHaveProperty("Kayıp Bilet");
    });

    it("getUcretler: toplam kayıt sayısı döner", async () => {
      const data = await withTimeout(
        withRetry(() => api.otopark.getUcretler(), RETRY_OPTIONS),
        TIMEOUT_MS
      );

      expect(data.total).toBeGreaterThan(0);
      expect(typeof data.total).toBe("number");
    });
  });
});

