# izmir-open-data-js 🌊

İzmir Büyükşehir Belediyesi **Açık Veri Portalı** (acikveri.bizizmir.com) API'lerini JavaScript ve TypeScript projelerinizde kolayca kullanmanızı sağlayan hafif ve modern bir kütüphanedir.

[![npm version](https://img.shields.io/npm/v/izmir-open-data-js.svg)](https://www.npmjs.com/package/izmir-open-data-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Özellikler

* 🚀 **Hızlı Başlangıç:** Karmaşık API uç noktalarıyla uğraşmadan veriye ulaşın.
* 📊 **Geniş Veri Yelpazesi:** Eczanelerden ulaşım ağlarına kadar birçok veriye erişim.
* 🔄 **Modern Yapı:** `async/await` desteği ile temiz ve okunabilir kod.
* 🏗️ **Esnek:** Hem Node.js hem de modern tarayıcı ortamlarında kullanılabilir.

---

## 🚀 Kurulum

Projeye dahil etmek için npm veya yarn kullanabilirsiniz:

```bash
npm install izmir-open-data-js
# veya
yarn add izmir-open-data-js
```

## 🛠️ Kullanım

Kütüphaneyi projenize dahil ettikten sonra `async/await` yapısını kullanarak verilere hızlıca erişebilirsiniz.

### Örnek: Nöbetçi Eczaneleri Listeleme

```javascript
const izmir = require('izmir-open-data-js');

async function verileriGetir() {
  try {
    // Güncel nöbetçi eczane listesini çeker
    const eczaneler = await izmir.getNobetciEczaneler();
    console.log("Nöbetçi Eczaneler:", eczaneler);
  } catch (err) {
    console.error("Veri çekme hatası:", err.message);
  }
}

verileriGetir();
```

### 📋 Desteklenen Metotlar

Aşağıdaki örnek fonksiyonlar ve paketteki nicesi aracılığıyla İzmir Büyükşehir Belediyesi'nin sunduğu veri setlerine kolayca erişebilirsiniz:

| Metot | Açıklama | Dönüş Formatı |
| :--- | :--- | :--- |
| `getNobetciEczaneler()` | Şehirdeki güncel nöbetçi eczaneleri listeler. | `Promise<Array>` |
| `getHastaneler()` | Tüm hastanelerin konum ve iletişim bilgilerini döner. | `Promise<Array>` |
| `getDisHastaneleri()` | Diş hastaneleri ve merkezlerini listeler. | `Promise<Array>` |
| `getBisimIstasyonlari()` | BİSİM istasyonlarındaki bisiklet ve boş park yerlerini gösterir. | `Promise<Array>` |
| `getOtoparklar()` | İzmir genelindeki otoparkların kapasite ve konum bilgilerini getirir. | `Promise<Array>` |

---

## 📖 API Kaynağı

Bu kütüphane, verileri [İzmir Büyükşehir Belediyesi Açık Veri Portalı](https://acikveri.bizizmir.com/) üzerinden çekmektedir. Veri yapılarındaki herhangi bir değişiklik veya kesinti portal kaynaklı olabilir.

---

## 🤝 Katkıda Bulunma

İzmir için geliştirilen bu projeye katkı sağlamak harika olur! Yeni bir özellik eklemek veya bir hatayı düzeltmek için:

1. Bu depoyu (repository) **fork** edin.
2. Yeni bir dal (branch) oluşturun: `git checkout -b feature/yeniOzellik`
3. Değişikliklerinizi yapın ve **commit** edin: `git commit -m 'Ekle: Yeni API uç noktası'`
4. Dalınızı **push** edin: `git push origin feature/yeniOzellik`
5. Bir **Pull Request** açın.

---

## 📄 Lisans

Bu proje **MIT** lisansı ile lisanslanmıştır. Daha fazla bilgi için `LICENSE` dosyasına göz atabilirsiniz.

---

> [!NOTE]  
> Bu paket, geliştiricilerin İzmir'in açık verilerini projelerine daha hızlı entegre etmesi için hazırlanmış bir topluluk projesidir. Resmi kurumlarla doğrudan bir bağı yoktur.