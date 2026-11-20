# Coğrafi Bilgi Sistemleri (CBS) Web Servis Teknik Şartnamesi (V1.1)

İzmir Büyükşehir Belediyesi Bilgi İşlem Dairesi Başkanlığı Coğrafi Bilgi Sistemleri Şube Müdürlüğü tarafından yayımlanan resmi CBS web servislerinin teknik şartnamesi ve entegrasyon kılavuzudur.

- **Kaynak Belge:** `cbs-WebServisKullanimDokumani-1.1-2.pdf`
- **Sürüm:** V.1.1
- **Base URL:** `https://openapi.izmir.bel.tr/api/ibb/cbs`
- **Yetkilendirme:** Anonim (Header/Token gerektirmez)
- **Veri Formatı:** JSON

---

## 1. Standart Mimari ve Veri Modeli

CBS Web Servisleri (Madde 4.1 - 4.88), İzmir Büyükşehir Belediyesi'nin kentsel envanterindeki önemli yerleri (Points of Interest - POI) standart bir veri şemasında döndürür.

### Standart Önemli Yer Şeması (`DefaultOnemliYer`)

| Alan | Tip | Açıklama |
| --- | --- | --- |
| `ILCE` | `string` | Konumun bulunduğu ilçe adı (Örn: "KONAK", "KARŞIYAKA") |
| `ILCEID` | `string` veya `number` | İlçe kimlik numarası |
| `MAHALLE` | `string` | Mahalle bilgisi |
| `YOL` | `string` | Cadde, sokak veya bulvar adı |
| `KAPINO` | `string` | Kapı veya bina numarası |
| `ADI` | `string` | Tesis veya önemli noktanın resmi adı |
| `ACIKLAMA` | `string` | Nokta ile ilgili açıklama |
| `BOYLAM` | `number` (Float) | Coğrafi boylam (WGS84 EPSG:4326) |
| `ENLEM` | `number` (Float) | Coğrafi enlem (WGS84 EPSG:4326) |

---

## 2. Noktaya Yakın Otobüs Durakları Servisi (Madde 4.89)

Kullanıcının verilen coğrafi koordinatına en yakın ESHOT otobüs duraklarını ve durağa olan kuş uçuşu mesafeyi (metre) listeler.

### İstek (Request)
- **Metot:** `GET`
- **URL:** `https://openapi.izmir.bel.tr/api/ibb/cbs/noktayayakinduraklar`
- **Örnek Çağrı:** `https://openapi.izmir.bel.tr/api/ibb/cbs/noktayayakinduraklar?x=27.051316&y=38.513876&inCoordSys=EPSG:4326&outCoordSys=EPSG:4326`

### Parametreler
| Parametre | Tip | Durum | Açıklama |
| --- | --- | --- | --- |
| `x` | `number` (Float) | Zorunlu | Sorgulanan noktanın boylamı (Longitude) |
| `y` | `number` (Float) | Zorunlu | Sorgulanan noktanın enlemi (Latitude) |
| `inCoordSys` | `string` | Zorunlu | Giriş koordinat sistemi (Örn: `EPSG:4326`) |
| `outCoordSys` | `string` | Zorunlu | Çıkış koordinat sistemi (Örn: `EPSG:4326`) |

### Yanıt Modeli (Response)
Dizi olarak `YakinDurak` nesneleri döner:

| Alan | Tip | Açıklama |
| --- | --- | --- |
| `durakId` | `string` | Benzersiz ESHOT durak numarası |
| `adi` | `string` | Durak adı |
| `enlem` | `number` (Float) | Durağın enlem koordinatı |
| `boylam` | `number` (Float) | Durağın boylam koordinatı |
| `mesafe` | `number` (Float) | Sorgulanan noktadan durağa metre cinsinden mesafe |

```json
[
  {
    "durakId": "21058",
    "enlem": 38.513800430505,
    "boylam": 27.051800453052,
    "adi": "İlkevler 2",
    "mesafe": 43.047363128509
  }
]
```

---

## 3. CBS 89 Katman Tam Dizini

Aşağıdaki tüm katmanlar `https://openapi.izmir.bel.tr/api/ibb/cbs/{slug}` formatında çağrılır ve SDK içerisinde ilgili tematik modüllere (`cografi`, `egitim`, `saglik`, `kamu`, `sosyal`, `spor`, `tarihi`, `wizmirnet`, `tren`, `taksi`, `plaj`, `afetler`, `pazarlar` vb.) dağıtılmıştır.

### 3.1. Ulaşım ve Altyapı
| No | Katman Adı | Servis Uç Noktası (Slug) | SDK Modülü |
| --- | --- | --- | --- |
| 1 | WizmirNet Ücretsiz İnternet Noktaları | `wizmirnetnoktalari` | `client.wizmirnet.getList()` |
| 22 | Maskematik İstasyon Noktaları | `maskematiknoktalari` | `client.saglik.getMaskematikList()` |
| 84 | Araç Muayene İstasyonları | `aracmuayeneistasyonlari` | `client.kamu.getAracMuayeneList()` |
| 85 | Havalimanları | `havaalani` | `client.kamu.getHavaalaniList()` |
| 86 | Şehirlerarası Otobüs Terminalleri | `otobusterminalleri` | `client.kamu.getOtobusTerminalleriList()` |
| 87 | Taksi Durakları | `taksiduraklari` | `client.taksi.getList()` |
| 88 | Tren Garları | `trengarlari` | `client.tren.getTrenGarlariList()` |
| 89 | Noktaya Yakın Otobüs Durakları | `noktayayakinduraklar` | `client.eshot.getYakinDurakList()` |

### 3.2. Sağlık Hizmetleri
| No | Katman Adı | Servis Uç Noktası (Slug) | SDK Modülü |
| --- | --- | --- | --- |
| 54 | Acil Yardım İstasyonları (112) | `acilyardimistasyonu` | `client.saglik.getAcilYardimList()` |
| 55 | Aile Sağlığı Merkezleri (ASM) | `ailesagligimerkezleri` | `client.saglik.getAileSagligiMerkezleriList()` |
| 56 | Ağız ve Diş Sağlığı Merkezleri | `agizvedissagligimerkezleri` | `client.saglik.getAgizDisSagligiList()` |
| 57 | Ana Çocuk Sağlığı Merkezleri | `anacocuksagligimerkezleri` | `client.saglik.getAnaCocukSagligiList()` |
| 58 | Dal Merkezleri | `dalmerkezleri` | `client.saglik.getDalMerkezleriList()` |
| 59 | Hastaneler | `hastaneler` | `client.saglik.getHastanelerList()` |
| 60 | Kızılay Kan Merkezleri | `kanmerkezleri` | `client.saglik.getKanMerkezleriList()` |
| 61 | Tıbbi Laboratuvarlar | `laboratuvarlar` | `client.saglik.getLaboratuvarlarList()` |
| 62 | Poliklinikler | `poliklinikler` | `client.saglik.getPolikliniklerList()` |
| 63 | Tıp Merkezleri | `tipmerkezleri` | `client.saglik.getTipMerkezleriList()` |
| 64 | Toplum Sağlığı Merkezleri | `toplumsagligimerkezleri` | `client.saglik.getToplumSagligiList()` |
| 65 | Verem Savaş Dispanserleri | `veremsavasdispanserleri` | `client.saglik.getVeremSavasList()` |
| 66 | Veteriner Klinikleri ve Merkezleri | `veterinerlikler` | `client.saglik.getVeterinerliklerList()` |

### 3.3. Eğitim Kurumları
| No | Katman Adı | Servis Uç Noktası (Slug) | SDK Modülü |
| --- | --- | --- | --- |
| 2 | Engelliler Okulları | `engelliokullari` | `client.egitim.getEngelliOkullariList()` |
| 12 | Anaokulları | `anaokullari` | `client.egitim.getAnaokullariList()` |
| 13 | Etüt Eğitim Merkezleri | `etutmerkezleri` | `client.egitim.getEtutMerkezleriList()` |
| 14 | Halk Eğitim Merkezleri | `halkegitim` | `client.egitim.getHalkEgitimList()` |
| 15 | İlkokullar | `ilkokullar` | `client.egitim.getIlkokullarList()` |
| 16 | Kolejler ve Özel Okullar | `kolejler` | `client.egitim.getKolejlerList()` |
| 17 | Liseler | `liseler` | `client.egitim.getLiselerList()` |
| 18 | Meslek Liseleri | `meslekliseleri` | `client.egitim.getMeslekLiseleriList()` |
| 19 | Ortaokullar | `ortaokullar` | `client.egitim.getOrtaokullarList()` |
| 20 | Sanat Okulları | `sanatokullari` | `client.egitim.getSanatOkullariList()` |
| 21 | Üniversiteler ve Kampüsler | `universiteler` | `client.egitim.getUniversitelerList()` |

### 3.4. İdari ve Kamu Hizmet Noktaları
| No | Katman Adı | Servis Uç Noktası (Slug) | SDK Modülü |
| --- | --- | --- | --- |
| 3 | Afet ve Acil Toplanma Alanları | `afetaciltoplanmaalani` | `client.afetler.getToplanmaAlanlariList()` |
| 4 | Semt Pazar Yerleri | `pazaryerleri` | `client.pazarlar.getList()` |
| 23 | Bankalar ve Finans Şubeleri | `bankalar` | `client.kamu.getBankalarList()` |
| 24 | İlçe Belediyeleri ve Hizmet Birimleri | `belediyeler` | `client.kamu.getBelediyelerList()` |
| 25 | İZBB Hizmet Binaları ve Merkezleri | `izbbhizmetnoktalari` | `client.kamu.getIzbbHizmetNoktalariList()` |
| 26 | Bölge Müdürlükleri | `bolgemudurlukleri` | `client.kamu.getBolgeMudurlukleriList()` |
| 27 | Defterdarlık ve Malmüdürlükleri | `defterdarliklar` | `client.kamu.getDefterdarliklarList()` |
| 28 | Dernek ve Sivil Toplum Kuruluşları | `dernekler` | `client.kamu.getDerneklerList()` |
| 29 | Evlendirme Daireleri | `evlendirmedaireleri` | `client.kamu.getEvlendirmeDaireleriList()` |
| 30 | Halk Eğitim Müdürlükleri | `halkegitim` | `client.egitim.getHalkEgitimList()` |
| 31 | İl ve İlçe Müdürlükleri | `ilveilcemudurlukleri` | `client.kamu.getIlIlceMudurlukleriList()` |
| 32 | İtfaiye Grupları ve İstasyonları | `itfaiyegruplari` | `client.kamu.getItfaiyeGruplariList()` |
| 33 | Yabancı Misyon ve Konsolosluklar | `konsolosluklar` | `client.kamu.getKonsolosluklarList()` |
| 34 | Meslek Odaları | `meslekodalari` | `client.kamu.getMeslekOdalariList()` |
| 35 | İl ve İlçe Milli Eğitim Müdürlükleri | `milliegitim` | `client.egitim.getMilliEgitimList()` |
| 36 | Mahalle Muhtarlıkları | `muhtarliklar` | `client.muhtarliklar.getList()` |
| 37 | Noterler | `noterler` | `client.kamu.getNoterlerList()` |
| 38 | İlçe Nüfus Müdürlükleri | `nufusmudurlukleri` | `client.kamu.getNufusMudurlukleriList()` |
| 39 | PTT Şubeleri | `ptt` | `client.kamu.getPttList()` |
| 40 | Turizm Danışma Büroları | `turizmdanisma` | `client.kamu.getTurizmDanismaList()` |
| 41 | Vergi Daireleri | `vergidaireleri` | `client.kamu.getVergiDaireleriList()` |

### 3.5. Kültür, Sanat ve Turizm
| No | Katman Adı | Servis Uç Noktası (Slug) | SDK Modülü |
| --- | --- | --- | --- |
| 42 | Fuar Alanları (Kültürpark / Fuar İzmir) | `fuar` | `client.tarihi.getFuarList()` |
| 43 | Tarihi Hamamlar | `hamamlar` | `client.tarihi.getHamamlarList()` |
| 44 | Termal Kaynaklar ve Kaplıcalar | `kaplicalar` | `client.tarihi.getKaplicalarList()` |
| 45 | Kent Meydanları | `meydanlar` | `client.cografi.getMeydanlarList()` |
| 46 | Halk Plajları | `plajlar` | `client.plaj.getList()` |
| 47 | Kültür Merkezleri | `kulturmerkezleri` | `client.tarihi.getKulturMerkezleriList()` |
| 48 | Şehir Kütüphaneleri | `kutuphaneler` | `client.kutuphane.getList()` |
| 49 | Opera ve Bale Salonları | `operavebale` | `client.tarihi.getOperaBaleList()` |
| 50 | Sanat Galerileri ve Sergi Salonları | `galerivesalonlar` | `client.tarihi.getSanatGalerileriList()` |
| 51 | Senfoni Orkestrası Binaları | `senfoniorkestrasi` | `client.tarihi.getSenfoniList()` |
| 52 | Sinema Salonları | `sinemalar` | `client.tarihi.getSinemalarList()` |
| 53 | Şehir Tiyatroları ve Sahneleri | `tiyatrolar` | `client.tarihi.getTiyatrolarList()` |
| 76 | Antik Kentler | `antikkentler` | `client.tarihi.getAntikKentlerList()` |
| 77 | Antik Kent Yapıları ve Kalıntıları | `antikkentyapilari` | `client.tarihi.getAntikKentYapilariList()` |
| 78 | Tarihi Köşkler ve Konaklar | `koskvekonaklar` | `client.tarihi.getKoskVeKonaklarList()` |
| 79 | Kule, Anıt ve Heykeller | `kuleanitveheykeller` | `client.tarihi.getKuleAnitHeykellerList()` |
| 80 | Müzeler | `muzeler` | `client.tarihi.getMuzelerList()` |
| 81 | Tarihi Çarşılar ve Hanlar (Kemeraltı) | `tarihicarsivehanlar` | `client.tarihi.getTarihiCarsiVeHanlarList()` |
| 82 | Tarihi Su Yapıları (Sebiller, Çeşmeler) | `tarihisuyapilari` | `client.tarihi.getTarihiSuYapilariList()` |
| 83 | Tescilli Tarihi Yapılar | `tarihiyapilar` | `client.tarihi.getTarihiYapilarList()` |

### 3.6. Sosyal Hizmetler
| No | Katman Adı | Servis Uç Noktası (Slug) | SDK Modülü |
| --- | --- | --- | --- |
| 67 | Aile Dayanışma Merkezleri | `ailedayanismamerkezleri` | `client.sosyal.getAileDayanismaList()` |
| 68 | Çocuk ve Gençlik Merkezleri | `cocukvegenclikmerkezleri` | `client.sosyal.getCocukGenclikMerkezleriList()` |
| 69 | Çocuk Yuvaları | `cocukyuvalari` | `client.sosyal.getCocukYuvalariList()` |
| 70 | Huzurevleri ve Yaşlı Bakım Merkezleri | `huzurevleri` | `client.sosyal.getHuzurevleriList()` |
| 71 | Toplum Merkezleri | `toplummerkezleri` | `client.sosyal.getToplumMerkezleriList()` |
| 72 | Yetiştirme Yurtları | `yetistirmeyurtlari` | `client.sosyal.getYetistirmeYurtlariList()` |

### 3.7. Spor Tesisleri
| No | Katman Adı | Servis Uç Noktası (Slug) | SDK Modülü |
| --- | --- | --- | --- |
| 73 | Şirinyer Hipodromu | `hipodrom` | `client.spor.getHipodromList()` |
| 74 | Spor Salonları ve Halı Sahalar | `sporsalonlari` | `client.spor.getSporSalonlariList()` |
| 75 | Stadyumlar | `stadyumlar` | `client.spor.getStadyumlarList()` |

### 3.8. Coğrafi ve Doğal Unsurlar
| No | Katman Adı | Servis Uç Noktası (Slug) | SDK Modülü |
| --- | --- | --- | --- |
| 5 | Adalar ve Yarımadalar | `adayarimada` | `client.cografi.getAdaYarimadaList()` |
| 6 | Burunlar | `burunlar` | `client.cografi.getBurunlarList()` |
| 7 | Dağlar ve Tepeler | `dagtepe` | `client.cografi.getDagTepeList()` |
| 8 | Doğal Göller ve Göletler | `goller` | `client.cografi.getGollerList()` |
| 9 | Körfez ve Koylar | `korfezvekoylar` | `client.cografi.getKorfezKoylarList()` |
| 10 | Nehirler ve Çaylar | `nehirvecaylar` | `client.cografi.getNehirCaylarList()` |
| 11 | Kent Ormanları ve Koruluklar | `ormanlar` | `client.cografi.getOrmanlarList()` |

---

## 4. HTTP Durum Kodları

| Durum Kodu | Açıklama |
| --- | --- |
| `200` | Başarılı işlem |
| `204` | İçerik yok |
| `401` | Yetkisiz erişim |
| `404` | Kaynak bulunamadı |
| `500` | Sunucu hatası |
