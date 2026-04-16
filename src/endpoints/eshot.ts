import {IzmirClient} from "../client";
import {DefaultOnemliYer, OnemliYerWrapper} from "../common/types/onemliYer";
import * as cheerio from 'cheerio';

export interface EshotDurak extends DefaultOnemliYer {}

/**
 * ESHOT hat bilgisi (CSV datasından)
 */
export interface EshotHat {
    HAT_NO: number;
    HAT_ADI: string;
    GUZERGAH_ACIKLAMA: string;
    ACIKLAMA: string;
    HAT_BASLANGIC: string;
    HAT_BITIS: string;
}

/**
 * ESHOT otobüs hareket saati bilgisi (CSV datasından)
 */
export interface EshotHareketSaati {
    HAT_NO: number;
    TARIFE_ID: number;
    GIDIS_SAATI: string;
    DONUS_SAATI: string;
    SIRA: number;
    GIDIS_ENGELLI_DESTEGI: string;
    DONUS_ENGELLI_DESTEGI: string;
    BISIKLETLI_GIDIS: string;
    BISIKLETLI_DONUS: string;
    GIDIS_ELEKTRIKLI_OTOBUS: string;
    DONUS_ELEKTRIKLI_OTOBUS: string;
}

/**
 * ESHOT otobüs durağı bilgisi (CSV datasından)
 */
export interface EshotDurakCSV {
    DURAK_ID: number;
    DURAK_ADI: string;
    ENLEM: number;
    BOYLAM: number;
    DURAKTAN_GECEN_HATLAR: string;
}

/**
 * ESHOT hat güzergah noktası bilgisi (CSV datasından)
 */
export interface EshotHatGuzergah {
    HAT_NO: number;
    /** Güzergah yönü: 1 = Gidiş, 2 = Dönüş */
    YON: number;
    BOYLAM: number;
    ENLEM: number;
}

/**
 * ESHOT bağlantı tipi bilgisi (CSV datasından)
 * Otobüs hatlarının diğer ulaşım araçları ile bağlantı tipleri
 */
export interface EshotBaglantiTipi {
    BAGLANTI_TIP_ID: number;
    /** Bağlantı tipi adı (METRO, IZBAN, VAPUR, HAVAALANI, OTOGAR) */
    BAGLANTI_TIPI: string;
}

/**
 * ESHOT bağlantılı hat bilgisi (CSV datasından)
 * Diğer ulaşım araçları ile bağlantılı otobüs hatları
 */
export interface EshotBaglantiHat {
    /** Bağlantı tipi ID'si (1=METRO, 2=IZBAN, 3=VAPUR, 4=HAVAALANI, 5=OTOGAR) */
    BAGLANTI_TIP_ID: number;
    HAT_NO: number;
    HAT_ADI: string;
    GUZERGAH_ACIKLAMA: string;
    ACIKLAMA: string;
    HAT_BASLANGIC: string;
    HAT_BITIS: string;
    /** Gidiş çalışma saati aralığı (örn: "06:00 - 23:00") */
    GIDIS_CALISMA_SAATI: string;
    /** Dönüş çalışma saati aralığı (örn: "06:35 - 23:40") */
    DONUS_CALISMA_SAATI: string;
}

/**
 * Durağa yaklaşan otobüs bilgisi
 */
export interface YaklasanOtobus {
    KalanDurakSayisi: number;
    HattinYonu: number;
    KoorY: number;
    BisikletAparatliMi: boolean;
    KoorX: number;
    EngelliMi: boolean;
    HatNumarasi: number;
    HatAdi: string;
    OtobusId: number;
}

/**
 * Hat otobüs konum bilgisi response
 */
export interface HatOtobusKonumlariResponse {
    HataMesaj: string;
    HatOtobusKonumlari: YaklasanOtobus[];
}

/**
 * CKAN datastore_search response tipi
 */
export interface CKANDatastoreResponse<T> {
    include_total: boolean;
    resource_id: string;
    fields: { type: string; id: string }[];
    records_format: string;
    records: T[];
    limit: number;
    total: number;
}

/**
 * CKAN dump response tipi (array formatında kayıtlar)
 */
export interface CKANDumpResponse {
    fields: { type: string; id: string; info?: { notes?: string; type_override?: string; label?: string } }[];
    records: (number | string | null)[][];
}

export function eshot(client: IzmirClient) {
    return {
        /**
         * ESHOT hatlarının listesini içeren web servisi (CSV).
         * Tüm hat verilerini tek seferde döndürür (~441 hat).
         *
         * Kaynak: https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-hatlari.csv
         */
        getHatlar(): Promise<EshotHat[]> {
            return client.getCSV<EshotHat>(
                'https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-hatlari.csv'
            );
        },

        /**
         * ESHOT otobüs hareket saatlerini içeren web servisi (CSV).
         * Tüm hareket saati verilerini tek seferde döndürür (~101,000+ kayıt).
         *
         * Kaynak: https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-hareketsaatleri.csv
         */
        getHareketSaatleri(): Promise<EshotHareketSaati[]> {
            return client.getCSV<EshotHareketSaati>(
                'https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-hareketsaatleri.csv'
            );
        },

        /**
         * ESHOT otobüs duraklarının listesini içeren web servisi (CSV).
         * Tüm durak verilerini tek seferde döndürür (~11,770 durak).
         *
         * Kaynak: https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-duraklari.csv
         */
        getDuraklar(): Promise<EshotDurakCSV[]> {
            return client.getCSV<EshotDurakCSV>(
                'https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-duraklari.csv'
            );
        },

        /**
         * ESHOT hat güzergahlarını içeren web servisi (CSV).
         * Her hat için gidiş (YON=1) ve dönüş (YON=2) koordinat noktalarını içerir.
         * Tüm güzergah verilerini tek seferde döndürür (~560,000+ nokta).
         *
         * Kaynak: https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-hat-guzergahlari.csv
         */
        getHatGuzergahlari(): Promise<EshotHatGuzergah[]> {
            return client.getCSV<EshotHatGuzergah>(
                'https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-hat-guzergahlari.csv'
            );
        },

        /**
         * Otobüs hatlarının diğer ulaşım araçları ile bağlantı tiplerini içeren web servisi (CSV).
         * Metro, İzban, Vapur, Havaalanı, Otogar gibi bağlantı tiplerini listeler.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/otobus-hatlarinin-diger-ulasim-araclari-ile-baglanti-tipleri
         */
        getBaglantiTipleri(): Promise<EshotBaglantiTipi[]> {
            return client.getCSV<EshotBaglantiTipi>(
                'https://acikveri.bizizmir.com/dataset/f0964595-53e0-4b94-bf11-9423f8bb595e/resource/c228da75-adfd-422a-a480-2a4c7ffa7586/download/eshot-otobus-baglanti-tipleri.csv'
            );
        },

        /**
         * Diğer ulaşım araçları ile bağlantılı otobüs hatlarının listesini içeren web servisi (CSV).
         * Her hattın hangi ulaşım aracına bağlantılı olduğunu ve çalışma saatlerini gösterir (~583 kayıt).
         *
         * Kaynak: https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-baglantili-hatlar.csv
         */
        getBaglantiHatlari(): Promise<EshotBaglantiHat[]> {
            return client.getCSV<EshotBaglantiHat>(
                'https://openfiles.izmir.bel.tr/211488/docs/eshot-otobus-baglantili-hatlar.csv'
            );
        },

        /**
         * ESHOT duraklarının konum, isim ve diğer bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/eshot-duraklari
         */
        getYakinDurakList(enlem: number, boylam: number) {
            return client.get(`ibb/cbs/noktayayakinduraklar?x=${enlem}&y=${boylam}`) as Promise<OnemliYerWrapper<EshotDurak>>;
        },

        /**
         * Bir durağa yaklaşan otobüslerin listesi, konumu ve diğer bilgilerini içeren web servisi.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/iztek/duragayaklasanotobusler/{durakId}
         * @param durakId Durak numarası (ESHOT durak listesinden alınabilir)
         */
        getDuragaYaklasanOtobusList(durakId: number) {
            return client.get(`iztek/duragayaklasanotobusler/${durakId}`) as Promise<YaklasanOtobus[]>;
        },

        /**
         * Bir hattın belirli bir durağa yaklaşan otobüslerinin konum ve diğer bilgilerini içeren web servisi.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/iztek/hattinyaklasanotobusleri/{hatId}/{durakId}
         * @param hatId Hat numarası
         * @param durakId Durak numarası
         */
        getHattinYaklasanOtobusleri(hatId: number, durakId: number) {
            return client.get(`iztek/hattinyaklasanotobusleri/${hatId}/${durakId}`) as Promise<YaklasanOtobus[]>;
        },

        /**
         * Numarası girilen hatta ait otobüslerin anlık konum bilgilerini içeren web servisi.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/iztek/hatotobuskonumlari/{hatId}
         * @param hatId Hat numarası
         */
        getHatOtobusKonumlari(hatId: number) {
            return client.get(`iztek/hatotobuskonumlari/${hatId}`) as Promise<HatOtobusKonumlariResponse>;
        },

        /**
         * ESHOT duraklarının sıralı listesini çeken web servisi.
         *
         * Belirli bir hat numarası ve yön için durak listesini sıralı olarak döndürür.
         * Gidiş için 0, dönüş için 1 değeri kullanılmalıdır.
         *
         * Kaynak: https://www.eshot.gov.tr/tr/UlasimSaatleri/{hatNo}/288
         * @param hatNo Hat numarası (ör: '390')
         * @param yon 0: Gidiş, 1: Dönüş
         * @returns Sıralı durak listesi [{hatNo, yon, durakAdi, sira}]
         */
        async scrapEshotSiraliDurakListesi(hatNo: string, yon: 0 | 1): Promise<EshotSiraliDurak[]> {
            const url = `https://www.eshot.gov.tr/tr/UlasimSaatleri/${hatNo}/288`;
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                    },
                    body: new URLSearchParams({ 'hatYon': yon.toString() })
                });
                if (!response.ok) {
                    throw new Error(`HTTP hata kodu: ${response.status}`);
                }
                const html = await response.text();
                const $ = cheerio.load(html);
                let stops: string[] = [];
                $('.block-transfer').each((_, block) => {
                    const ul = $(block).find('ul.transfer');
                    if (ul.length > 0) {
                        stops = ul.find('li.ring')
                            .map((_, li) => $(li).text().trim())
                            .get();
                        if (stops.length > 0) return false;
                    }
                });
                return stops.map((durakAdi, idx) => ({
                    hatNo,
                    yon,
                    durakAdi,
                    sira: idx + 1
                }));
            } catch (error) {
                console.error(`ESHOT durakları çekilirken hata oluştu:`, error);
                return [];
            }
        }
    };
}

export interface EshotSiraliDurak {
    hatNo: string;
    yon: 0 | 1;
    durakAdi: string;
    sira: number;
}
