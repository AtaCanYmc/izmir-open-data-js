import { describe, it, expect, beforeAll } from "vitest";
import { IzmirAPI } from "../../src";
import { withRetry, withTimeout } from '../helpers/retry';

const LIVE_ENABLED = process.env.LIVE_API_TESTS === "1";
const TIMEOUT_MS = 15000;
const RETRY_OPTIONS = { retries: 2, delayMs: 1000 };

const describeIfLive = LIVE_ENABLED ? describe : describe.skip;

describeIfLive("ESHOT Sıralı Durak Listesi (scrapEshotSiraliDurakListesi)", () => {
  let api: IzmirAPI;
  beforeAll(() => {
    api = new IzmirAPI();
  });

  it("390 hattı için gidiş ve dönüş durakları sıralı ve boş değil", async () => {
    const gidis = await withTimeout(
      withRetry(() => api.eshot.scrapEshotSiraliDurakListesi("390", 0), RETRY_OPTIONS),
      TIMEOUT_MS
    );
    const donus = await withTimeout(
      withRetry(() => api.eshot.scrapEshotSiraliDurakListesi("390", 1), RETRY_OPTIONS),
      TIMEOUT_MS
    );
    expect(Array.isArray(gidis)).toBe(true);
    expect(Array.isArray(donus)).toBe(true);
    expect(gidis.length).toBeGreaterThan(0);
    expect(donus.length).toBeGreaterThan(0);
    expect(gidis[0]).toHaveProperty('hatNo', '390');
    expect(gidis[0]).toHaveProperty('yon', 0);
    expect(gidis[0]).toHaveProperty('durakAdi');
    expect(gidis[0]).toHaveProperty('sira', 1);
    expect(donus[0]).toHaveProperty('hatNo', '390');
    expect(donus[0]).toHaveProperty('yon', 1);
    expect(donus[0]).toHaveProperty('durakAdi');
    expect(donus[0]).toHaveProperty('sira', 1);
  });
});

