import { IzmirClient } from "../client";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";

// Kültür mekanları için interface
export interface KulturMekani extends DefaultOnemliYer {}

export function kutuphane(client: IzmirClient) {
    return {
        /**
         * Kütüphaneler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/kutuphaneler
         */
        getKutuphanelerList() {
            return client.get("ibb/cbs/kutuphaneler") as Promise<OnemliYerWrapper<KulturMekani>>;
        },

        /**
         * Kültür merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/kulturmerkezleri
         */
        getKulturMerkezleriList() {
            return client.get("ibb/cbs/kulturmerkezleri") as Promise<OnemliYerWrapper<KulturMekani>>;
        },

        /**
         * Opera ve bale konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/operavebale
         */
        getOperaVeBaleList() {
            return client.get("ibb/cbs/operavebale") as Promise<OnemliYerWrapper<KulturMekani>>;
        },

        /**
         * Sanat galerisi ve sergi salonları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/galerivesalonlar
         */
        getGaleriVeSalonlarList() {
            return client.get("ibb/cbs/galerivesalonlar") as Promise<OnemliYerWrapper<KulturMekani>>;
        },

        /**
         * Senfoni orkestrası konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/senfoniorkestrasi
         */
        getSenfoniOrkestrasiList() {
            return client.get("ibb/cbs/senfoniorkestrasi") as Promise<OnemliYerWrapper<KulturMekani>>;
        },

        /**
         * Sinemalar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/sinemalar
         */
        getSinemalarList() {
            return client.get("ibb/cbs/sinemalar") as Promise<OnemliYerWrapper<KulturMekani>>;
        },

        /**
         * Tiyatrolar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/tiyatrolar
         */
        getTiyatrolarList() {
            return client.get("ibb/cbs/tiyatrolar") as Promise<OnemliYerWrapper<KulturMekani>>;
        },

        /**
         * Müzeler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/muzeler
         */
        getMuzelerList() {
            return client.get("ibb/cbs/muzeler") as Promise<OnemliYerWrapper<KulturMekani>>;
        }
    };
}

