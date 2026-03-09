import { IzmirClient } from "../client";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";

// Ulaşım noktası için interface
export interface UlasimNoktasi extends DefaultOnemliYer {}

export function tren(client: IzmirClient) {
    return {
        /**
         * Tren garları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/trengarlari
         */
        getTrenGarlariList() {
            return client.get("ibb/cbs/trengarlari") as Promise<OnemliYerWrapper<UlasimNoktasi>>;
        },

        /**
         * Havaalanı konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/havaalani
         */
        getHavaalaniList() {
            return client.get("ibb/cbs/havaalani") as Promise<OnemliYerWrapper<UlasimNoktasi>>;
        },

        /**
         * Şehirlerarası otobüs terminalleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/otobusterminalleri
         */
        getOtobusTerminalleriList() {
            return client.get("ibb/cbs/otobusterminalleri") as Promise<OnemliYerWrapper<UlasimNoktasi>>;
        },

        /**
         * Araç muayene istasyonları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/aracmuayeneistasyonlari
         */
        getAracMuayeneIstasyonlariList() {
            return client.get("ibb/cbs/aracmuayeneistasyonlari") as Promise<OnemliYerWrapper<UlasimNoktasi>>;
        }
    };
}

