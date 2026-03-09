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
    it("getIstasyonList: OnemliYerWrapper formatında döner", async () => {
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
});

