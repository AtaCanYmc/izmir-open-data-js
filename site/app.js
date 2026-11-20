/**
 * İzmir Open Data JS - Interactive Showcase Controller
 * Architecture: Vanilla Modern JS, Web Platform APIs, Anti-AI-Slop
 */

// ============================================================================
// 1. Data Definitions for Live Playground
// ============================================================================
const ENDPOINTS_DATA = {
  eshot: {
    name: "ESHOT Hat & Durak",
    badge: "Ulaşım",
    endpoint: "api.eshot.getHatlar()",
    tsCode: `import { IzmirAPI } from "izmir-open-data-js";

const api = new IzmirAPI({
  cache: true, // 5 dk TTL ile mükerrer istekleri engelle
  retry: { retries: 3, baseDelayMs: 300 }
});

// ESHOT hat listesini sorgulama
const hatlar = await api.eshot.getHatlar();
console.log(\`Toplam aktif hat sayısı: \${hatlar.length}\`);

// Belirli bir hatta yaklaşan otobüs konumları
const konumlar = await api.eshot.getHatOtobusKonumlari(5);
console.log("Canlı Konumlar:", konumlar);`,
    jsonResult: [
      {
        HAT_NO: 5,
        HAT_ADI: "NARLIDERE - KUYULAR İSKELE",
        GUZERGAH_ACIKLAMA: "MİTHAT PAŞA CAD.",
        HAT_BASLANGIC: "NARLIDERE",
        HAT_BITIS: "KUYULAR İSKELE",
        TARIFE: "Standart"
      },
      {
        HAT_NO: 6,
        HAT_ADI: "ARIKENT - KUYULAR İSKELE",
        GUZERGAH_ACIKLAMA: "MİTHAT PAŞA CAD.",
        HAT_BASLANGIC: "ARIKENT",
        HAT_BITIS: "KUYULAR İSKELE",
        TARIFE: "Standart"
      },
      {
        HAT_NO: 10,
        HAT_ADI: "FAHRETTİN ALTAY - KONAK",
        GUZERGAH_ACIKLAMA: "İNÖNÜ CAD.",
        HAT_BASLANGIC: "FAHRETTİN ALTAY",
        HAT_BITIS: "KONAK",
        TARIFE: "Standart"
      }
    ],
    tableHeaders: ["HAT_NO", "HAT_ADI", "HAT_BASLANGIC", "HAT_BITIS"],
    tableRows: [
      ["5", "NARLIDERE - KUYULAR İSKELE", "NARLIDERE", "KUYULAR İSKELE"],
      ["6", "ARIKENT - KUYULAR İSKELE", "ARIKENT", "KUYULAR İSKELE"],
      ["10", "FAHRETTİN ALTAY - KONAK", "FAHRETTİN ALTAY", "KONAK"]
    ]
  },

  bisim: {
    name: "BİSİM İstasyonları",
    badge: "Mikro Mobilite",
    endpoint: "api.bisim.getIstasyonList()",
    tsCode: `import { IzmirAPI, toGeoJSON } from "izmir-open-data-js";

const api = new IzmirAPI({ cache: true });

// BİSİM istasyon doluluk ve kapasite bilgileri
const istasyonlar = await api.bisim.getIstasyonList();

// CBS verisini doğrudan standart GeoJSON formatına dönüştürme
const geojson = toGeoJSON(istasyonlar);
console.log("FeatureCollection:", geojson.features.length);`,
    jsonResult: [
      {
        IstasyonId: 101,
        Adi: "Konak İskele",
        Kapasite: 30,
        BosKapasite: 12,
        BisikletSayisi: 18,
        BOYLAM: 27.1287,
        ENLEM: 38.4189,
        Durum: "Aktif"
      },
      {
        IstasyonId: 102,
        Adi: "Alsancak Liman",
        Kapasite: 24,
        BosKapasite: 8,
        BisikletSayisi: 16,
        BOYLAM: 27.1442,
        ENLEM: 38.4412,
        Durum: "Aktif"
      },
      {
        IstasyonId: 103,
        Adi: "Karşıyaka Vapur İskelesi",
        Kapasite: 36,
        BosKapasite: 15,
        BisikletSayisi: 21,
        BOYLAM: 27.1198,
        ENLEM: 38.4561,
        Durum: "Aktif"
      }
    ],
    tableHeaders: ["Adi", "Kapasite", "BisikletSayisi", "Durum"],
    tableRows: [
      ["Konak İskele", "30", "18", "Aktif"],
      ["Alsancak Liman", "24", "16", "Aktif"],
      ["Karşıyaka Vapur İskelesi", "36", "21", "Aktif"]
    ]
  },

  eczaneler: {
    name: "Nöbetçi Eczaneler",
    badge: "Sağlık",
    endpoint: "api.eczaneler.getNobetciList()",
    tsCode: `import { IzmirAPI, extractCoordinates } from "izmir-open-data-js";

const api = new IzmirAPI({ cache: true });

// İzmir genelinde aktif nöbetçi eczaneler
const eczaneler = await api.eczaneler.getNobetciList();

eczaneler.forEach(e => {
  // Yazılım Şube LokasyonX/Y koordinatını [lon, lat] çiftine çevir
  const coords = extractCoordinates(e);
  console.log(\`\${e.Adi} (\${e.Bolge}):\`, coords);
});`,
    jsonResult: [
      {
        EczaneId: 442,
        Adi: "Alsancak Eczanesi",
        Telefon: "02324641234",
        Adres: "Ali Çetinkaya Bulvarı No: 18/A",
        Bolge: "Konak",
        LokasyonX: "38.4385",
        LokasyonY: "27.1432",
        Tarih: "2026-11-20"
      },
      {
        EczaneId: 445,
        Adi: "Bostanlı Eczanesi",
        Telefon: "02323624567",
        Adres: "Cemal Gürsel Cad. No: 92/B",
        Bolge: "Karşıyaka",
        LokasyonX: "38.4552",
        LokasyonY: "27.0981",
        Tarih: "2026-11-20"
      }
    ],
    tableHeaders: ["Adi", "Bolge", "Telefon", "Adres"],
    tableRows: [
      ["Alsancak Eczanesi", "Konak", "02324641234", "Ali Çetinkaya Bulvarı No: 18/A"],
      ["Bostanlı Eczanesi", "Karşıyaka", "02323624567", "Cemal Gürsel Cad. No: 92/B"]
    ]
  },

  izsu: {
    name: "İZSU Baraj Doluluk",
    badge: "Altyapı",
    endpoint: "api.izsu.getBarajDurumList()",
    tsCode: `import { IzmirAPI } from "izmir-open-data-js";

const api = new IzmirAPI();

// İzmir barajlarının anlık doluluk ve su hacim verileri
const barajlar = await api.izsu.getBarajDurumList();
const tahtali = barajlar.find(b => b.BarajAdi.includes("Tahtalı"));

console.log(\`Tahtalı Barajı Doluluk Oranı: %\${tahtali.DolulukOrani}\`);`,
    jsonResult: [
      {
        BarajAdi: "Tahtalı Barajı",
        KapasiteM3: 287000000,
        MevcutSuHacmiM3: 98500000,
        DolulukOrani: 34.32,
        Tarih: "2026-11-20"
      },
      {
        BarajAdi: "Balçova Barajı",
        KapasiteM3: 7750000,
        MevcutSuHacmiM3: 3100000,
        DolulukOrani: 40.0,
        Tarih: "2026-11-20"
      },
      {
        BarajAdi: "Gördes Barajı",
        KapasiteM3: 448000000,
        MevcutSuHacmiM3: 32000000,
        DolulukOrani: 7.14,
        Tarih: "2026-11-20"
      }
    ],
    tableHeaders: ["BarajAdi", "KapasiteM3", "DolulukOrani", "Tarih"],
    tableRows: [
      ["Tahtalı Barajı", "287,000,000 m³", "%34.32", "2026-11-20"],
      ["Balçova Barajı", "7,750,000 m³", "%40.00", "2026-11-20"],
      ["Gördes Barajı", "448,000,000 m³", "%7.14", "2026-11-20"]
    ]
  },

  ckanQuery: {
    name: "CKAN Query Builder",
    badge: "Veri Ambarı",
    endpoint: "api.ckan.query(resourceId)",
    tsCode: `import { IzmirAPI, toGeoJSON } from "izmir-open-data-js";

const api = new IzmirAPI();

// Akıllı Tuvaletler Datastore üzerinde akıcı sorgu
const query = api.ckan
  .query("d87de3c1-9bc0-4a8c-842a-90cd2a30d03a")
  .where("ILCE", "KONAK")
  .search("Meydan")
  .sort("_id", "asc")
  .page(1, 10);

const result = await query.execute();

// Standart RFC 7946 GeoJSON FeatureCollection çıktısı
const geojson = toGeoJSON(result.records);
console.log("GeoJSON:", geojson);`,
    jsonResult: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [27.1287, 38.4189]
          },
          properties: {
            _id: 1,
            ADI: "Konak Meydanı Akıllı Tuvalet",
            ILCE: "KONAK",
            ERISILEBILIR: "EVET",
            DURUM: "AKTIF"
          }
        },
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [27.1428, 38.4356]
          },
          properties: {
            _id: 2,
            ADI: "Gündoğdu Meydanı Akıllı Tuvalet",
            ILCE: "KONAK",
            ERISILEBILIR: "EVET",
            DURUM: "AKTIF"
          }
        }
      ]
    },
    tableHeaders: ["_id", "ADI", "ILCE", "ERISILEBILIR", "DURUM"],
    tableRows: [
      ["1", "Konak Meydanı Akıllı Tuvalet", "KONAK", "EVET", "AKTIF"],
      ["2", "Gündoğdu Meydanı Akıllı Tuvalet", "KONAK", "EVET", "AKTIF"]
    ]
  }
};

// ============================================================================
// 2. Install Bar Tabs
// ============================================================================
const INSTALL_COMMANDS = {
  npm: "npm install izmir-open-data-js",
  pnpm: "pnpm add izmir-open-data-js",
  yarn: "yarn add izmir-open-data-js",
  brew: "brew install AtaCanYmc/tap/izmir-cli",
  npx: "npx izmir-cli get nobetcieczaneler"
};

function initInstallTabs() {
  const tabs = document.querySelectorAll(".install-tab-btn");
  const commandText = document.getElementById("install-command");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const pm = tab.getAttribute("data-pm");
      if (!pm || !INSTALL_COMMANDS[pm]) return;

      tabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");

      if (commandText) {
        commandText.textContent = INSTALL_COMMANDS[pm];
      }
    });
  });
}

// ============================================================================
// 3. Copy Button Functionality (Async Clipboard API + Live Region Feedback)
// ============================================================================
const copyTimers = new WeakMap();

async function handleCopy(button) {
  const targetId = button.getAttribute("commandfor");
  let text = "";

  if (targetId) {
    const el = document.getElementById(targetId);
    if (el) text = el.innerText.trim();
  } else if (button.getAttribute("data-copy-text")) {
    text = button.getAttribute("data-copy-text");
  }

  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    showCopyFeedback(button, true);
  } catch {
    showCopyFeedback(button, false);
  }
}

function showCopyFeedback(button, success) {
  const tooltip = button.nextElementSibling;
  clearTimeout(copyTimers.get(button));

  button.removeAttribute("data-copied");
  button.removeAttribute("data-failed");

  const message = success ? "Kopyalandı!" : "Kopyalama başarısız";
  if (tooltip) tooltip.textContent = "";

  void button.offsetWidth; // Force reflow
  button.setAttribute(success ? "data-copied" : "data-failed", "");

  if (tooltip) {
    requestAnimationFrame(() => {
      tooltip.textContent = message;
    });
  }

  copyTimers.set(
    button,
    setTimeout(() => {
      button.removeAttribute("data-copied");
      button.removeAttribute("data-failed");
      if (tooltip) tooltip.textContent = "";
    }, 2000)
  );
}

function initCopyButtons() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".copy-btn");
    if (btn) {
      handleCopy(btn);
    }
  });
}

// ============================================================================
// 4. Accessible Theme Toggle (light-dark() and meta sync)
// ============================================================================
function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const meta = document.querySelector('meta[name="color-scheme"]');
  if (!toggleBtn || !meta) return;

  toggleBtn.addEventListener("click", () => {
    const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentScheme = meta.content;

    let target = "dark";
    if (currentScheme === "dark") {
      target = "light";
    } else if (currentScheme === "light") {
      target = "dark";
    } else {
      target = isDark ? "light" : "dark";
    }

    meta.content = target;
    try {
      localStorage.setItem("color-scheme", target);
    } catch {
      // Ignore private mode storage failure
    }
  });
}

// ============================================================================
// 5. Interactive Playground Controller
// ============================================================================
let currentEndpointKey = "eshot";
let currentViewMode = "ts"; // 'ts' | 'json' | 'table'

function renderPlayground() {
  const data = ENDPOINTS_DATA[currentEndpointKey];
  const display = document.getElementById("playground-display");
  if (!data || !display) return;

  if (currentViewMode === "ts") {
    display.innerHTML = `<pre><code>${escapeHtml(data.tsCode)}</code></pre>`;
  } else if (currentViewMode === "json") {
    display.innerHTML = `<pre><code>${escapeHtml(JSON.stringify(data.jsonResult, null, 2))}</code></pre>`;
  } else if (currentViewMode === "table") {
    if (data.tableHeaders && data.tableRows) {
      let tableHtml = `<div style="overflow-x: auto;"><table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem;">
        <thead>
          <tr style="border-bottom: 2px solid var(--border-subtle); text-align: left;">
            ${data.tableHeaders.map((h) => `<th style="padding: 0.6rem 0.75rem; color: var(--brand-aegean);">${h}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${data.tableRows
            .map(
              (row) => `<tr style="border-bottom: 1px solid var(--border-subtle);">
            ${row.map((cell) => `<td style="padding: 0.6rem 0.75rem; color: #cbd5e1;">${escapeHtml(cell)}</td>`).join("")}
          </tr>`
            )
            .join("")}
        </tbody>
      </table></div>`;
      display.innerHTML = tableHtml;
    } else {
      display.innerHTML = `<pre><code>${escapeHtml(JSON.stringify(data.jsonResult, null, 2))}</code></pre>`;
    }
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function initPlayground() {
  const endpointBtns = document.querySelectorAll(".endpoint-btn");
  const viewModeBtns = document.querySelectorAll(".view-mode-btn");
  const executeBtn = document.getElementById("execute-btn");

  endpointBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-endpoint");
      if (!key || !ENDPOINTS_DATA[key]) return;

      endpointBtns.forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");

      currentEndpointKey = key;
      renderPlayground();
    });
  });

  viewModeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-view");
      if (!mode) return;

      viewModeBtns.forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");

      currentViewMode = mode;
      renderPlayground();
    });
  });

  if (executeBtn) {
    executeBtn.addEventListener("click", () => {
      const originalText = executeBtn.innerHTML;
      executeBtn.disabled = true;
      executeBtn.innerHTML = `<span>Sorgulanıyor...</span>`;

      setTimeout(() => {
        executeBtn.disabled = false;
        executeBtn.innerHTML = originalText;
        currentViewMode = "json";

        viewModeBtns.forEach((b) => {
          b.setAttribute("aria-selected", b.getAttribute("data-view") === "json" ? "true" : "false");
        });

        renderPlayground();
      }, 350);
    });
  }

  renderPlayground();
}

// ============================================================================
// 6. Terminal Interactive Commands Controller
// ============================================================================
const TERMINAL_OUTPUTS = {
  get: `$ izmir get nobetcieczaneler
Fetching dataset: ibb/nobetcieczaneler from İzmir Open Data...
┌───────────────────┬───────────┬─────────────┬────────────────────────────────┐
│ Adi               │ Bolge     │ Telefon     │ Adres                          │
├───────────────────┼───────────┼─────────────┼────────────────────────────────┤
│ Alsancak Eczanesi │ Konak     │ 02324641234 │ Ali Çetinkaya Bulv. No: 18/A   │
│ Bostanlı Eczanesi │ Karşıyaka │ 02323624567 │ Cemal Gürsel Cad. No: 92/B     │
│ Göztepe Eczanesi  │ Konak     │ 02322448910 │ Mithatpaşa Cad. No: 612        │
└───────────────────┴───────────┴─────────────┴────────────────────────────────┘
Not: Terminale sığması için 4 sütun gösterildi.`,

  search: `$ izmir search otopark
Searching datasets for: otopark in İzmir Açık Veri...
Toplam bulunan veri seti: 3 (Gösterilen: 3)

┌───────────────────────┬────────────────────────────────────┬───────────────┐
│ ID / Slug             │ Başlık                             │ Kaynak Sayısı │
├───────────────────────┼────────────────────────────────────┼───────────────┤
│ otopark-ucret-tarifesi│ İZELMAN Otopark Ücret Tarifesi     │ 2             │
│ izum-otopark-kapasite │ İZUM Otopark Anlık Doluluk Verileri│ 1             │
│ engelli-otopark-yerleri│ Engelli Araç Park Yerleri Konumları│ 1             │
└───────────────────────┴────────────────────────────────────┴───────────────┘`,

  brew: `$ brew tap AtaCanYmc/tap
==> Tapping atacanymc/tap
Cloning into '/opt/homebrew/Library/Taps/atacanymc/homebrew-tap'...
Tapped 8 formulae (14 files, 112KB).

$ brew install izmir-cli
==> Installing izmir-cli from atacanymc/tap
==> Downloading registry.npmjs.org/izmir-open-data-js-2.0.0.tgz
==> Symlinking izmir-cli and izmir to /opt/homebrew/bin
🍺  /opt/homebrew/Cellar/izmir-cli/2.0.0: 96 files, 248.9KB, built in 2 seconds`
};

function initTerminalTabs() {
  const termTabs = document.querySelectorAll(".term-tab-btn");
  const termOutput = document.getElementById("terminal-output");

  termTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const cmdKey = tab.getAttribute("data-term-cmd");
      if (!cmdKey || !TERMINAL_OUTPUTS[cmdKey]) return;

      termTabs.forEach((t) => t.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");

      if (termOutput) {
        termOutput.textContent = TERMINAL_OUTPUTS[cmdKey];
      }
    });
  });
}

// ============================================================================
// 7. Initialization
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initInstallTabs();
  initCopyButtons();
  initThemeToggle();
  initPlayground();
  initTerminalTabs();
});
