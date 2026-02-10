import {IzmirClient} from "../client";
import {DefaultOnemliYer, OnemliYerWrapper} from "../common/types/onemliYer";
import {formatDate} from "../common/utils/dateUtils";

export interface PazarYerleri extends DefaultOnemliYer {}

export interface HalFiyat {
    OrtalamaUcret: number;
    MalAdi: string;
    Birim: string;
    AsgariUcret: number;
    AzamiUcret: number;
    MalId: number;
    tarih: string | null;
    HalTuru: number;
    MalTipId: number;
    MalTipAdi: string;
    Gorsel: string;
}

export interface HalFiyatResponse {
    BultenTarihi: string; // ISO date
    HalFiyatListesi: HalFiyat[];
}


export function pazarlar(client: IzmirClient) {
    return {
        /**
         * Semt pazar yerlerinin listesi, günleri ve konum bilgileri içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/semt-pazar-yerleri
         */
        getList() {
            return client.get("ibb/cbs/pazaryerleri") as Promise<OnemliYerWrapper<PazarYerleri>>;
        },

        /**
         * Balık hal fiyatlarını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/balik-hal-fiyatlari
         */
        getBalikHalFiyatlari(tarih: Date) {
            return client.get(`ibb/halfiyatlari/balik/${formatDate(tarih)}`) as Promise<HalFiyatResponse>;
        },

        /**
         * Sebze ve meyve hal fiyatlarını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/sebze-ve-meyve-hal-fiyatlari
         */
        getSebzeMeyveHalFiyatlari(tarih: Date) {
            return client.get(`ibb/halfiyatlari/sebzemeyve/${formatDate(tarih)}`) as Promise<HalFiyatResponse>;
        }
    };
}