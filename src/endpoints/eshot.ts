import {IzmirClient} from "../client";
import {DefaultOnemliYer, OnemliYerWrapper} from "../common/types/onemliYer";

export interface EshotDurak extends DefaultOnemliYer {}

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

export function eshot(client: IzmirClient) {
    return {
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
