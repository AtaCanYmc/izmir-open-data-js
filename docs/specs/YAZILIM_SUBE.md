# Yazılım Şube Müdürlüğü Web Servis Teknik Şartnamesi (V1.0)

İzmir Büyükşehir Belediyesi Bilgi İşlem Dairesi Başkanlığı Yazılım Şube Müdürlüğü tarafından yayımlanan resmi API servislerinin teknik dokümantasyonu, parametre modelleri ve entegrasyon kurallarıdır.

- **Kaynak Belge:** `YazilimSube-WebServisKullanimDokumani_1.0.pdf`
- **Sürüm:** V.1.0
- **Base URL:** `https://openapi.izmir.bel.tr/api/ibb`
- **Yetkilendirme:** Anonim (Header/Token gerektirmez)
- **Veri Formatı:** JSON

---

## 1. Genel Kurallar ve Standartlar

1. **Tarih Formatları:**
   - Kısa Tarih Formatı: `yyyy-MM-dd` (Örn: `2026-11-20`)
   - Uzun Tarih Formatı: `yyyy-MM-dd HH:mm:ss`
2. **Dil Parametresi (`DilId`):**
   - Türkçe: `1`
   - İngilizce: `2`
3. **Koordinat Eksenleri:**
   - `KoordinatX` / `LokasyonX`: Enlem (Latitude)
   - `KoordinatY` / `LokasyonY`: Boylam (Longitude)

---

## 2. Turuncu Çember Servisleri

Turuncu Çember, İzmir Büyükşehir Belediyesi tarafından hijyen, gıda güvenliği ve sağlık kriterlerini sağlayan işletmelere verilen sertifikasyon sistemidir.

### 2.1. Turuncu Çember Sertifikalı İşletmeler
Aktif olarak Turuncu Çember sertifikasına sahip tüm işletmelerin listesini ve konumlarını döndürür.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/turuncucember/isletmeler`
- **Parametreler:** Parametre almamaktadır.

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `Id` | `number` (Int) | İşletme benzersiz kimlik numarası |
| `TicariUnvan` | `string` | İşletmenin resmi ticari unvanı |
| `TabelaAdi` | `string` | İşletmenin marka veya tabela adı |
| `FaaliyetAlani` | `string` | Firmanın faaliyet sektörü/alanı |
| `FaaliyetId` | `number` (Int) | Faaliyet alanı kimlik kodu |
| `LokasyonX` | `string` | Enlem koordinatı (WGS84) |
| `LokasyonY` | `string` | Boylam koordinatı (WGS84) |
| `EklenmeTarihi` | `string` (DateTime) | Turuncu Çember sertifikasının verildiği tarih |

---

### 2.2. Turuncu Çember İşletme Detay Bilgisi
Belirli bir işletmenin detaylı sertifika bilgilerini sorgular.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/turuncucember/isletme/{Id}`
- **Parametre:** `Id` (`number`, Zorunlu): İşletme ID numarası.

---

### 2.3. Turuncu Çember Başvuru ve Dağılım İstatistikleri
Sertifika başvuru süreçlerine dair toplam ve güncel sayısal istatistikleri listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/turuncucember/sayilar`
- **Parametreler:** Parametre almamaktadır.

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `BasvuruSayisi` | `number` | Toplam başvuru sayısı |
| `IslemdeBekleyen` | `number` | Değerlendirme sürecindeki işletme sayısı |
| `KabulEdilen` | `number` | Turuncu Çember almaya hak kazanan işletme sayısı |
| `Reddedilen` | `number` | Şartları sağlamadığı için reddedilen işletme sayısı |

---

## 3. Hal Fiyatları Web Servisleri

İzmir Büyükşehir Belediyesi Toptancı Halleri günlük ürün fiyat bültenleridir.

### 3.1. Sebze ve Meyve Hal Fiyatları
Belirtilen güne ait sebze ve meyve asgari/azami toptan satış fiyatlarını listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/halfiyatlari/sebzemeyve/{yyyy-MM-dd}`
- **Parametre:** `tarih` (`string` / `Date`, Zorunlu): Fiyat bülteni istenen tarih.

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `MalAdi` | `string` | Ürün adı (Domates, Biber vb.) |
| `MalTipAdi` | `string` | Ürün çeşidi veya cinsi |
| `HalTuru` | `string` | Hal tür kodu (`1`: Sebze Meyve) |
| `Birim` | `string` | Satış birimi (kg, adet, kasa vb.) |
| `AsgariUcret` | `number` (Decimal) | Asgari toptan satış fiyatı (TL) |
| `AzamiUcret` | `number` (Decimal) | Azami toptan satış fiyatı (TL) |

---

### 3.2. Balık Hal Fiyatları
Belirtilen güne ait su ürünleri toptancı hali fiyat bültenini listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/halfiyatlari/balik/{yyyy-MM-dd}`
- **Parametre:** `tarih` (`string` / `Date`, Zorunlu): Fiyat bülteni istenen tarih.
- **Alanlar:** `MalAdi`, `MalTipAdi`, `HalTuru` (`2`: Balık), `Birim`, `AsgariUcret`, `AzamiUcret`.

---

## 4. Hava Kalitesi Ölçüm Değerleri Servisleri

İzmir kentsel hava kalitesi izleme istasyonlarının anlık ve geçmiş gaz ölçüm konsantrasyonlarıdır.

### 4.1. Günün Hava Kalite Ölçüm Değerleri (Anlık)
En son alınan güncel hava kalitesi ölçüm değerlerini bölge ve gaz bazında listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/cevre/havadegerleri`
- **Parametreler:** Parametre almamaktadır.

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `BolgeId` | `number` (Int) | Ölçüm istasyonu bölge numarası |
| `BolgeAdi` | `string` | İstasyon/bölge adı (Çiğli, Karşıyaka, Alsancak vb.) |
| `GazId` | `number` (Int) | Ölçülen kirletici gaz kimliği |
| `GazAdi` | `string` | Gaz türü (PM10, SO2, NO2, O3, CO vb.) |
| `OlcumDegeri` | `string` | Ölçülen konsantrasyon değeri |
| `OlcumTarihi` | `string` (DateTime) | Ölçümün yapıldığı zaman damgası |

---

### 4.2. Tarihe Göre Hava Kalite Ölçüm Değerleri (Geçmiş)
Belirtilen güne ait geçmiş hava kalitesi kayıtlarını döndürür.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/cevre/havadegerleri/{yyyy-MM-dd}`
- **Parametre:** `tarih` (`string` / `Date`, Zorunlu): İstenen tarih.

---

## 5. Eczane ve Nöbetçi Eczaneler Servisleri

### 5.1. Günün Nöbetçi Eczaneleri
Günün nöbetçi eczanelerini, telefon, açık adres, nöbet bölgesi ve koordinatlarıyla listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/nobetcieczaneler`
- **Parametreler:** Parametre almamaktadır.

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `EczaneId` | `number` | Eczane benzersiz numarası |
| `Adi` | `string` | Eczane adı |
| `Adres` | `string` | Açık adres bilgisi |
| `IlceId` | `number` | İlçe ID numarası |
| `Bolge` | `string` | Nöbet bölgesi adı |
| `BolgeId` | `number` | Nöbet bölge numarası |
| `Telefon` | `string` | Eczane iletişim telefonu |
| `LokasyonX` | `string` | Enlem koordinatı (WGS84) |
| `LokasyonY` | `string` | Boylam koordinatı (WGS84) |
| `Tarih` | `string` (DateTime) | Nöbet tarihi |
| `BolgeAciklama` | `string` | Nöbet bölgesi detay açıklaması |
| `UzaklikMetre` | `number` | İsteğe bağlı sorgu noktasına mesafe |

---

### 5.2. Tüm Eczane Bilgileri
İzmir ilinde kayıtlı tüm eczanelerin adres ve konum envanterini listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/eczaneler`

---

## 6. Kültür Sanat Etkinlikleri Servisleri

### 6.1. Güncel Etkinlik Listesi
İzmir Büyükşehir Belediyesi kültür-sanat etkinlik takvimini listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/kultursanat/etkinlikler`

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `Id` | `number` | Benzersiz etkinlik numarası |
| `Adi` | `string` | Etkinlik başlığı |
| `Tur` | `string` | Etkinlik türü (Tiyatro, Konser, Sergi, Söyleşi vb.) |
| `KucukAfis` | `string` | Küçük afiş görsel URL'si |
| `Resim` | `string` | Ana etkinlik görsel URL'si |
| `KisaAciklama` | `string` | Etkinlik özeti |
| `EtkinlikUrl` | `string` | Detaylı web sayfası linki |
| `EtkinlikBaslamaTarihi` | `string` (DateTime) | Başlama tarih ve saati |
| `EtkinlikBitisTarihi` | `string` (DateTime) | Bitiş tarih ve saati |
| `EtkinlikMerkezi` | `string` | Etkinliğin gerçekleşeceği salon/mekan |
| `BiletSatisLinki` | `string` | Bilet satış veya rezervasyon linki |
| `UcretsizMi` | `boolean` | Ücretsiz katılım durumu |

---

### 6.2. Etkinlik Detay Bilgisi
Etkinlik numarasına (`id`) göre tam açıklama, büyük fotoğraf ve tür ID bilgilerini içeren detay görünümüdür.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/kultursanat/etkinlik/{id}`
- **Ek Alanlar:** `BuyukFoto`, `TurId`, `SeansListesi`.

---

## 7. HTTP Durum Kodları

| Durum Kodu | Anlamı |
| --- | --- |
| `200` | Başarılı işlem |
| `204` | İçerik yok |
| `401` | Yetkisiz erişim |
| `404` | Kaynak veya kayıt bulunamadı |
| `500` | Sunucu hatası |
