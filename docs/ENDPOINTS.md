# İzmir Open Data API Endpoint Listesi

İzmir Büyükşehir Belediyesi Açık Veri Portalı ve Open API servislerinin `izmir-open-data-js` kütüphanesi içindeki sınıf ve metod dağılımları.

## Afetler (`client.afetler`)
| Metod Adı | Açıklama |
|---|---|
| `getAcilDurumToplanmaAlanlari()` | Afet ve acil durum toplanma alanlarına ait ilçe, mahalle ve konum bilgilerini içeren web servisi. |

## Bisim (`client.bisim`)
| Metod Adı | Açıklama |
|---|---|
| `getIstasyonList()` | İstasyonların konum, kapasite ve bisiklet sayılarını içeren web servisi. |

## Cografi (`client.cografi`)
| Metod Adı | Açıklama |
|---|---|
| `getAdaYarimadaList()` | Ada ve yarımada konum bilgilerini içeren web servisi. |
| `getBurunlarList()` | Burun konum bilgilerini içeren web servisi. |
| `getDagTepeList()` | Dağ ve tepelerin konum bilgilerini içeren web servisi. |
| `getGollerList()` | Göl konum bilgilerini içeren web servisi. |
| `getKorfezKoylarList()` | Körfez ve koyların konum bilgilerini içeren web servisi. |
| `getMeydanlarList()` | Meydanların konum bilgilerini içeren web servisi. |
| `getNehirCaylarList()` | Nehir ve çayların konum bilgilerini içeren web servisi. |
| `getOrmanlarList()` | Ormanların konum bilgilerini içeren web servisi. |

## Eczaneler (`client.eczaneler`)
| Metod Adı | Açıklama |
|---|---|
| `getList()` | Eczanelerin bilgilerini içeren web servisi. |
| `getNobetciList()` | Nöbetçi eczanelerin bilgilerini içeren web servisi. |

## Egitim (`client.egitim`)
| Metod Adı | Açıklama |
|---|---|
| `getAnaokullarList()` | Anaokulu konum bilgilerini içeren web servisi. |
| `getEngelliOkullariList()` | Engelliler okulu konum bilgilerini içeren web servisi. |
| `getEtutMerkezleriList()` | Etüt eğitim merkezleri konum bilgilerini içeren web servisi. |
| `getHalkEgitimList()` | Halk eğitim merkezleri konum bilgilerini içeren web servisi. |
| `getIlkokullarList()` | İlkokullar konum bilgilerini içeren web servisi. |
| `getKolejlerList()` | Kolejler konum bilgilerini içeren web servisi. |
| `getLiselerList()` | Liseler konum bilgilerini içeren web servisi. |
| `getMeslekLiseleriList()` | Meslek liseleri konum bilgilerini içeren web servisi. |
| `getMilliEgitimList()` | Milli eğitim müdürlükleri konum bilgilerini içeren web servisi. |
| `getOrtaokullarList()` | Ortaokullar konum bilgilerini içeren web servisi. |
| `getSanatOkullariList()` | Sanat okulları konum bilgilerini içeren web servisi. |
| `getUniversitelerList()` | Üniversiteler konum bilgilerini içeren web servisi. |

## Eshot (`client.eshot`)
| Metod Adı | Açıklama |
|---|---|
| `getBaglantiHatlari()` | Diğer ulaşım araçları ile bağlantılı otobüs hatlarının listesini içeren web servisi (CSV). |
| `getBaglantiTipleri()` | Otobüs hatlarının diğer ulaşım araçları ile bağlantı tiplerini içeren web servisi (CSV). |
| `getDuragaYaklasanOtobusList()` | Bir durağa yaklaşan otobüslerin listesi, konumu ve diğer bilgilerini içeren web servisi. |
| `getDuraklar()` | ESHOT otobüs duraklarının listesini içeren web servisi (CSV). |
| `getHareketSaatleri()` | ESHOT otobüs hareket saatlerini içeren web servisi (CSV). |
| `getHatGuzergahlari()` | ESHOT hat güzergahlarını içeren web servisi (CSV). |
| `getHatOtobusKonumlari()` | Numarası girilen hatta ait otobüslerin anlık konum bilgilerini içeren web servisi. |
| `getHatlar()` | ESHOT hatlarının listesini içeren web servisi (CSV). |
| `getHattinYaklasanOtobusleri()` | Bir hattın belirli bir durağa yaklaşan otobüslerinin konum ve diğer bilgilerini içeren web servisi. |
| `getYakinDurakList()` | Koordinat (enlem, boylam) değerlerine göre en yakın durakları listeler. |

## Etkinlikler (`client.etkinlikler`)
| Metod Adı | Açıklama |
|---|---|
| `getEtkinlikById()` | Belirli bir etkinliğin detay bilgilerini içeren web servisi. |
| `getList()` | Güncel kültür sanat etkinlikler listesini içeren web servisi. |

## Hizmet (`client.hizmet`)
| Metod Adı | Açıklama |
|---|---|
| `getHizmetNoktaList()` | İzBB bünyesindeki hizmet noktalarını içeren web servisi. |

## Iklim (`client.iklim`)
| Metod Adı | Açıklama |
|---|---|
| `getGunlukHavaKalitesiOlcumleri()` | Belirtilen tarihe göre hava kalitesi ölçüm değerlerini içeren web servisi. |
| `getHavaKalitesiIstasyonlari()` | Hava kalitesi ölçüm istasyonlarının konum bilgilerini içeren web servisi (CSV). |

## Izban (`client.izban`)
| Metod Adı | Açıklama |
|---|---|
| `getDurakMesafeleri()` | İZBAN istasyonları arasındaki mesafe bilgilerini içeren web servisi (CSV). |
| `getHareketSaatleri()` | Banliyö hareket saatlerini içeren web servisi. |
| `getIstasyonList()` | Banliyö İstasyonlarının konum bilgileri içeren web servisi. |
| `getTarife()` | Banliyö fiyat tarifesi bilgisini içeren web servisi. |

## Izmirimkart (`client.izmirimkart`)
| Metod Adı | Açıklama |
|---|---|
| `getDolumNoktalari()` | İzmirimKart dolum noktalarının adres ve konum bilgilerini içeren web servisi (CSV). |

## Izsu (`client.izsu`)
| Metod Adı | Açıklama |
|---|---|
| `getArizaKaynakliKesintiList()` | Arıza kaynaklı düzensiz su kesintilerinin ilçe, mahalle, kesinti süresi, sebebi ve açıklama verilerini içeren web servisi. |
| `getBarajDolulukOranlari()` | Barajların doluluk oranlarını içeren web servisi. |
| `getBarajSuKaliteRaporlari()` | Baraj su kalite raporlarını içeren web servisi. |
| `getBarajVeKuyuList()` | Baraj ve kuyuların listesi ve konum bilgilerini içeren web servisi. |
| `getGunlukSuUretimi()` | Günlük su üretimi miktarlarını içeren web servisi. |
| `getHaftalikSuAnalizi()` | Güncel haftalık analiz sonuçlarını içeren web servisi. |
| `getIzsuSubeList()` | Şube adresleri, telefonları ve konum bilgilerini içeren web servisi. |
| `getIzsuVezneList()` | Vezne adresleri, telefonları ve konum bilgilerini içeren web servisi. |
| `getSuUretimiDagilimi()` | Su üretiminin aylara ve kaynaklara göre dağılımını içeren web servisi. |

## Iztek (`client.iztek`)
| Metod Adı | Açıklama |
|---|---|
| `getAskidaIzmirimKartIstatistik()` | Askıda İzmirim Kart istatistiklerini içeren web servisi. |

## Kamu (`client.kamu`)
| Metod Adı | Açıklama |
|---|---|
| `getBankalarList()` | Bankalar konum bilgilerini içeren web servisi. |
| `getBelediyelerList()` | Belediye ve birimler konum bilgilerini içeren web servisi. |
| `getBolgeMudurlukleriList()` | Bölge müdürlükleri konum bilgilerini içeren web servisi. |
| `getDefterdarliklarList()` | Defterdarlık konum bilgilerini içeren web servisi. |
| `getDerneklerList()` | Dernekler konum bilgilerini içeren web servisi. |
| `getEvlendirmeDaireleriList()` | Evlendirme daireleri konum bilgilerini içeren web servisi. |
| `getIlIlceMudurlukleriList()` | İl ve ilçe müdürlükleri konum bilgilerini içeren web servisi. |
| `getItfaiyeGruplariList()` | İtfaiye grupları konum bilgilerini içeren web servisi. |
| `getKonsolosluklarList()` | Konsolosluklar konum bilgilerini içeren web servisi. |
| `getMaskematikNoktalariList()` | Maskematik istasyon noktaları konum bilgilerini içeren web servisi. |
| `getMeslekOdalariList()` | Meslek odaları konum bilgilerini içeren web servisi. |
| `getNoterlerList()` | Noterler konum bilgilerini içeren web servisi. |
| `getNufusMudurlukleriList()` | Nüfus müdürlükleri konum bilgilerini içeren web servisi. |
| `getPttList()` | PTT (Posta ve Telgraf Teşkilatı) konum bilgilerini içeren web servisi. |
| `getTurizmDanismaList()` | Turizm danışma müdürlükleri konum bilgilerini içeren web servisi. |
| `getVergiDaireleriList()` | Vergi daireleri konum bilgilerini içeren web servisi. |

## Kutuphane (`client.kutuphane`)
| Metod Adı | Açıklama |
|---|---|
| `getGaleriVeSalonlarList()` | Sanat galerisi ve sergi salonları konum bilgilerini içeren web servisi. |
| `getKulturMerkezleriList()` | Kültür merkezleri konum bilgilerini içeren web servisi. |
| `getKutuphanelerList()` | Kütüphaneler konum bilgilerini içeren web servisi. |
| `getMuzelerList()` | Müzeler konum bilgilerini içeren web servisi. |
| `getOperaVeBaleList()` | Opera ve bale konum bilgilerini içeren web servisi. |
| `getSenfoniOrkestrasiList()` | Senfoni orkestrası konum bilgilerini içeren web servisi. |
| `getSinemalarList()` | Sinemalar konum bilgilerini içeren web servisi. |
| `getTiyatrolarList()` | Tiyatrolar konum bilgilerini içeren web servisi. |

## Metro (`client.metro`)
| Metod Adı | Açıklama |
|---|---|
| `getDurakMesafeleri()` | Metro istasyonları arasındaki mesafe bilgilerini içeren web servisi (CSV). |
| `getIstasyonList()` | Metro istasyonları sıra ve konum verisi bilgileri içeren web servis. |

## Muhtarliklar (`client.muhtarliklar`)
| Metod Adı | Açıklama |
|---|---|
| `getList()` | Muhtarlıklar hakkında bilgi ve coğrafi konumlarını içeren web servisi. |

## Otopark (`client.otopark`)
| Metod Adı | Açıklama |
|---|---|
| `getList()` | Otoparkların konumu, dolu-boş adetleri, çalışma saatleri bilgilerini içeren web servisi. |
| `getUcretler()` | İzelman otopark ücretlerini içeren web servisi (CKAN). |

## Pazarlar (`client.pazarlar`)
| Metod Adı | Açıklama |
|---|---|
| `getBalikHalFiyatlari()` | Balık hal fiyatlarını içeren web servisi. |
| `getList()` | Semt pazar yerlerinin listesi, günleri ve konum bilgileri içeren web servisi. |
| `getSebzeMeyveHalFiyatlari()` | Sebze ve meyve hal fiyatlarını içeren web servisi. |

## Plaj (`client.plaj`)
| Metod Adı | Açıklama |
|---|---|
| `getFuarList()` | Fuar alanları konum bilgilerini içeren web servisi. |
| `getHamamlarList()` | Hamamlar konum bilgilerini içeren web servisi. |
| `getKaplicalarList()` | Kaplıcalar konum bilgilerini içeren web servisi. |
| `getPlajlarList()` | Plajlar konum bilgilerini içeren web servisi. |

## Saglik (`client.saglik`)
| Metod Adı | Açıklama |
|---|---|
| `getAcilYardimIstasyonlariList()` | Acil yardım istasyonları konum bilgilerini içeren web servisi. |
| `getAgizDisSagligiMerkezleriList()` | Ağız ve diş sağlığı merkezleri konum bilgilerini içeren web servisi. |
| `getAileSagligiMerkezleriList()` | Aile sağlığı merkezleri konum bilgilerini içeren web servisi. |
| `getAnaCocukSagligiMerkezleriList()` | Ana çocuk sağlığı merkezleri konum bilgilerini içeren web servisi. |
| `getDalMerkezleriList()` | Dal merkezleri konum bilgilerini içeren web servisi. |
| `getHastanelerList()` | Hastaneler konum bilgilerini içeren web servisi. |
| `getKanMerkezleriList()` | Kan merkezleri konum bilgilerini içeren web servisi. |
| `getLaboratuvarlarList()` | Laboratuvarlar konum bilgilerini içeren web servisi. |
| `getPolikliniklerList()` | Poliklinikler konum bilgilerini içeren web servisi. |
| `getTipMerkezleriList()` | Tıp merkezleri konum bilgilerini içeren web servisi. |
| `getToplumSagligiMerkezleriList()` | Toplum sağlığı merkezleri konum bilgilerini içeren web servisi. |
| `getVeremSavasDispanserleriList()` | Verem savaş dispanserleri konum bilgilerini içeren web servisi. |
| `getVeterinerliklerList()` | Veterinerlikler konum bilgilerini içeren web servisi. |

## Sosyal (`client.sosyal`)
| Metod Adı | Açıklama |
|---|---|
| `getAileDayanismaMerkezleriList()` | Aile dayanışma merkezleri konum bilgilerini içeren web servisi. |
| `getCocukGenclikMerkezleriList()` | Çocuk ve gençlik merkezleri konum bilgilerini içeren web servisi. |
| `getCocukYuvalariList()` | Çocuk yuvaları konum bilgilerini içeren web servisi. |
| `getHuzurevleriList()` | Huzurevleri konum bilgilerini içeren web servisi. |
| `getToplumMerkezleriList()` | Toplum merkezleri konum bilgilerini içeren web servisi. |
| `getYetistirmeYurtlariList()` | Yetiştirme yurtları konum bilgilerini içeren web servisi. |

## Spor (`client.spor`)
| Metod Adı | Açıklama |
|---|---|
| `getHipodromList()` | Hipodrom konum bilgilerini içeren web servisi. |
| `getSporSalonlariList()` | Spor salonları ve sahaları konum bilgilerini içeren web servisi. |
| `getStadyumlarList()` | Stadyumlar konum bilgilerini içeren web servisi. |
| `getYuruyusYollari()` | Yürüyüş ve bisiklet parkurlarının bilgilerini içeren web servisi (CSV). |

## Taksi (`client.taksi`)
| Metod Adı | Açıklama |
|---|---|
| `getDurakList()` | Taksi durak bilgilerini içeren web servisi. |

## Tarihi (`client.tarihi`)
| Metod Adı | Açıklama |
|---|---|
| `getAntikKentYapilariList()` | Antik kent yapıları konum bilgilerini içeren web servisi. |
| `getAntikKentlerList()` | Antik kentler konum bilgilerini içeren web servisi. |
| `getKoskVeKonaklarList()` | Köşk ve konaklar konum bilgilerini içeren web servisi. |
| `getKuleAnitHeykellerList()` | Kule, anıt ve heykeller konum bilgilerini içeren web servisi. |
| `getTarihiCarsiHanlarList()` | Tarihi çarşı ve hanlar konum bilgilerini içeren web servisi. |
| `getTarihiSuYapilariList()` | Tarihi su yapıları konum bilgilerini içeren web servisi. |
| `getTarihiYapilarList()` | Tarihi yapılar konum bilgilerini içeren web servisi. |

## Trafik (`client.trafik`)
| Metod Adı | Açıklama |
|---|---|
| `getKameraList()` | İzmir'deki trafik kameralarının listesini içeren web servisi (CSV). |

## Tramvay (`client.tramvay`)
| Metod Adı | Açıklama |
|---|---|
| `getDurakMesafeleri()` | Tramvay hatları için durak mesafelerini içeren web servisi (CSV). |
| `getHatList()` | Tramvay hatları bilgisini içeren web servis: |
| `getIstasyonList()` | Sefer numarasına göre tramvay istasyonları listesini içeren web servis. |
| `getPlanlananiSeferSayilari()` | Metro ve tramvay hatları için aylık planlanan sefer sayılarını içeren web servisi (CSV). |
| `getSeferList()` | Tramvay sefer ve istasyon id bilgilerini içeren web servisi. |
| `getSeferSiklikList()` | Sefer numarasına göre tramvay sefer sıklıkları bilgisini veren web servisi. |

## Tren (`client.tren`)
| Metod Adı | Açıklama |
|---|---|
| `getAracMuayeneIstasyonlariList()` | Araç muayene istasyonları konum bilgilerini içeren web servisi. |
| `getHavaalaniList()` | Havaalanı konum bilgilerini içeren web servisi. |
| `getOtobusTerminalleriList()` | Şehirlerarası otobüs terminalleri konum bilgilerini içeren web servisi. |
| `getTrenGarlariList()` | Tren garları konum bilgilerini içeren web servisi. |

## Vapur (`client.vapur`)
| Metod Adı | Açıklama |
|---|---|
| `getCalismaGunleri()` | Vapurların çalışma günlerini içeren web servisi. |
| `getDetayList()` | Vapurların detaylı bilgilerini içeren web servisi (CSV). |
| `getHareketSaatleri()` | Vapur hareket saatleri bilgisini içeren web servisi. |
| `getHareketSaatleriByHat()` | İskele bazlı vapur hareket saatleri bilgisini içeren web servisi. |
| `getIskeleList()` | Vapur ve arabalı vapur iskele bilgilerini içeren web servisi. |

## Wizmirnet (`client.wizmirnet`)
| Metod Adı | Açıklama |
|---|---|
| `getList()` | Ücretsiz-kablosuz internet hizmet noktaları ve lokasyon bilgilerini içeren web servisi. |
