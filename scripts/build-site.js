import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const docsDir = path.join(rootDir, "docs");
const siteDir = path.join(rootDir, "site");

function getCommonHead(title, description, relativeRoot = "") {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light dark">
  <script>
    try {
      const stored = localStorage.getItem("color-scheme");
      if (stored) {
        document.querySelector('meta[name="color-scheme"]').content = stored;
      }
    } catch (e) {}
  </script>
  
  <title>${title} — izmir-open-data-js</title>
  <meta name="description" content="${description}">
  
  <link rel="icon" type="image/svg+xml" href="${relativeRoot}assets/logo.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="${relativeRoot}styles.css">
</head>
<body>

  <!-- Site Header -->
  <header class="site-header">
    <div class="container nav-wrapper">
      <a href="${relativeRoot}index.html" class="brand-link" aria-label="İzmir Open Data JS Ana Sayfa">
        <img src="${relativeRoot}assets/logo.svg" alt="Logo" class="brand-logo" width="32" height="32">
        <span>izmir-open-data-js</span>
        <span class="version-pill">v2.1.0</span>
      </a>

      <nav class="nav-menu" aria-label="Ana Gezinti">
        <a href="${relativeRoot}index.html" class="nav-link">Ana Sayfa</a>
        <a href="${relativeRoot}index.html#playground" class="nav-link">Canlı Demo</a>
        <a href="${relativeRoot}ENDPOINTS.html" class="nav-link">Uç Noktalar</a>
        <a href="${relativeRoot}CLI.html" class="nav-link">CLI Kılavuzu</a>
        <a href="${relativeRoot}MCP.html" class="nav-link">MCP Sunucusu</a>
        <a href="${relativeRoot}specs/index.html" class="nav-link">Şartnameler</a>
      </nav>

      <div class="header-actions">
        <!-- Theme Toggle Button -->
        <button type="button" id="theme-toggle" class="theme-toggle-btn" aria-label="Temayı değiştir">
          <svg class="theme-icon-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg class="theme-icon-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <a href="https://github.com/AtaCanYmc/izmir-open-data-js" class="btn-github" target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </header>`;
}

function getCommonFooter(relativeRoot = "") {
  return `  <!-- Site Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          <div style="display: flex; align-items: center; gap: 0.6rem; font-weight: 700; font-size: 1.125rem;">
            <img src="${relativeRoot}assets/logo.svg" alt="Logo" width="24" height="24">
            <span>izmir-open-data-js</span>
          </div>
          <p class="footer-brand-desc">
            İzmir Büyükşehir Belediyesi Açık Veri Portalı için bağımsız, açık kaynaklı TypeScript istemcisi, terminal aracı ve Model Context Protocol sunucusu.
          </p>
        </div>

        <div>
          <div class="footer-heading">Dokümantasyon</div>
          <ul class="footer-links">
            <li><a href="${relativeRoot}ENDPOINTS.html" class="footer-link">Uç Nokta Listesi</a></li>
            <li><a href="${relativeRoot}CLI.html" class="footer-link">CLI Kılavuzu</a></li>
            <li><a href="${relativeRoot}MCP.html" class="footer-link">Model Context Protocol (MCP)</a></li>
            <li><a href="${relativeRoot}specs/index.html" class="footer-link">Resmi Şartnameler (Specs)</a></li>
          </ul>
        </div>

        <div>
          <div class="footer-heading">Topluluk & Dağıtım</div>
          <ul class="footer-links">
            <li><a href="https://github.com/AtaCanYmc/izmir-open-data-js" class="footer-link" target="_blank" rel="noopener noreferrer">GitHub Deposu</a></li>
            <li><a href="https://www.npmjs.com/package/izmir-open-data-js" class="footer-link" target="_blank" rel="noopener noreferrer">npm Paketi</a></li>
            <li><a href="https://github.com/AtaCanYmc/homebrew-tap" class="footer-link" target="_blank" rel="noopener noreferrer">Homebrew Tap</a></li>
            <li><a href="https://acikveri.bizizmir.com/" class="footer-link" target="_blank" rel="noopener noreferrer">İzmir Açık Veri Portalı</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>Apache-2.0 Lisansı · Copyright © 2026 Ata Can Yaymacı.</div>
        <div>İzmir Büyükşehir Belediyesi ile resmi bağlantısı bulunmayan açık kaynak topluluk projesidir.</div>
      </div>
    </div>
  </footer>

  <script src="${relativeRoot}app.js"></script>
</body>
</html>`;
}

// Map service titles to category icons
const CATEGORY_MAP = {
  afetler: { cat: "afet", icon: "afet.svg", label: "Afet & Acil Durum" },
  itfaiye: { cat: "afet", icon: "afet.svg", label: "Afet & Acil Durum" },
  
  eshot: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },
  izban: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },
  metro: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },
  tramvay: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },
  vapur: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },
  tren: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },
  taksi: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },
  trafik: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },
  otopark: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },
  izmirimkart: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },
  izum: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },
  ulasim: { cat: "ulasim", icon: "ulasim.svg", label: "Ulaşım & Hareketlilik" },

  eczaneler: { cat: "saglik", icon: "saglik.svg", label: "Sağlık & Eczane" },
  saglik: { cat: "saglik", icon: "saglik.svg", label: "Sağlık & Eczane" },
  turuncucember: { cat: "saglik", icon: "saglik.svg", label: "Sağlık & Eczane" },

  ckan: { cat: "dijital", icon: "dijital.svg", label: "Dijital & CKAN" },
  veri: { cat: "dijital", icon: "dijital.svg", label: "Dijital & CKAN" },
  iztek: { cat: "dijital", icon: "dijital.svg", label: "Dijital & CKAN" },
  wizmirnet: { cat: "dijital", icon: "dijital.svg", label: "Dijital & CKAN" },
  yardimci: { cat: "dijital", icon: "dijital.svg", label: "Dijital & CKAN" },

  bisim: { cat: "rekreasyon", icon: "rekreasyon.svg", label: "Rekreasyon & Spor" },
  spor: { cat: "rekreasyon", icon: "rekreasyon.svg", label: "Rekreasyon & Spor" },
  plaj: { cat: "rekreasyon", icon: "rekreasyon.svg", label: "Rekreasyon & Spor" },

  tarihi: { cat: "tarih", icon: "tarih.svg", label: "Tarih & Miras" },
  tarih: { cat: "tarih", icon: "tarih.svg", label: "Tarih & Miras" },

  egitim: { cat: "egitim", icon: "egitim.svg", label: "Eğitim" },

  etkinlikler: { cat: "kultur", icon: "kultur.svg", label: "Kültür Sanat" },
  kutuphane: { cat: "kultur", icon: "kultur.svg", label: "Kültür Sanat" },

  izsu: { cat: "yasam", icon: "yasam.svg", label: "Kentsel Yaşam" },
  iklim: { cat: "yasam", icon: "yasam.svg", label: "Kentsel Yaşam" },
  cografi: { cat: "yasam", icon: "yasam.svg", label: "Kentsel Yaşam" },
  pazarlar: { cat: "yasam", icon: "yasam.svg", label: "Kentsel Yaşam" },
  sosyal: { cat: "yasam", icon: "yasam.svg", label: "Kentsel Yaşam" },
  tuvalet: { cat: "yasam", icon: "yasam.svg", label: "Kentsel Yaşam" },

  kamu: { cat: "yonetim", icon: "yonetim.svg", label: "Yönetim & Hizmet" },
  hizmet: { cat: "yonetim", icon: "yonetim.svg", label: "Yönetim & Hizmet" },
  muhtarliklar: { cat: "yonetim", icon: "yonetim.svg", label: "Yönetim & Hizmet" }
};

function resolveCategory(key) {
  const norm = key.toLowerCase().replace(/[^a-z]/g, "");
  for (const [k, v] of Object.entries(CATEGORY_MAP)) {
    if (norm.includes(k)) return v;
  }
  return { cat: "dijital", icon: "dijital.svg", label: "Genel Veri" };
}

// ----------------------------------------------------------------------------
// 1. Build ENDPOINTS.html
// ----------------------------------------------------------------------------
function buildEndpointsHtml() {
  const mdContent = fs.readFileSync(path.join(docsDir, "ENDPOINTS.md"), "utf8");
  const lines = mdContent.split("\n");

  const sections = [];
  let currentSection = null;
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith("## ")) {
      const titleLine = line.substring(3).trim();
      let title = titleLine;
      let namespace = "";
      const match = titleLine.match(/^(.*?)\s*\(`(.*?)`\)/);
      if (match) {
        title = match[1].trim();
        namespace = match[2].trim();
      }

      const catInfo = resolveCategory(title);

      currentSection = {
        title,
        namespace,
        category: catInfo.cat,
        icon: catInfo.icon,
        categoryLabel: catInfo.label,
        methods: []
      };
      sections.push(currentSection);
      inTable = false;
      continue;
    }

    if (line.startsWith("|") && currentSection) {
      if (line.includes("Metod Adı") || line.includes("Fonksiyon / Sınıf") || line.includes("---")) {
        inTable = true;
        continue;
      }

      const parts = line.split("|").map(p => p.trim()).filter(p => p.length > 0);
      if (parts.length >= 2) {
        let name = parts[0].replace(/`/g, "");
        let desc = parts[1];
        if (parts.length >= 3 && currentSection.title.includes("Yardımcı")) {
          desc = `${parts[2]} (Modül: <code>${parts[1].replace(/`/g, "")}</code>)`;
        }
        currentSection.methods.push({ name, desc });
      }
    }
  }

  const totalMethods = sections.reduce((acc, s) => acc + s.methods.length, 0);

  let cardsHtml = "";
  for (const s of sections) {
    if (s.methods.length === 0) continue;
    cardsHtml += `
      <section class="doc-card endpoint-module-card" data-category="${s.category}" data-title="${s.title.toLowerCase()}" data-namespace="${s.namespace.toLowerCase()}">
        <div class="doc-card-header">
          <div class="doc-card-title">
            <div class="category-icon-wrap" style="width: 32px; height: 32px;">
              <img src="assets/categories/${s.icon}" alt="${s.categoryLabel}" class="category-icon" width="18" height="18">
            </div>
            <span>${s.title}</span>
            ${s.namespace ? `<span class="doc-card-badge">${s.namespace}</span>` : ""}
          </div>
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <span class="doc-card-badge" style="background: rgba(2, 132, 199, 0.05); color: var(--text-muted);">${s.categoryLabel}</span>
            <span class="text-muted" style="font-size: 0.8125rem;">${s.methods.length} metot</span>
          </div>
        </div>
        <div class="doc-table-wrapper">
          <table class="doc-table">
            <thead>
              <tr>
                <th style="width: 38%;">Metot / Fonksiyon</th>
                <th>Açıklama</th>
              </tr>
            </thead>
            <tbody>
              ${s.methods.map(m => `
                <tr class="endpoint-row" data-search="${m.name.toLowerCase()} ${m.desc.toLowerCase()}">
                  <td><code class="method-chip">${m.name}</code></td>
                  <td>${m.desc}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  const bodyContent = `
  <main class="doc-page">
    <div class="container">
      <nav class="breadcrumb-nav" aria-label="Ekmek kırıntısı">
        <a href="index.html" class="breadcrumb-link">Ana Sayfa</a>
        <span>/</span>
        <span class="text-secondary">Dokümantasyon</span>
        <span>/</span>
        <span aria-current="page">Uç Noktalar</span>
      </nav>

      <div class="doc-hero-with-illustration">
        <div class="doc-hero-text">
          <h1 class="doc-title">İzmir Open Data Uç Nokta Kataloğu</h1>
          <p class="doc-lead">
            İzmir Büyükşehir Belediyesi Açık Veri Portalı ve REST web servislerinin <code>izmir-open-data-js</code> istemcisi içindeki modül, metod ve normalleştirici referansı.
          </p>

          <div class="doc-search-wrapper">
            <div class="doc-search-box">
              <svg class="doc-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="search" 
                id="endpoint-search-input" 
                class="doc-search-input" 
                placeholder="Uç nokta veya metot ara (örn: eshot, nobetci, su kesinti, ckan)..." 
                aria-label="Uç noktalarda ara"
                autocomplete="off"
              >
            </div>
            <div class="doc-search-stats" id="endpoint-search-stats" aria-live="polite">
              Toplam ${sections.length} servis grubu ve ${totalMethods} metot listeleniyor.
            </div>
          </div>

          <!-- Category Quick Filter Buttons -->
          <div class="doc-quick-filters" role="group" aria-label="Kategoriye göre filtrele">
            <button type="button" class="quick-filter-btn" data-filter="all" aria-pressed="true">
              <span>Tümü</span>
            </button>
            <button type="button" class="quick-filter-btn" data-filter="ulasim">
              <img src="assets/categories/ulasim.svg" class="quick-filter-icon" alt="">
              <span>Ulaşım (${sections.filter(s => s.category === 'ulasim').length})</span>
            </button>
            <button type="button" class="quick-filter-btn" data-filter="saglik">
              <img src="assets/categories/saglik.svg" class="quick-filter-icon" alt="">
              <span>Sağlık & Eczane</span>
            </button>
            <button type="button" class="quick-filter-btn" data-filter="yasam">
              <img src="assets/categories/yasam.svg" class="quick-filter-icon" alt="">
              <span>Kentsel Yaşam & Su</span>
            </button>
            <button type="button" class="quick-filter-btn" data-filter="afet">
              <img src="assets/categories/afet.svg" class="quick-filter-icon" alt="">
              <span>Afet & İtfaiye</span>
            </button>
            <button type="button" class="quick-filter-btn" data-filter="dijital">
              <img src="assets/categories/dijital.svg" class="quick-filter-icon" alt="">
              <span>CKAN & Dijital</span>
            </button>
            <button type="button" class="quick-filter-btn" data-filter="rekreasyon">
              <img src="assets/categories/rekreasyon.svg" class="quick-filter-icon" alt="">
              <span>BİSİM & Spor</span>
            </button>
            <button type="button" class="quick-filter-btn" data-filter="kultur">
              <img src="assets/categories/kultur.svg" class="quick-filter-icon" alt="">
              <span>Kültür & Etkinlik</span>
            </button>
          </div>
        </div>

        <div class="doc-hero-image-wrap">
          <img src="assets/illustrations/smart_city.svg" alt="İzmir Akıllı Şehir Açık Veri Ağı" class="doc-hero-img" width="220" height="180">
        </div>
      </div>

      <div id="endpoint-modules-container">
        ${cardsHtml}
      </div>
    </div>
  </main>

  <script>
    // Live Search & Category Filtering
    document.addEventListener("DOMContentLoaded", () => {
      const searchInput = document.getElementById("endpoint-search-input");
      const statsEl = document.getElementById("endpoint-search-stats");
      const cards = document.querySelectorAll(".endpoint-module-card");
      const filterBtns = document.querySelectorAll(".quick-filter-btn");
      const totalCount = ${totalMethods};

      let activeCategory = "all";

      function updateResults() {
        const query = searchInput.value.trim().toLowerCase();
        let visibleCards = 0;
        let matchedMethods = 0;

        cards.forEach(card => {
          const cardCat = card.getAttribute("data-category") || "";
          const cardTitle = card.getAttribute("data-title") || "";
          const cardNs = card.getAttribute("data-namespace") || "";
          const rows = card.querySelectorAll(".endpoint-row");

          const matchesCategory = activeCategory === "all" || cardCat === activeCategory;

          if (!matchesCategory) {
            card.style.display = "none";
            return;
          }

          if (!query) {
            card.style.display = "";
            rows.forEach(r => r.style.display = "");
            visibleCards++;
            matchedMethods += rows.length;
            return;
          }

          let cardMatches = 0;
          const cardHeaderMatch = cardTitle.includes(query) || cardNs.includes(query);

          rows.forEach(row => {
            const rowText = row.getAttribute("data-search") || "";
            if (cardHeaderMatch || rowText.includes(query)) {
              row.style.display = "";
              cardMatches++;
              matchedMethods++;
            } else {
              row.style.display = "none";
            }
          });

          if (cardMatches > 0) {
            card.style.display = "";
            visibleCards++;
          } else {
            card.style.display = "none";
          }
        });

        if (query || activeCategory !== "all") {
          statsEl.textContent = \`Filtrelenen: \${matchedMethods} metot (\${visibleCards} servis grubu).\`;
        } else {
          statsEl.textContent = \`Toplam \${cards.length} servis grubu ve \${totalCount} metot listeleniyor.\`;
        }
      }

      if (searchInput) {
        searchInput.addEventListener("input", updateResults);
      }

      filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          filterBtns.forEach(b => b.setAttribute("aria-pressed", "false"));
          btn.setAttribute("aria-pressed", "true");
          activeCategory = btn.getAttribute("data-filter") || "all";
          updateResults();
        });
      });
    });
  </script>
  `;

  const finalHtml = `${getCommonHead(
    "Uç Nokta Kataloğu (API Reference)",
    "İzmir Büyükşehir Belediyesi Açık Veri Portalı tüm API uç noktaları, ESHOT, İZSU, BİSİM, CKAN ve coğrafi servis metotları referansı."
  )}\n${bodyContent}\n${getCommonFooter()}`;

  fs.writeFileSync(path.join(siteDir, "ENDPOINTS.html"), finalHtml, "utf8");
  console.log("Generated site/ENDPOINTS.html");
}

// ----------------------------------------------------------------------------
// 2. Build CLI.html
// ----------------------------------------------------------------------------
function buildCliHtml() {
  const bodyContent = `
  <main class="doc-page">
    <div class="container" style="max-width: 920px;">
      <nav class="breadcrumb-nav" aria-label="Ekmek kırıntısı">
        <a href="index.html" class="breadcrumb-link">Ana Sayfa</a>
        <span>/</span>
        <span class="text-secondary">Dokümantasyon</span>
        <span>/</span>
        <span aria-current="page">CLI Kılavuzu</span>
      </nav>

      <div class="doc-hero-with-illustration">
        <div class="doc-hero-text">
          <h1 class="doc-title">Terminal CLI Kılavuzu</h1>
          <p class="doc-lead">
            <code>izmir-open-data-js</code>, belediye açık veri portallarını terminal üzerinden sorgulamak, filtrelemek ve ASCII tabloları halinde görselleştirmek için <code>izmir-cli</code> komut satırı aracını sunar.
          </p>
        </div>
        <div class="doc-hero-image-wrap">
          <img src="assets/illustrations/map_mobility.svg" alt="Terminal Hareketlilik Haritası" class="doc-hero-img" width="220" height="180">
        </div>
      </div>

      <div class="doc-section">
        <h2>Kurulum ve Paket Yöneticileri</h2>
        
        <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 1.125rem;">1. Homebrew ile Kurulum (macOS / Linux)</h3>
        <p class="text-secondary">Official Homebrew Tap üzerinden kalıcı global CLI kurulumu:</p>
        
        <div class="doc-code-block">
          <div class="doc-code-header">
            <span>bash</span>
            <button type="button" class="copy-btn" data-copy="brew tap AtaCanYmc/tap && brew install izmir-cli" aria-label="Komutu kopyala">Kopyala</button>
          </div>
          <div class="doc-code-content"># Tap ekleyip kurma
brew tap AtaCanYmc/tap
brew install izmir-cli

# Veya doğrudan tek komutla:
brew install AtaCanYmc/tap/izmir-cli</div>
        </div>
        <p class="text-secondary">Kurulum tamamlandığında hem <code>izmir-cli</code> hem de <code>izmir</code> komutu terminalinizde hazır hale gelir.</p>

        <h3 style="margin-top: 2rem; margin-bottom: 0.5rem; font-size: 1.125rem;">2. npm / npx ile Çalıştırma</h3>
        <div class="doc-code-block">
          <div class="doc-code-header">
            <span>bash</span>
            <button type="button" class="copy-btn" data-copy="npm install -g izmir-open-data-js" aria-label="Komutu kopyala">Kopyala</button>
          </div>
          <div class="doc-code-content"># Global npm kurulumu
npm install -g izmir-open-data-js

# npx ile anında çalıştırma (kurulum gerektirmez):
npx izmir-cli get cbs/bisimistasyon</div>
        </div>
      </div>

      <div class="doc-section">
        <h2>Komut Referansı</h2>
        <div class="doc-card" style="margin-top: 1rem;">
          <div class="doc-table-wrapper">
            <table class="doc-table">
              <thead>
                <tr>
                  <th style="width: 22%;">Komut</th>
                  <th style="width: 32%;">Parametreler</th>
                  <th>Açıklama</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code class="method-chip">get</code></td>
                  <td><code>&lt;dataset_id&gt;</code></td>
                  <td>Belirtilen veri seti kimliğine ait kayıtları çeker ve terminal tablosunda listeler.</td>
                </tr>
                <tr>
                  <td><code class="method-chip">search</code></td>
                  <td><code>&lt;query&gt; [-l limit]</code></td>
                  <td>Portaldaki 260+ veri setini arar ve kaynak sayılarıyla birlikte listeler.</td>
                </tr>
                <tr>
                  <td><code class="method-chip">datastore</code></td>
                  <td><code>&lt;resource_id&gt; [-l limit] [-q query]</code></td>
                  <td>Herhangi bir CKAN Datastore UUID'sinden canlı kayıtları çeker ve tablolar.</td>
                </tr>
                <tr>
                  <td><code class="method-chip">--help</code></td>
                  <td>-</td>
                  <td>Komut satırı kullanım kılavuzunu ve seçenekleri görüntüler.</td>
                </tr>
                <tr>
                  <td><code class="method-chip">--version</code></td>
                  <td>-</td>
                  <td>Yüklü paket sürümünü görüntüler.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="doc-section">
        <h2>Detaylı Kullanım Senaryoları & Örnekler</h2>
        
        <div class="doc-card" style="padding: 1.5rem; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <img src="assets/categories/rekreasyon.svg" width="20" height="20" alt="">
            <h3 style="font-size: 1rem;">1. BİSİM Akıllı Bisiklet İstasyonları</h3>
          </div>
          <p class="text-secondary" style="font-size: 0.875rem; margin-bottom: 0.75rem;">
            İzmir genelindeki tüm BİSİM istasyonlarının koordinat ve kapasite bilgilerini çeker:
          </p>
          <div class="doc-code-block" style="margin: 0;">
            <div class="doc-code-header">
              <span>bash</span>
              <button type="button" class="copy-btn" data-copy="izmir get cbs/bisimistasyon" aria-label="Kopyala">Kopyala</button>
            </div>
            <div class="doc-code-content">izmir get cbs/bisimistasyon</div>
          </div>
        </div>

        <div class="doc-card" style="padding: 1.5rem; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <img src="assets/categories/ulasim.svg" width="20" height="20" alt="">
            <h3 style="font-size: 1rem;">2. Canlı Otopark Doluluk Verileri</h3>
          </div>
          <p class="text-secondary" style="font-size: 0.875rem; margin-bottom: 0.75rem;">
            İZELMAN otoparklarının anlık boş kapasiteleri ve toplam kontenjanları:
          </p>
          <div class="doc-code-block" style="margin: 0;">
            <div class="doc-code-header">
              <span>bash</span>
              <button type="button" class="copy-btn" data-copy="izmir get otopark/otoparklar" aria-label="Kopyala">Kopyala</button>
            </div>
            <div class="doc-code-content">izmir get otopark/otoparklar</div>
          </div>
        </div>

        <div class="doc-card" style="padding: 1.5rem; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <img src="assets/categories/dijital.svg" width="20" height="20" alt="">
            <h3 style="font-size: 1rem;">3. CKAN Veri Seti Arama (Package Search)</h3>
          </div>
          <p class="text-secondary" style="font-size: 0.875rem; margin-bottom: 0.75rem;">
            Portaldaki 260+ veri seti arasında anahtar kelime ile arama:
          </p>
          <div class="doc-code-block" style="margin: 0;">
            <div class="doc-code-header">
              <span>bash</span>
              <button type="button" class="copy-btn" data-copy="izmir search otopark -l 5" aria-label="Kopyala">Kopyala</button>
            </div>
            <div class="doc-code-content"># İtfaiye ile ilgili ilk 5 veri setini listele
izmir search itfaiye -l 5

# Tuvalet veri setlerini ara
izmir search tuvalet</div>
          </div>
        </div>

        <div class="doc-card" style="padding: 1.5rem; margin-bottom: 1.25rem;">
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <img src="assets/categories/dijital.svg" width="20" height="20" alt="">
            <h3 style="font-size: 1rem;">4. Canlı Datastore Sorgulama (Resource UUID)</h3>
          </div>
          <p class="text-secondary" style="font-size: 0.875rem; margin-bottom: 0.75rem;">
            Belirli bir CKAN tablosundan canlı kayıtları filtreleyip tablolar:
          </p>
          <div class="doc-code-block" style="margin: 0;">
            <div class="doc-code-header">
              <span>bash</span>
              <button type="button" class="copy-btn" data-copy="izmir datastore d87de3c1-9bc0-4a8c-842a-90cd2a30d03a -l 10" aria-label="Kopyala">Kopyala</button>
            </div>
            <div class="doc-code-content">izmir datastore d87de3c1-9bc0-4a8c-842a-90cd2a30d03a -l 10</div>
          </div>
        </div>
      </div>

      <div class="doc-section">
        <h2>Boru Hatları & Kabuk Entegrasyonu (Pipelines)</h2>
        <p class="text-secondary">
          <code>izmir-cli</code> komutları Unix felsefesine uygun olarak tasarlanmıştır. Çıktıları <code>grep</code>, <code>fzf</code>, <code>awk</code> veya <code>crontab</code> süreçlerine bağlayabilirsiniz.
        </p>

        <div class="doc-code-block" style="margin-top: 1rem;">
          <div class="doc-code-header"><span>Boru Hattı Örneği</span></div>
          <div class="doc-code-content"># Nöbetçi eczaneler arasından sadece Konak ilçesini filtreleme
izmir get nobetcieczaneler | grep -i "Konak"

# Günlük otopark durumunu bir metin dosyasına arşivleme (Cronjob)
0 * * * * izmir get otopark/otoparklar >> /var/log/izmir_otopark.log</div>
        </div>
      </div>
    </div>
  </main>
  `;

  const finalHtml = `${getCommonHead(
    "CLI Kullanım Kılavuzu",
    "İzmir Açık Veri terminal aracı izmir-cli ve Homebrew tap kurulum ve komut kılavuzu."
  )}\n${bodyContent}\n${getCommonFooter()}`;

  fs.writeFileSync(path.join(siteDir, "CLI.html"), finalHtml, "utf8");
  console.log("Generated site/CLI.html");
}

// ----------------------------------------------------------------------------
// 3. Build MCP.html
// ----------------------------------------------------------------------------
function buildMcpHtml() {
  const bodyContent = `
  <main class="doc-page">
    <div class="container" style="max-width: 920px;">
      <nav class="breadcrumb-nav" aria-label="Ekmek kırıntısı">
        <a href="index.html" class="breadcrumb-link">Ana Sayfa</a>
        <span>/</span>
        <span class="text-secondary">Dokümantasyon</span>
        <span>/</span>
        <span aria-current="page">Model Context Protocol</span>
      </nav>

      <div class="doc-hero-with-illustration">
        <div class="doc-hero-text">
          <h1 class="doc-title">Model Context Protocol (MCP) Sunucusu</h1>
          <p class="doc-lead">
            <code>izmir-open-data-js</code>, <code>@modelcontextprotocol/sdk</code> altyapısı üzerine inşa edilmiş tam uyumlu bir MCP sunucusu içerir. Claude Desktop, Cursor veya yerel AI ajanlarının İzmir Açık Veri API'lerini doğrudan çalıştırmasını sağlar.
          </p>
        </div>
        <div class="doc-hero-image-wrap">
          <img src="assets/illustrations/city_analytics.svg" alt="MCP Şehir Analitiği ve Yapay Zeka" class="doc-hero-img" width="220" height="180">
        </div>
      </div>

      <div class="doc-section">
        <h2>Sunucuyu Başlatma</h2>
        <p class="text-secondary">MCP sunucusu standart girdi ve çıktı (<code>stdio</code>) üzerinden çalışır:</p>

        <div class="doc-code-block">
          <div class="doc-code-header">
            <span>bash</span>
            <button type="button" class="copy-btn" data-copy="npx -y izmir-open-data-js" aria-label="Kopyala">Kopyala</button>
          </div>
          <div class="doc-code-content"># npx ile anında çalıştırma (Önerilen)
npx -y izmir-open-data-js

# Global paket kurulu ise:
izmir-mcp</div>
        </div>
      </div>

      <div class="doc-section">
        <h2>İstemci Entegrasyonları & Yapılandırma</h2>

        <h3 style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-size: 1.125rem;">1. Claude Desktop Entegrasyonu</h3>
        <p class="text-secondary">
          <code>~/Library/Application Support/Claude/claude_desktop_config.json</code> (macOS) veya <code>%APPDATA%\\Claude\\claude_desktop_config.json</code> (Windows) dosyasına aşağıdaki sunucu tanımını ekleyin:
        </p>

        <div class="doc-code-block">
          <div class="doc-code-header">
            <span>claude_desktop_config.json</span>
            <button type="button" class="copy-btn" data-copy='{\n  "mcpServers": {\n    "izmir-open-data": {\n      "command": "npx",\n      "args": ["-y", "izmir-open-data-js"]\n    }\n  }\n}' aria-label="Kopyala">Kopyala</button>
          </div>
          <div class="doc-code-content">{
  "mcpServers": {
    "izmir-open-data": {
      "command": "npx",
      "args": ["-y", "izmir-open-data-js"]
    }
  }
}</div>
        </div>

        <h3 style="margin-top: 2rem; margin-bottom: 0.5rem; font-size: 1.125rem;">2. Cursor IDE Entegrasyonu</h3>
        <p class="text-secondary">
          Proje kök dizinindeki <code>.cursor/mcp.json</code> dosyasında MCP sunucusunu tanımlayın:
        </p>

        <div class="doc-code-block">
          <div class="doc-code-header">
            <span>.cursor/mcp.json</span>
            <button type="button" class="copy-btn" data-copy='{\n  "mcpServers": {\n    "izmir-api": {\n      "command": "npx",\n      "args": ["-y", "izmir-open-data-js"]\n    }\n  }\n}' aria-label="Kopyala">Kopyala</button>
          </div>
          <div class="doc-code-content">{
  "mcpServers": {
    "izmir-api": {
      "command": "npx",
      "args": ["-y", "izmir-open-data-js"]
    }
  }
}</div>
        </div>
      </div>

      <div class="doc-section">
        <h2>Sağlanan Araçlar (Tools Reference)</h2>
        <div class="doc-card" style="margin-top: 1rem;">
          <div class="doc-card-header">
            <span class="doc-card-title">1. list_endpoints</span>
            <span class="doc-card-badge">Discovery Tool</span>
          </div>
          <div style="padding: 1.25rem;">
            <p class="text-secondary" style="font-size: 0.9375rem; margin-bottom: 0.75rem;">
              İstemcideki tüm servis ad alanlarını ve bunlara bağlı çağrılabilir metotları dinamik olarak listeler. Yapay zeka modeli önce bu aracı çağırarak hangi belediye servislerinin mevcut olduğunu keşfeder.
            </p>
            <div class="doc-code-block" style="margin: 0;">
              <div class="doc-code-header"><span>Örnek Dizi Yanıtı</span></div>
              <div class="doc-code-content">[
  "bisim.getIstasyonList",
  "eczaneler.getNobetciList",
  "eshot.getHatlar",
  "eshot.getYakinDurakList",
  "izsu.getBarajDolulukOranlari",
  "otopark.getList",
  "ckan.searchPackages"
]</div>
            </div>
          </div>
        </div>

        <div class="doc-card">
          <div class="doc-card-header">
            <span class="doc-card-title">2. call_endpoint</span>
            <span class="doc-card-badge">Execution Tool</span>
          </div>
          <div style="padding: 1.25rem;">
            <p class="text-secondary" style="font-size: 0.9375rem; margin-bottom: 0.75rem;">
              Keşfedilen belirli bir belediye API metodunu parametreleriyle birlikte yürütür ve JSON yanıtını model bağlamına döndürür.
            </p>

            <div class="doc-table-wrapper" style="margin-bottom: 1rem;">
              <table class="doc-table">
                <thead>
                  <tr>
                    <th>Alan Adı</th>
                    <th>Tip</th>
                    <th>Zorunlu</th>
                    <th>Açıklama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code>namespace</code></td>
                    <td><code>string</code></td>
                    <td>Evet</td>
                    <td>Servis grubu adı (ör: <code>eshot</code>, <code>eczaneler</code>, <code>izsu</code>, <code>bisim</code>).</td>
                  </tr>
                  <tr>
                    <td><code>endpoint_name</code></td>
                    <td><code>string</code></td>
                    <td>Evet</td>
                    <td>Çağrılacak metodun adı (ör: <code>getNobetciList</code>, <code>getYakinDurakList</code>).</td>
                  </tr>
                  <tr>
                    <td><code>args</code></td>
                    <td><code>array</code></td>
                    <td>Hayır</td>
                    <td>Metoda aktarılacak sıralı parametre listesi (ör: koordinatlar, hat no, tarih).</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="doc-code-block" style="margin: 0;">
              <div class="doc-code-header"><span>Örnek Parametre Çağrısı</span></div>
              <div class="doc-code-content">{
  "namespace": "eshot",
  "endpoint_name": "getYakinDurakList",
  "args": [38.4192, 27.1287]
}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="doc-section">
        <h2>Örnek Yapay Zeka Ajanı Diyalogları</h2>
        
        <div class="doc-card" style="padding: 1.5rem; margin-bottom: 1.25rem;">
          <h3 style="font-size: 1rem; color: var(--brand-aegean); margin-bottom: 0.5rem;">Soru: "Şu an Konak'ta açık olan nöbetçi eczaneler nerede?"</h3>
          <p class="text-secondary" style="font-size: 0.875rem;">
            Ajan otomatik olarak <code>call_endpoint({ namespace: "eczaneler", endpoint_name: "getNobetciList" })</code> metodunu tetikler. Gelen listeden Konak bölgesindeki eczanelerin telefon, harita koordinatları ve tarif bilgilerini özetleyerek kullanıcıya sunar.
          </p>
        </div>

        <div class="doc-card" style="padding: 1.5rem; margin-bottom: 1.25rem;">
          <h3 style="font-size: 1rem; color: var(--brand-aegean); margin-bottom: 0.5rem;">Soru: "İzmir barajlarının güncel doluluk durumu nedir?"</h3>
          <p class="text-secondary" style="font-size: 0.875rem;">
            Ajan <code>call_endpoint({ namespace: "izsu", endpoint_name: "getBarajDolulukOranlari" })</code> aracını çağırır. Tahtalı, Balçova, Gördes ve Ürkmez barajlarının su hacimlerini ve yıllık doluluk oranlarını karşılaştırmalı olarak analiz eder.
          </p>
        </div>
      </div>
    </div>
  </main>
  `;

  const finalHtml = `${getCommonHead(
    "Model Context Protocol (MCP) Sunucusu",
    "İzmir Açık Veri Portalı için Claude Desktop, Cursor ve yerel yapay zeka ajanları uyumlu MCP sunucu dokümantasyonu."
  )}\n${bodyContent}\n${getCommonFooter()}`;

  fs.writeFileSync(path.join(siteDir, "MCP.html"), finalHtml, "utf8");
  console.log("Generated site/MCP.html");
}

// ----------------------------------------------------------------------------
// 4. Build specs/index.html
// ----------------------------------------------------------------------------
function buildSpecsHtml() {
  const specsSiteDir = path.join(siteDir, "specs");
  if (!fs.existsSync(specsSiteDir)) {
    fs.mkdirSync(specsSiteDir, { recursive: true });
  }
  const bodyContent = `
  <main class="doc-page">
    <div class="container" style="max-width: 920px;">
      <nav class="breadcrumb-nav" aria-label="Ekmek kırıntısı">
        <a href="../index.html" class="breadcrumb-link">Ana Sayfa</a>
        <span>/</span>
        <span class="text-secondary">Dokümantasyon</span>
        <span>/</span>
        <span aria-current="page">Resmi Şartnameler (Specs)</span>
      </nav>

      <div class="doc-hero-with-illustration">
        <div class="doc-hero-text">
          <h1 class="doc-title">Resmi API Şartnameleri Arşivi</h1>
          <p class="doc-lead">
            İzmir Büyükşehir Belediyesi Bilgi İşlem Dairesi Başkanlığı ve bağlı iştirakleri (İZBAN, İZSU, İzmir Metro A.Ş.) resmi web servis şartnameleri, veri modelleri ve entegrasyon kuralları.
          </p>
        </div>
        <div class="doc-hero-image-wrap">
          <img src="../assets/illustrations/open_data_mesh.svg" alt="Açık Veri Standartları" class="doc-hero-img" width="220" height="180">
        </div>
      </div>

      <div class="doc-card" style="margin-bottom: 2rem;">
        <div class="doc-table-wrapper">
          <table class="doc-table">
            <thead>
              <tr>
                <th>Kurum / İştirak</th>
                <th>Sürüm</th>
                <th>Kapsam</th>
                <th>Doküman</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>İZBAN A.Ş.</strong></td>
                <td><span class="method-chip">V.1.0</span></td>
                <td>Banliyö istasyonları, sefer saatleri, Gittiğin Kadar Öde tutar hesaplama</td>
                <td><a href="https://github.com/AtaCanYmc/izmir-open-data-js/blob/main/docs/specs/IZBAN.md" class="footer-link" target="_blank" rel="noopener noreferrer">IZBAN.md ↗</a></td>
              </tr>
              <tr>
                <td><strong>İzmir Metro A.Ş.</strong></td>
                <td><span class="method-chip">V.1.0</span></td>
                <td>Metro istasyonları, sefer sıklığı, tramvay hatları (1-8), tramvay durakları</td>
                <td><a href="https://github.com/AtaCanYmc/izmir-open-data-js/blob/main/docs/specs/METRO_TRAMVAY.md" class="footer-link" target="_blank" rel="noopener noreferrer">METRO_TRAMVAY.md ↗</a></td>
              </tr>
              <tr>
                <td><strong>İZSU Genel Müdürlüğü</strong></td>
                <td><span class="method-chip">V.1.0</span></td>
                <td>Su arıza/kesinti, baraj durumları, su üretimi, su analizleri, vezne ve şubeler</td>
                <td><a href="https://github.com/AtaCanYmc/izmir-open-data-js/blob/main/docs/specs/IZSU.md" class="footer-link" target="_blank" rel="noopener noreferrer">IZSU.md ↗</a></td>
              </tr>
              <tr>
                <td><strong>İZBB CBS Şube Müdürlüğü</strong></td>
                <td><span class="method-chip">V.1.1</span></td>
                <td>88 Kentsel katman (POI) ve Noktaya Yakın Otobüs Durakları servisi</td>
                <td><a href="https://github.com/AtaCanYmc/izmir-open-data-js/blob/main/docs/specs/CBS.md" class="footer-link" target="_blank" rel="noopener noreferrer">CBS.md ↗</a></td>
              </tr>
              <tr>
                <td><strong>İZBB Yazılım Şube Müdürlüğü</strong></td>
                <td><span class="method-chip">V.1.0</span></td>
                <td>Turuncu Çember, Hal Fiyatları, Güncel Hava Kalitesi, Eczaneler, Kültür-Sanat</td>
                <td><a href="https://github.com/AtaCanYmc/izmir-open-data-js/blob/main/docs/specs/YAZILIM_SUBE.md" class="footer-link" target="_blank" rel="noopener noreferrer">YAZILIM_SUBE.md ↗</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="doc-section">
        <h2>Ortak Teknik Standartlar</h2>
        <div class="doc-card" style="padding: 1.5rem;">
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.85rem; font-size: 0.9375rem; color: var(--text-secondary);">
            <li><strong>1. İletişim Protokolü:</strong> RESTful HTTP GET.</li>
            <li><strong>2. Yetkilendirme:</strong> Açık Veri Portalı servisleri anonim erişime açıktır.</li>
            <li><strong>3. Veri Formatı:</strong> Tüm uç noktalar <code>application/json</code> veya CSV üretir.</li>
            <li><strong>4. Koordinat Referans Sistemi:</strong> Tüm coğrafi konum verileri (enlem/boylam) WGS84 (<code>EPSG:4326</code>) projeksiyonundadır.</li>
            <li><strong>5. Kentsel POI Şeması:</strong> CBS katmanları standart <code>DefaultOnemliYer</code> şemasına (<code>ADI, ILCE, MAHALLE, YOL, KAPINO, ENLEM, BOYLAM</code>) uyar.</li>
          </ul>
        </div>
      </div>
    </div>
  </main>
  `;

  const finalHtml = `${getCommonHead(
    "Resmi Şartnameler (Specs)",
    "İzmir Büyükşehir Belediyesi resmi web servis kullanım şartnameleri arşivi.",
    "../"
  )}\n${bodyContent}\n${getCommonFooter("../")}`;

  fs.writeFileSync(path.join(specsSiteDir, "index.html"), finalHtml, "utf8");
  console.log("Generated site/specs/index.html");
}

buildEndpointsHtml();
buildCliHtml();
buildMcpHtml();
buildSpecsHtml();
