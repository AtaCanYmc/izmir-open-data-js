import { IzmirClient } from "../client.js";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer.js";

// Kültür mekanları için interface
export interface KulturMekani extends DefaultOnemliYer {}

export function kutuphane(client: IzmirClient) {
    return {
        /**
         * Kütüphaneler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/kutuphaneler
         */
        getKutuphanelerList() {
            return client.get<OnemliYerWrapper<KulturMekani>>("ibb/cbs/kutuphaneler");
        },

        /**
         * Kültür merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/kulturmerkezleri
         */
        getKulturMerkezleriList() {
            return client.get<OnemliYerWrapper<KulturMekani>>("ibb/cbs/kulturmerkezleri");
        },

        /**
         * Opera ve bale konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/operavebale
         */
        getOperaVeBaleList() {
            return client.get<OnemliYerWrapper<KulturMekani>>("ibb/cbs/operavebale");
        },

        /**
         * Sanat galerisi ve sergi salonları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/galerivesalonlar
         */
        getGaleriVeSalonlarList() {
            return client.get<OnemliYerWrapper<KulturMekani>>("ibb/cbs/galerivesalonlar");
        },

        /**
         * Senfoni orkestrası konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/senfoniorkestrasi
         */
        getSenfoniOrkestrasiList() {
            return client.get<OnemliYerWrapper<KulturMekani>>("ibb/cbs/senfoniorkestrasi");
        },

        /**
         * Sinemalar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/sinemalar
         */
        getSinemalarList() {
            return client.get<OnemliYerWrapper<KulturMekani>>("ibb/cbs/sinemalar");
        },

        /**
         * Tiyatrolar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/tiyatrolar
         */
        getTiyatrolarList() {
            return client.get<OnemliYerWrapper<KulturMekani>>("ibb/cbs/tiyatrolar");
        },

        /**
         * Müzeler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/muzeler
         */
        getMuzelerList() {
            return client.get<OnemliYerWrapper<KulturMekani>>("ibb/cbs/muzeler");
        },
    };
}
