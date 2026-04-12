import {IzmirClient} from "../client";
import {DefaultOnemliYer, OnemliYerWrapper} from "../common/types/onemliYer";

export interface EshotDurak extends DefaultOnemliYer {}

/**
 * ESHOT hat bilgisi (CKAN datasından)
 */
export interface EshotHat {
    _id: number;
    HAT_NO: number;
    HAT_ADI: string;
    GUZERGAH_ACIKLAMA: string;
    ACIKLAMA: string;
    HAT_BASLANGIC: string;
    HAT_BITIS: string;
}

/**
 * ESHOT otobüs hareket saati bilgisi (CKAN datasından)
 */
export interface EshotHareketSaati {
    _id: number;
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
 * ESHOT otobüs durağı bilgisi (CKAN datasından)
 */
export interface EshotDurakCKAN {
    _id: number;
    DURAK_ID: number;
    DURAK_ADI: string;
    ENLEM: number;
    BOYLAM: number;
    DURAKTAN_GECEN_HATLAR: string;
}

/**
 * ESHOT hat güzergah noktası bilgisi (CKAN datasından)
 */
export interface EshotHatGuzergah {
    _id: number;
    HAT_NO: number;
    /** Güzergah yönü: 1 = Gidiş, 2 = Dönüş */
    YON: number;
    BOYLAM: number;
    ENLEM: number;
}

/**
 * ESHOT bağlantı tipi bilgisi (CKAN datasından)
 * Otobüs hatlarının diğer ulaşım araçları ile bağlantı tipleri
 */
export interface EshotBaglantiTipi {
    _id: number;
    BAGLANTI_TIP_ID: number;
    /** Bağlantı tipi adı (METRO, IZBAN, VAPUR, TRAMVAY, vb.) */
    BAGLANTI_TIPI: string;
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
         * ESHOT hatlarının listesini içeren web servisi (CKAN Dump).
         * Tüm hat verilerini tek seferde döndürür.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/eshot-hat-bilgileri
         */
        getHatlar() {
            return client.getCKANDump<CKANDumpResponse>('bd6c84f8-49ba-4cf4-81f8-81a0fbb5caa3');
        },

        /**
         * ESHOT hatlarını nesne formatında döndürür.
         * Raw dump verisini EshotHat nesnelerine dönüştürür.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/eshot-hat-bilgileri
         */
        async getHatlarParsed(): Promise<EshotHat[]> {
            const dump = await client.getCKANDump<CKANDumpResponse>('bd6c84f8-49ba-4cf4-81f8-81a0fbb5caa3');
            return dump.records.map(record => ({
                _id: record[0] as number,
                HAT_NO: record[1] as number,
                HAT_ADI: record[2] as string,
                GUZERGAH_ACIKLAMA: record[3] as string,
                ACIKLAMA: record[4] as string,
                HAT_BASLANGIC: record[5] as string,
                HAT_BITIS: record[6] as string
            }));
        },

        /**
         * ESHOT otobüs hareket saatlerini içeren web servisi (CKAN).
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/eshot-otobus-hareket-saatleri
         * @param limit Döndürülecek kayıt sayısı (varsayılan: 100)
         * @param offset Atlanacak kayıt sayısı (sayfalama için)
         */
        getHareketSaatleri(limit = 100, offset = 0) {
            return client.getCKAN<CKANDatastoreResponse<EshotHareketSaati>>('datastore_search', {
                resource_id: 'c6fa6046-f755-47d7-b69e-db6bb06a8b5a',
                limit,
                offset
            });
        },

        /**
         * ESHOT otobüs duraklarının listesini içeren web servisi (CKAN Dump).
         * Tüm durak verilerini tek seferde döndürür.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/eshot-duraklari
         */
        getDuraklar() {
            return client.getCKANDump<CKANDumpResponse>('0c791266-a2e4-4f14-82b8-9a9b102fbf94');
        },

        /**
         * ESHOT otobüs duraklarını nesne formatında döndürür.
         * Raw dump verisini EshotDurakCKAN nesnelerine dönüştürür.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/eshot-duraklari
         */
        async getDurakalarParsed(): Promise<EshotDurakCKAN[]> {
            const dump = await client.getCKANDump<CKANDumpResponse>('0c791266-a2e4-4f14-82b8-9a9b102fbf94');
            return dump.records.map(record => ({
                _id: record[0] as number,
                DURAK_ID: record[1] as number,
                DURAK_ADI: record[2] as string,
                ENLEM: record[3] as number,
                BOYLAM: record[4] as number,
                DURAKTAN_GECEN_HATLAR: record[5] as string
            }));
        },

        /**
         * ESHOT hat güzergahlarını içeren web servisi (CKAN Dump).
         * Her hat için gidiş (YON=1) ve dönüş (YON=2) koordinat noktalarını içerir.
         * Tüm güzergah verilerini tek seferde döndürür.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/eshot-hat-guzergahlari
         */
        getHatGuzergahlari() {
            return client.getCKANDump<CKANDumpResponse>('543f2249-c734-48e4-8739-72efbbfc843c');
        },

        /**
         * ESHOT hat güzergahlarını nesne formatında döndürür.
         * Raw dump verisini EshotHatGuzergah nesnelerine dönüştürür.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/eshot-hat-guzergahlari
         */
        async getHatGuzergahlariParsed(): Promise<EshotHatGuzergah[]> {
            const dump = await client.getCKANDump<CKANDumpResponse>('543f2249-c734-48e4-8739-72efbbfc843c');
            return dump.records.map(record => ({
                _id: record[0] as number,
                HAT_NO: record[1] as number,
                YON: record[2] as number,
                BOYLAM: record[3] as number,
                ENLEM: record[4] as number
            }));
        },

        /**
         * Otobüs hatlarının diğer ulaşım araçları ile bağlantı tiplerini içeren web servisi (CKAN).
         * Metro, İzban, Vapur, Tramvay gibi bağlantı tiplerini listeler.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/otobus-hatlarinin-diger-ulasim-araclari-ile-baglanti-tipleri
         * @param limit Döndürülecek kayıt sayısı (varsayılan: 100)
         * @param offset Atlanacak kayıt sayısı (sayfalama için)
         */
        getBaglantiTipleri(limit = 100, offset = 0) {
            return client.getCKAN<CKANDatastoreResponse<EshotBaglantiTipi>>('datastore_search', {
                resource_id: 'c228da75-adfd-422a-a480-2a4c7ffa7586',
                limit,
                offset
            });
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
        }
    };
}
