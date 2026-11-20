# İZSU Web Servis Teknik Şartnamesi (V1.0) & Entegrasyon Analizi

İzmir Su ve Kanalizasyon İdaresi Genel Müdürlüğü (İZSU) tarafından yayımlanan resmi API servislerinin teknik dokümantasyonu, parametre modelleri ve güncel API durum analizidir.

- **Kaynak Belge:** `izsu-WebServisKullanimDokumani_1.0.pdf`
- **Sürüm:** V.1.0
- **Base URL (Dokümantasyon):** `https://openapi.izmir.bel.tr/api/izsu`
- **Yetkilendirme:** Anonim (Header/Token gerektirmez)
- **Veri Formatı:** JSON

> [!WARNING] Canlı API Durumu ve Mimari Göç
> `openapi.izmir.bel.tr/api/izsu/*` ana servisleri sunucu tarafında HTTP 500 hatası döndürmektedir. İzmir Büyükşehir Belediyesi güncel verileri CKAN Portalı (`5c2ad5b0-f681-45a6-b72c-170791ea8f50`) ve `acikveriwapi.izmir.bel.tr/AcikVeriIzsuApi/*` uç noktalarına taşımıştır. SDK her iki yapıyı da destekleyecek şekilde hazırlanmıştır.

---

## 1. Arıza Kaynaklı Su Kesintileri Web Servisi

İzmir genelinde devam eden veya planlanan şebeke arızası kaynaklı su kesintilerini ilçe ve mahalle bazında bildirir.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izsu/arizakaynaklisukesintileri`
- **Parametreler:** Parametre almamaktadır.

### Yanıt Modeli
Dizi olarak `KesintiBilgisi` döner:

| Alan | Tip | Açıklama |
| --- | --- | --- |
| `Tip` | `string` | Kesinti tipi ve arıza sebebi |
| `Ongoru` | `string` | Arıza giderilme tahmini (`"1"`: Belirsiz, `"2"`: Belirlidir) |
| `Birim` | `string` | Arıza kaydını oluşturan birim |
| `KesintiTarihi` | `string` (Datetime) | Kesintinin başladığı tarih/saat |
| `ArizaGiderilmeTarihi` | `string` (Datetime) | Tahmini arıza giderilme tarihi/saati |
| `IlceAdi` | `string` | Arızanın bulunduğu ilçe |
| `Mahalleler` | `string` | Etkilenen mahalleler (virgülle ayrılmış metin) |
| `KesintiSuresi` | `string` | Kesintinin başlangıç, bitiş ve tahmini süresini özetleyen metin |
| `Aciklama` | `string` | Ek arıza ve saha açıklaması |

---

## 2. Baraj ve Kuyular Web Servisi

İzmir kentine su sağlayan aktif baraj ve derin su kuyularının isim ve coğrafi konumlarını listeler.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izsu/barajvekuyular`

### Yanıt Modeli
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `Adi` | `string` | Baraj veya kuyu adı |
| `Enlem` | `number` (Float) | Coğrafi enlem |
| `Boylam` | `number` (Float) | Coğrafi boylam |
| `TurAdi` | `string` | Tesis türü (`Baraj` / `Kuyu`) |

---

## 3. Baraj Durumları ve Doluluk Oranları Web Servisi

Barajların güncel su seviyelerini, göl hacmini ve doluluk yüzdelerini raporlar.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izsu/barajdurum`

### Yanıt Modeli
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `BarajKuyuId` | `number` | Baraj benzersiz kimliği |
| `BarajKuyuAdi` | `string` | Baraj adı (Tahtalı, Balçova, Güzelhisar, Ürkmez vb.) |
| `SuYuksekligi` | `number` | Güncel su yüksekliği (metre) |
| `SuDurumu` | `number` | Baraj su seviyesi göstergesi |
| `KullanılabilirGolSuHacmi` | `number` | Kullanılabilir göl su hacmi ($m^3$) |
| `DolulukOrani` | `number` | Yüzdesel doluluk oranı (%) |
| `MaksimumSuKapasitesi` | `number` | Barajın azami su kapasitesi ($m^3$) |
| `MinimumSuKapasitesi` | `number` | Asgari kritik rezerv su hacmi |
| `DurumTarihi` | `string` (Datetime) | Ölçümün yapıldığı tarih |

---

## 4. Günlük Su Üretimi Web Servisi

Kente verilen günlük toplam su üretimini baraj ve kuyu bazında kırılımlı verir.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izsu/gunluksuuretimi`

### Yanıt Modeli
```json
{
  "UretimTarihi": "2024-01-01T00:00:00",
  "BarajKuyuUretimleri": [
    {
      "TurAdi": "Baraj",
      "BarajKuyuAdi": "Tahtalı",
      "BarajKuyuId": 1,
      "UretimMiktari": 150000
    }
  ]
}
```

---

## 5. Su Üretiminin Aylara ve Kaynaklara Göre Dağılımı

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izsu/suuretiminindagilimi/{yil?}`
- **Parametre:** `yil` (`number`, İsteğe bağlı): Sorgulanmak istenen yıl (Örn: `2023`).

### Yanıt Alanları
| Alan | Tip | Açıklama |
| --- | --- | --- |
| `UretimKaynagi` | `string` | Üretim yapılan tesis/kaynak |
| `UretimMiktari` | `number` | Üretim hacmi ($m^3$) |
| `Yil` | `number` | İlgili yıl |
| `Ay` | `number` | İlgili ay |

---

## 6. Haftalık Su Analiz Nokta Sonuçları

İzmir genelinde belirlenen şebeke kontrol noktalarından alınan numunelerin kimyasal ve fiziksel laboratuvar sonuçlarıdır.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izsu/haftaliksuanalizleri`

### Yanıt Modeli
`SuAnalizResponse`:
- `AnalizTarihleri`: Tarih listesi
- `Noktalar`: Numune alınan nokta tanımları
- `Analizler`:
  - `ParametreKodu`: Parametre kimliği
  - `ParametreAdi`: Parametre adı (Serbest Klor, pH, İletkenlik, Bulanıklık, Alüminyum vb.)
  - `Birim`: Ölçü birimi (mg/L, NTU, $\mu S/cm$)
  - `Standart`: TS 266 / İnsani Tüketim Amaçlı Sular Standardı sınır değeri
  - `ParametreDegeri`: Ölçülen analiz değeri
  - `SonucTarihi`: Laboratuvar test tarihi

---

## 7. Çevre İlçe Merkezleri Analiz Sonuçları

Merkez dışındaki çevre ilçelerin arıtma tesisleri ve dağıtım hatlarına ait su kalite analizleri.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izsu/cevreilcesuanalizleri`

---

## 8. İZSU Şube Bilgileri

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izsu/subeler`
- **Dönen Bilgiler:** `SubeAdi`, `Adres`, `Telefon`, `Enlem`, `Boylam`, `Ilce`

---

## 9. İZSU Vezne Bilgileri

Fatura tahsilat veznelerinin konum ve mesai bilgileri.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izsu/vezneler`
- **Dönen Bilgiler:** `VezneAdi`, `Adres`, `CalismaSaatleri`, `Enlem`, `Boylam`

---

## 10. Baraj Su Kalitesi Analiz Raporları

Ham baraj sularının mevsimsel ve aylık kalite ölçüm raporları.

- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/izsu/barajsukaliteraporlari`

---

## 11. Durum Kodları

| Durum Kodu | Açıklama |
| --- | --- |
| `200` | Başarılı işlem |
| `204` | İçerik yok |
| `401` | Yetkisiz erişim |
| `404` | Kaynak bulunamadı |
| `500` | Sunucu hatası |
