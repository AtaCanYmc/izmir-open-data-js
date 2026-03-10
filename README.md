# izmir-open-data-js 🌊

İzmir Büyükşehir Belediyesi **Açık Veri Portalı** (acikveri.bizizmir.com) API'lerini JavaScript ve TypeScript projelerinizde kolayca kullanmanızı sağlayan hafif ve modern bir kütüphanedir.

[![CI](https://github.com/atacan/izmir-open-data-js/actions/workflows/ci.yml/badge.svg)](https://github.com/atacan/izmir-open-data-js/actions/workflows/ci.yml)
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
import { IzmirAPI } from 'izmir-open-data-js';

const api = new IzmirAPI();

async function verileriGetir() {
  try {
    // Güncel nöbetçi eczane listesini çeker
    const eczaneler = await api.eczaneler.getNobetciList();
    console.log("Nöbetçi Eczaneler:", eczaneler);
  } catch (err) {
    console.error("Veri çekme hatası:", err.message);
  }
}

verileriGetir();
```

---

## 📋 Tüm Endpoint'ler

### 🏥 Eczaneler (`api.eczaneler`)

| Metot | Açıklama |
| :--- | :--- |
| `getNobetciList()` | Nöbetçi eczanelerin listesini döner |
| `getList()` | Tüm eczanelerin listesini döner |

### 👨‍⚕️ Sağlık (`api.saglik`)

| Metot | Açıklama |
| :--- | :--- |
| `getAcilYardimIstasyonlariList()` | Acil yardım istasyonlarını listeler |
| `getAileSagligiMerkezleriList()` | Aile sağlığı merkezlerini listeler |
| `getAgizDisSagligiMerkezleriList()` | Ağız ve diş sağlığı merkezlerini listeler |
| `getAnaCocukSagligiMerkezleriList()` | Ana çocuk sağlığı merkezlerini listeler |
| `getDalMerkezleriList()` | Dal merkezlerini listeler |
| `getHastanelerList()` | Hastaneleri listeler |
| `getKanMerkezleriList()` | Kan merkezlerini listeler |
| `getLaboratuvarlarList()` | Laboratuvarları listeler |
| `getPolikliniklerList()` | Poliklinikleri listeler |
| `getTipMerkezleriList()` | Tıp merkezlerini listeler |
| `getToplumSagligiMerkezleriList()` | Toplum sağlığı merkezlerini listeler |
| `getVeremSavasDispanserleriList()` | Verem savaş dispanserlerini listeler |
| `getVeterinerliklerList()` | Veterinerlikleri listeler |

### 💧 İZSU (`api.izsu`)

| Metot | Açıklama |
| :--- | :--- |
| `getSuUretimiDagilimi()` | Su üretiminin aylara ve kaynaklara göre dağılımını döner |
| `getGunlukSuUretimi()` | Günlük su üretimi miktarlarını döner |
| `getBarajDolulukOranlari()` | Barajların doluluk oranlarını döner |
| `getHaftalikSuAnalizi()` | Haftalık su analiz sonuçlarını döner |
| `getBarajSuKaliteRaporlari()` | Baraj su kalite raporlarını döner |
| `getArizaKaynakliKesintiList()` | Arıza kaynaklı su kesintilerini listeler |
| `getBarajVeKuyuList()` | Baraj ve kuyuları listeler |
| `getIzsuSubeList()` | İZSU şubelerini listeler |
| `getIzsuVezneList()` | İZSU veznelerini listeler |

### 🚌 Ulaşım - ESHOT (`api.eshot`)

| Metot | Açıklama |
| :--- | :--- |
| `getYakinDurakList(enlem, boylam)` | Belirtilen konuma yakın ESHOT duraklarını listeler |
| `getDuragaYaklasanOtobusList(durakId)` | Bir durağa yaklaşan otobüsleri listeler |
| `getHattinYaklasanOtobusleri(hatId, durakId)` | Bir hattın durağa yaklaşan otobüslerini listeler |
| `getHatOtobusKonumlari(hatId)` | Hatta ait otobüslerin anlık konum bilgilerini döner |

### 🚲 Ulaşım - BİSİM (`api.bisim`)

| Metot | Açıklama |
| :--- | :--- |
| `getIstasyonList()` | BİSİM istasyonlarını listeler |

### 🚃 Ulaşım - Tramvay (`api.tramvay`)

| Metot | Açıklama |
| :--- | :--- |
| `getHatList()` | Tramvay hatlarını listeler |
| `getSeferList()` | Tüm tramvay sefer bilgilerini listeler |
| `getIstasyonList(seferId)` | Sefer numarasına göre tramvay istasyonlarını listeler |
| `getSeferSiklikList(seferId)` | Sefer numarasına göre sefer sıklıklarını döner |

### 🚇 Ulaşım - Metro (`api.metro`)

| Metot | Açıklama |
| :--- | :--- |
| `getIstasyonList()` | Metro istasyonlarını listeler |

### 🚆 Ulaşım - İZBAN (`api.izban`)

| Metot | Açıklama |
| :--- | :--- |
| `getTarife(binisId, inisId, aktarma, httMi)` | İZBAN fiyat tarifesini hesaplar |
| `getIstasyonList()` | İZBAN istasyonlarını listeler |
| `getHareketSaatleri(kalkisId, varisId)` | İZBAN hareket saatlerini döner |

### ⛴️ Ulaşım - Vapur (`api.vapur`)

| Metot | Açıklama |
| :--- | :--- |
| `getHareketSaatleri(kalkis, varis, gunTipi, detay)` | Vapur hareket saatlerini döner |
| `getCalismaGunleri()` | Vapurların çalışma günlerini döner |
| `getHareketSaatleriByHat(iskeleId, gunId)` | İskele bazlı hareket saatlerini döner |
| `getIskeleList()` | Vapur iskelelerini listeler |

### 🚃 Ulaşım - Tren & Diğer (`api.tren`)

| Metot | Açıklama |
| :--- | :--- |
| `getTrenGarlariList()` | Tren garlarını listeler |
| `getHavaalaniList()` | Havaalanlarını listeler |
| `getOtobusTerminalleriList()` | Şehirlerarası otobüs terminallerini listeler |
| `getAracMuayeneIstasyonlariList()` | Araç muayene istasyonlarını listeler |

### 🅿️ Otopark (`api.otopark`)

| Metot | Açıklama |
| :--- | :--- |
| `getList()` | Otoparkların doluluk ve konum bilgilerini döner |

### 🚕 Taksi (`api.taksi`)

| Metot | Açıklama |
| :--- | :--- |
| `getDurakList()` | Taksi duraklarını listeler |

### 🎭 Etkinlikler (`api.etkinlikler`)

| Metot | Açıklama |
| :--- | :--- |
| `getList()` | Kültür sanat etkinliklerini listeler |
| `getEtkinlikById(id)` | Belirli bir etkinliğin detaylarını döner |

### 🌡️ İklim (`api.iklim`)

| Metot | Açıklama |
| :--- | :--- |
| `getGunlukHavaKalitesiOlcumleri(tarih)` | Belirtilen tarihe göre hava kalitesi ölçümlerini döner |

### 🛒 Pazarlar (`api.pazarlar`)

| Metot | Açıklama |
| :--- | :--- |
| `getList()` | Semt pazar yerlerini listeler |
| `getBalikHalFiyatlari(tarih)` | Balık hal fiyatlarını döner |
| `getSebzeMeyveHalFiyatlari(tarih)` | Sebze meyve hal fiyatlarını döner |

### 🏛️ Muhtarlıklar (`api.muhtarliklar`)

| Metot | Açıklama |
| :--- | :--- |
| `getList()` | Muhtarlıkları listeler |

### 📶 WiFi (`api.wizmirnet`)

| Metot | Açıklama |
| :--- | :--- |
| `getList()` | Ücretsiz kablosuz internet noktalarını listeler |

### ⚠️ Afetler (`api.afetler`)

| Metot | Açıklama |
| :--- | :--- |
| `getAcilDurumToplanmaAlanlari()` | Afet ve acil durum toplanma alanlarını listeler |

### 🏢 Hizmet Noktaları (`api.hizmet`)

| Metot | Açıklama |
| :--- | :--- |
| `getHizmetNoktaList()` | İzBB hizmet noktalarını listeler |

### 📚 Eğitim (`api.egitim`)

| Metot | Açıklama |
| :--- | :--- |
| `getEngelliOkullariList()` | Engelliler okullarını listeler |
| `getAnaokullarList()` | Anaokullarını listeler |
| `getEtutMerkezleriList()` | Etüt merkezlerini listeler |
| `getHalkEgitimList()` | Halk eğitim merkezlerini listeler |
| `getIlkokullarList()` | İlkokulları listeler |
| `getKolejlerList()` | Kolejleri listeler |
| `getLiselerList()` | Liseleri listeler |
| `getMeslekLiseleriList()` | Meslek liselerini listeler |
| `getOrtaokullarList()` | Ortaokulları listeler |
| `getSanatOkullariList()` | Sanat okullarını listeler |
| `getUniversitelerList()` | Üniversiteleri listeler |
| `getMilliEgitimList()` | Milli eğitim müdürlüklerini listeler |

### 📖 Kütüphane & Kültür (`api.kutuphane`)

| Metot | Açıklama |
| :--- | :--- |
| `getKutuphanelerList()` | Kütüphaneleri listeler |
| `getKulturMerkezleriList()` | Kültür merkezlerini listeler |
| `getOperaVeBaleList()` | Opera ve bale mekanlarını listeler |
| `getGaleriVeSalonlarList()` | Sanat galerisi ve sergi salonlarını listeler |
| `getSenfoniOrkestrasiList()` | Senfoni orkestrası mekanlarını listeler |
| `getSinemalarList()` | Sinemaları listeler |
| `getTiyatrolarList()` | Tiyatroları listeler |
| `getMuzelerList()` | Müzeleri listeler |

### 🏛️ Tarihi Yerler (`api.tarihi`)

| Metot | Açıklama |
| :--- | :--- |
| `getAntikKentlerList()` | Antik kentleri listeler |
| `getAntikKentYapilariList()` | Antik kent yapılarını listeler |
| `getKoskVeKonaklarList()` | Köşk ve konakları listeler |
| `getKuleAnitHeykellerList()` | Kule, anıt ve heykelleri listeler |
| `getTarihiCarsiHanlarList()` | Tarihi çarşı ve hanları listeler |
| `getTarihiSuYapilariList()` | Tarihi su yapılarını listeler |
| `getTarihiYapilarList()` | Tarihi yapıları listeler |

### 🏖️ Plaj & Turizm (`api.plaj`)

| Metot | Açıklama |
| :--- | :--- |
| `getPlajlarList()` | Plajları listeler |
| `getHamamlarList()` | Hamamları listeler |
| `getKaplicalarList()` | Kaplıcaları listeler |
| `getFuarList()` | Fuar alanlarını listeler |

### 🏛️ Kamu Kurumları (`api.kamu`)

| Metot | Açıklama |
| :--- | :--- |
| `getBankalarList()` | Bankaları listeler |
| `getBelediyelerList()` | Belediye ve birimleri listeler |
| `getBolgeMudurlukleriList()` | Bölge müdürlüklerini listeler |
| `getDefterdarliklarList()` | Defterdarlıkları listeler |
| `getDerneklerList()` | Dernekleri listeler |
| `getEvlendirmeDaireleriList()` | Evlendirme dairelerini listeler |
| `getIlIlceMudurlukleriList()` | İl ve ilçe müdürlüklerini listeler |
| `getItfaiyeGruplariList()` | İtfaiye gruplarını listeler |
| `getKonsolosluklarList()` | Konsoloslukları listeler |
| `getMeslekOdalariList()` | Meslek odalarını listeler |
| `getNoterlerList()` | Noterleri listeler |
| `getNufusMudurlukleriList()` | Nüfus müdürlüklerini listeler |
| `getPttList()` | PTT şubelerini listeler |
| `getTurizmDanismaList()` | Turizm danışma merkezlerini listeler |
| `getVergiDaireleriList()` | Vergi dairelerini listeler |
| `getMaskematikNoktalariList()` | Maskematik istasyonlarını listeler |

### 👨‍👩‍👧‍👦 Sosyal Hizmetler (`api.sosyal`)

| Metot | Açıklama |
| :--- | :--- |
| `getAileDayanismaMerkezleriList()` | Aile dayanışma merkezlerini listeler |
| `getCocukGenclikMerkezleriList()` | Çocuk ve gençlik merkezlerini listeler |
| `getCocukYuvalariList()` | Çocuk yuvalarını listeler |
| `getHuzurevleriList()` | Huzurevlerini listeler |
| `getToplumMerkezleriList()` | Toplum merkezlerini listeler |
| `getYetistirmeYurtlariList()` | Yetiştirme yurtlarını listeler |

### ⚽ Spor (`api.spor`) _(Deneysel)_

| Metot | Açıklama |
| :--- | :--- |
| `getHipodromList()` | Hipodromları listeler |
| `getSporSalonlariList()` | Spor salonlarını listeler |
| `getStadyumlarList()` | Stadyumları listeler |

> ⚠️ **Not:** Spor endpoint'leri API'de henüz tam aktif olmayabilir.

### 🗺️ Coğrafi Özellikler (`api.cografi`)

| Metot | Açıklama |
| :--- | :--- |
| `getAdaYarimadaList()` | Ada ve yarımadaları listeler |
| `getBurunlarList()` | Burunları listeler |
| `getDagTepeList()` | Dağ ve tepeleri listeler |
| `getGollerList()` | Gölleri listeler |
| `getKorfezKoylarList()` | Körfez ve koyları listeler |
| `getNehirCaylarList()` | Nehir ve çayları listeler |
| `getOrmanlarList()` | Ormanları listeler |
| `getMeydanlarList()` | Meydanları listeler |

### 🎫 İztek - İzmirim Kart (`api.iztek`)

| Metot | Açıklama |
| :--- | :--- |
| `getAskidaIzmirimKartIstatistik()` | Askıda İzmirim Kart istatistiklerini döner |

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

## 🧪 Test

```bash
# Unit testleri çalıştır
npm test

# Watch modunda testler
npm run test:watch

# Coverage raporuyla testler
npm run test:coverage

# Canlı API testleri (opsiyonel)
npm run test:live
```

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.

---

> [!NOTE]  
> Bu paket, geliştiricilerin İzmir'in açık verilerini projelerine daha hızlı entegre etmesi için hazırlanmış bir topluluk projesidir. Resmi kurumlarla doğrudan bir bağı yoktur.