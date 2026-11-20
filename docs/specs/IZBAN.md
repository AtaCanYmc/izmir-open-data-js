# İZBAN Web Servis Teknik Şartnamesi (V1.0)

İzmir Banliyö Taşımacılığı Sistemi Ticaret A.Ş. (İZBAN) tarafından sağlanan resmi API servislerinin teknik dokümantasyonudur.

- **Kaynak Belge:** `izban-WebServisKullanimDokumani_1.0.pdf`
- **Sürüm:** V.1.0
- **Base URL:** `https://openapi.izmir.bel.tr/api/izban`
- **Yetkilendirme:** Anonim (Header/Token gerektirmez)
- **Veri Formatı:** JSON

---

## 1. İstasyonlar Web Servisi

İzmir Banliyö sistemindeki tüm aktif istasyonların konum (enlem/boylam) ve güzergah sıralama bilgilerini döndürür.

### İstek (Request)
- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izban/istasyonlar`
- **Parametreler:** Parametre almamaktadır.

### Yanıt Modeli (Response)
Dizi olarak `IzbanIstasyon` nesneleri döner:

| Alan | Tip | Açıklama |
| --- | --- | --- |
| `IstasyonId` | `number` (Int) | İstasyon benzersiz kimlik numarası |
| `IstasyonAdi` | `string` | İstasyon resmi adı |
| `IstasyonSirasi` | `number` (Int) | Güzergah yönüne göre trenin uğradığı istasyon sırası |
| `Boylam` | `number` (Float) | İstasyonun coğrafi boylamı (WGS84) |
| `Enlem` | `number` (Float) | İstasyonun coğrafi enlemi (WGS84) |

### Örnek Yanıt
```json
[
  {
    "IstasyonId": 1,
    "IstasyonAdi": "ALİAĞA",
    "IstasyonSirasi": 1,
    "Boylam": 26.974955,
    "Enlem": 38.799797
  },
  {
    "IstasyonId": 2,
    "IstasyonAdi": "BİÇEROVA",
    "IstasyonSirasi": 2,
    "Boylam": 27.025623,
    "Enlem": 38.758461
  }
]
```

---

## 2. Sefer Saatleri Web Servisi

Kalkış ve varış istasyon kimlik numaralarına göre planlanan tren hareket ve varış saatlerini listeler.

### İstek (Request)
- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izban/sefersaatleri/{kalkisIstasyonId}/{varisIstasyonId}`

### Parametreler
| Parametre | Tip | Durum | Açıklama |
| --- | --- | --- | --- |
| `kalkisIstasyonId` | `number` | Zorunlu | Biniş yapılacak kalkış istasyon ID'si (Örn: `1`) |
| `varisIstasyonId` | `number` | Zorunlu | İniş yapılacak varış istasyon ID'si (Örn: `15`) |

### Yanıt Modeli (Response)
Dizi olarak `IzbanSeferSaati` nesneleri döner:

| Alan | Tip | Açıklama |
| --- | --- | --- |
| `HareketIstasyonId` | `number` | Kalkış istasyon ID'si |
| `HareketIstasyonAdi` | `string` | Kalkış istasyon adı |
| `VarisIstasyonId` | `number` | Varış istasyon ID'si |
| `VarisIstasyonAdi` | `string` | Varış istasyon adı |
| `HareketSaati` | `string` (Time / `HH:mm:ss`) | Tren kalkış saati |
| `VarisSaati` | `string` (Time / `HH:mm:ss`) | Tren tahmini varış saati |

### Örnek Yanıt
```json
[
  {
    "HareketIstasyonId": 1,
    "HareketIstasyonAdi": "ALİAĞA",
    "VarisIstasyonId": 15,
    "VarisIstasyonAdi": "HALKAPINAR",
    "HareketSaati": "05:40:00",
    "VarisSaati": "06:45:00"
  }
]
```

---

## 3. Tutar Hesaplama ("Gittiğin Kadar Öde") Web Servisi

İZBAN "Gittiğin Kadar Öde" (Plus Para / İade) sisteminde biniş ve iniş istasyonları, aktarma durumu ve Halk Taşıt saatlerine göre ödenecek tutarı, minimum bakiye gereksinimini ve iade tutarını hesaplar.

### İstek (Request)
- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izban/tutarhesaplama/{BinisIstasyonuId}/{InisIstasyonuId}/{Aktarma}/{httMi}`
- **Örnek Çağrı:** `https://openapi.izmir.bel.tr/api/izban/tutarhesaplama/1/15/0/false`

### Parametreler
| Parametre | Tip | Durum | Açıklama |
| --- | --- | --- | --- |
| `BinisIstasyonuId` | `number` | Zorunlu | Binilecek istasyon ID'si |
| `InisIstasyonuId` | `number` | Zorunlu | İnilecek istasyon ID'si |
| `Aktarma` | `number` | Zorunlu | Yapılan aktarma sayısı (`0`, `1`, `2`, `3`) |
| `httMi` | `boolean` veya `number` | Zorunlu | Halk Taşıt saatleri (05:00-07:00 / 19:00-20:00) içinde mi (`true`/`false` veya `1`/`0`) |

### Yanıt Modeli (Response)
Tekil `IzbanTarife` nesnesi döner:

| Alan | Tip | Açıklama |
| --- | --- | --- |
| `BinisIstasyonu` | `string` | Biniş istasyon adı |
| `InisIstasyonu` | `string` | İniş istasyon adı |
| `ToplamKm` | `number` | İstasyonlar arası seyahat mesafesi (km) |
| `TamUcret` | `number` | Tam kart net tahsil edilen seyahat ücreti |
| `OgrenciUcret` | `number` | Öğrenci kart net seyahat ücreti |
| `OgretmenUcret` | `number` | Öğretmen kart net seyahat ücreti |
| `Yas60Ucret` | `number` | 60 Yaş kart net seyahat ücreti |
| `SerbestUcret` | `number` | Personel/Serbest kart net ücreti |
| `MinBakiyeTam` | `number` | Biniş turnikesinden geçerken kartta bulunması gereken bloke bakiye (Tam) |
| `MinBakiyeOgrenci` | `number` | Biniş turnikesinden geçerken kartta bulunması gereken bloke bakiye (Öğrenci) |
| `MinBakiyeOgretmen` | `number` | Biniş turnikesinden geçerken kartta bulunması gereken bloke bakiye (Öğretmen) |
| `MinBakiye60Yas` | `number` | Biniş turnikesinden geçerken kartta bulunması gereken bloke bakiye (60 Yaş) |
| `MinBakiyeSerbest` | `number` | Biniş turnikesinden geçerken kartta bulunması gereken bloke bakiye (Serbest) |
| `IadeTam` | `number` | İniş istasyonunda iade makinesinden geri alınacak tutar (Tam) |
| `IadeOgrenci` | `number` | İniş istasyonunda iade makinesinden geri alınacak tutar (Öğrenci) |
| `IadeOgretmen` | `number` | İniş istasyonunda iade makinesinden geri alınacak tutar (Öğretmen) |
| `Iade60Yas` | `number` | İniş istasyonunda iade makinesinden geri alınacak tutar (60 Yaş) |
| `IadeSerbest` | `number` | İniş istasyonunda iade makinesinden geri alınacak tutar (Serbest) |

---

## 4. HTTP Durum Kodları

| Durum Kodu | Anlamı | Açıklama |
| --- | --- | --- |
| `200` | OK | Başarılı işlem, JSON verisi döndü |
| `204` | No Content | İstek başarılı ancak içerik bulunamadı |
| `401` | Unauthorized | Erişim yetkisi bulunmamaktadır |
| `404` | Not Found | Kaynak veya belirtilen istasyon/sefer bulunamadı |
| `500` | Internal Server Error | Sunucu tarafında hata oluştu |
