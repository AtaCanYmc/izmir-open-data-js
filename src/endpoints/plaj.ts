import { IzmirClient } from "../client";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";

// Plaj bilgisi için interface
export interface Plaj extends DefaultOnemliYer {}

export function plaj(client: IzmirClient) {
    return {
        /**
         * Plajlar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/plajlar
         */
        getPlajlarList() {
            return client.get("ibb/cbs/plajlar") as Promise<OnemliYerWrapper<Plaj>>;
        },

        /**
         * Hamamlar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/hamamlar
         */
        getHamamlarList() {
            return client.get("ibb/cbs/hamamlar") as Promise<OnemliYerWrapper<Plaj>>;
        },

        /**
         * Kaplıcalar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/kaplicalar
         */
        getKaplicalarList() {
            return client.get("ibb/cbs/kaplicalar") as Promise<OnemliYerWrapper<Plaj>>;
        },

        /**
         * Fuar alanları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/fuar
         */
        getFuarList() {
            return client.get("ibb/cbs/fuar") as Promise<OnemliYerWrapper<Plaj>>;
        }
    };
}

