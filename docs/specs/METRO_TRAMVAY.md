# Metro ve Tramvay Web Servis Teknik Şartnamesi (V1.0)

İzmir Metro A.Ş. tarafından işletilen hafif raylı metro ve tramvay hatlarına ait resmi API servislerinin teknik dokümantasyonudur.

- **Kaynak Belge:** `metro-tramvay-WebServisKullanimDokumani_1.0.pdf`
- **Sürüm:** V.1.0
- **Base URLs:**
  - Metro: `https://openapi.izmir.bel.tr/api/metro`
  - Tramvay: `https://openapi.izmir.bel.tr/api/tramvay`
- **Yetkilendirme:** Anonim (Header/Token gerektirmez)
- **Veri Formatı:** JSON

---

## 1. Genel Kurallar ve Tarife Kodları

Metro ve Tramvay servislerinde kullanılan `TarifeId` parametresi haftanın günlerine göre sefer aralıklarını belirler:

| TarifeId | Geçerlilik Günü | Açıklama |
| --- | --- | --- |
| `1` | Hafta İçi | Pazartesi - Cuma günleri geçerli sefer planı |
| `2` | Cumartesi | Cumartesi günleri uygulanan sefer planı |
| `3` | Pazar | Pazar ve resmi tatillerde uygulanan sefer planı |

---

## 2. İzmir Metrosu Web Servisleri

### 2.1. İstasyon Listesi
İzmir Metrosu'na ait hat üzerindeki tüm istasyonların konum ve durum bilgilerini listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/metro/istasyonlar`
- **Parametreler:** Parametre almamaktadır.

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `IstasyonId` | `number` | İstasyon benzersiz kimlik numarası |
| `Adi` | `string` | İstasyon adı |
| `Sira` | `number` | Hat üzerindeki durak sırası |
| `Enlem` | `number` | Coğrafi enlem (WGS84) |
| `Boylam` | `number` | Coğrafi boylam (WGS84) |
| `AktifMi` | `boolean` | İstasyonun hizmete açık olup olmadığı durumu |

---

### 2.2. Sefer Saatleri ve Sefer Sıklığı
Metro seferlerinin gün içindeki saat dilimlerine göre hareket aralıklarını (dakika bazında sefer sıklığı) verir.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/metro/sefersaatleri`
- **Parametreler:** Parametre almamaktadır.

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `SeferId` | `number` | Benzersiz sefer kaydı numarası |
| `Aralik` | `number` | Tren sefer aralığı (dakika cinsinden, örn: 3.5 dk) |
| `BaslangicSaati` | `string` (`HH:mm:ss`) | İlgili sefer sıklığı aralığının başlangıç saati |
| `BitisSaati` | `string` (`HH:mm:ss`) | İlgili sefer sıklığı aralığının bitiş saati |
| `Sira` | `number` | Zaman dilimi sırası |
| `TarifeId` | `number` | Tarife türü (`1`: Hafta içi, `2`: Cumartesi, `3`: Pazar) |

---

## 3. İzmir Tramvayı Web Servisleri

### 3.1. Tramvay Hat Listesi
Hizmetteki tramvay hatlarının (Konak, Karşıyaka, Çiğli vb.) başlangıç ve bitiş tanımlarını listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/tramvay/hatlar`
- **Parametreler:** Parametre almamaktadır.

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `HatId` | `number` | Hat numarası (Örn: 1, 2, 3...) |
| `Adi` | `string` | Tramvay hattı adı (Örn: "Karşıyaka Tramvayı") |
| `HatBaslangic` | `string` | Başlangıç istasyonu adı |
| `HatBitis` | `string` | Bitiş istasyonu adı |
| `Aciklama` | `string` | Hat ile ilgili açıklayıcı bilgi |

---

### 3.2. Tramvay İstasyon Listesi
Belirtilen hat numarasına ait istasyonların konum ve sıralama bilgilerini listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/tramvay/istasyonlar/{hatId}`
- **Parametre:** `hatId` (`number`): İstasyonların listeleneceği hat ID'si.

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `IstasyonId` | `number` | İstasyon benzersiz kimlik numarası |
| `Adi` | `string` | İstasyon adı |
| `Enlem` | `number` | İstasyon coğrafi enlemi |
| `Boylam` | `number` | İstasyon coğrafi boylamı |

---

### 3.3. Tramvay Genel Sefer Listesi
Tüm hatlar için varsayılan sefer saat aralıklarını listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/tramvay/sefer`
- **Parametreler:** Parametre almamaktadır.

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `BaslangicSaati` | `string` (`HH:mm:ss`) | Sefer aralığının başlangıç zamanı |
| `BitisSaati` | `string` (`HH:mm:ss`) | Sefer aralığının bitiş zamanı |
| `Aralik` | `number` | Sefer sıklığı aralığı (dakika) |

---

### 3.4. Hat ID'ye Göre Tramvay Sefer Listesi
Belirli bir hatta ait saat dilimlerine göre kalkış aralıklarını listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/tramvay/seferler/{hatId}`
- **Parametre:** `hatId` (`number`): Sefer saatleri sorgulanacak tramvay hat ID'si.

#### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `SeferId` | `number` | Sefer benzersiz kimlik numarası |
| `TarifeId` | `number` | Tarife türü (`1`: Hafta içi, `2`: Cumartesi, `3`: Pazar) |
| `BaslangicSaati` | `string` (`HH:mm:ss`) | Zaman aralığı başlangıç saati |
| `BitisSaati` | `string` (`HH:mm:ss`) | Zaman aralığı bitiş saati |
| `Sira` | `number` | Sefer planı sırası |
| `Aralik` | `number` | Tren kalkış aralığı (dakika) |

---

## 4. HTTP Durum Kodları

| Durum Kodu | Açıklama |
| --- | --- |
| `200` | Başarılı işlem |
| `204` | İçerik yok |
| `401` | Yetkisiz erişim |
| `404` | Belirtilen hat veya istasyon bulunamadı |
| `500` | Sunucu hatası |
