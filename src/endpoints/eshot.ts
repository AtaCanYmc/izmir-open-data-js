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

export function eshot(client: IzmirClient) {
    return {
        /**
         * ESHOT hatlarının listesini içeren web servisi (CKAN).
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/eshot-hat-bilgileri
         * @param limit Döndürülecek kayıt sayısı (varsayılan: 100)
         * @param offset Atlanacak kayıt sayısı (sayfalama için)
         */
        getHatlar(limit = 100, offset = 0) {
            return client.getCKAN<CKANDatastoreResponse<EshotHat>>('datastore_search', {
                resource_id: 'bd6c84f8-49ba-4cf4-81f8-81a0fbb5caa3',
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
