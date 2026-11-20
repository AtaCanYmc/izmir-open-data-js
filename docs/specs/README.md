# İzmir Açık Veri Portalı Resmi API Şartnameleri Arşivi

Bu dizin, İzmir Büyükşehir Belediyesi Bilgi İşlem Dairesi Başkanlığı ve bağlı iştirakleri (İZBAN, İZSU, İzmir Metro A.Ş.) tarafından sağlanan resmi PDF web servis kullanım kılavuzlarından elde edilen teknik şartnameleri, veri modellerini ve entegrasyon kurallarını içerir.

Tüm şartnameler `izmir-open-data-js` SDK mimarisi ile uyumlu hale getirilmiş, test edilmiş ve güncel API durumları belgelenmiştir.

---

## 1. Şartname Belgeleri Dizini

| Belge | İştirak / Birim | Sürüm | Kapsam | Şartname Dosyası |
| --- | --- | --- | --- | --- |
| **İZBAN Web Servis Dokümanı** | İZBAN A.Ş. | V.1.0 | Banliyö istasyonları, sefer saatleri, Gittiğin Kadar Öde tutar hesaplama | [IZBAN.md](IZBAN.md) |
| **Metro ve Tramvay Web Servis Dokümanı** | İzmir Metro A.Ş. | V.1.0 | Metro istasyonları, sefer sıklığı, tramvay hatları (1-8), tramvay durakları | [METRO_TRAMVAY.md](METRO_TRAMVAY.md) |
| **İZSU Web Servis Dokümanı** | İZSU Genel Müdürlüğü | V.1.0 | Su arıza/kesinti, baraj durumları, su üretimi, su analizleri, vezne ve şubeler | [IZSU.md](IZSU.md) |
| **CBS Web Servis Dokümanı** | İZBB CBS Şube Müdürlüğü | V.1.1 | 88 Kentsel katman (POI) ve Noktaya Yakın Otobüs Durakları servisi | [CBS.md](CBS.md) |

---

## 2. Ortak Teknik Standartlar

1. **İletişim Protokolü:** RESTful HTTP GET.
2. **Yetkilendirme:** Açık Veri Portalı üzerindeki bu servisler anonim erişime açıktır.
3. **Veri Formatı:** Tüm uç noktalar `application/json` formatında veri üretir.
4. **Koordinat Referans Sistemi:** Tüm coğrafi konum verileri (enlem/boylam) WGS84 (`EPSG:4326`) projeksiyonundadır.
5. **Kentsel POI Şeması:** CBS katmanlarının tümü standart `DefaultOnemliYer` şemasına (`ADI`, `ILCE`, `MAHALLE`, `YOL`, `KAPINO`, `ENLEM`, `BOYLAM`) uyar.
