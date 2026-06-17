import { IzmirClient } from "../client";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";

// Tarihi yapılar için interface
export interface TarihiYapi extends DefaultOnemliYer {}

export function tarihi(client: IzmirClient) {
    return {
        /**
         * Antik kentler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/antikkentler
         */
        getAntikKentlerList() {
            return client.get<OnemliYerWrapper<TarihiYapi>>("ibb/cbs/antikkentler");
        },

        /**
         * Antik kent yapıları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/antikkentyapilari
         */
        getAntikKentYapilariList() {
            return client.get<OnemliYerWrapper<TarihiYapi>>("ibb/cbs/antikkentyapilari");
        },

        /**
         * Köşk ve konaklar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/koskvekonaklar
         */
        getKoskVeKonaklarList() {
            return client.get<OnemliYerWrapper<TarihiYapi>>("ibb/cbs/koskvekonaklar");
        },

        /**
         * Kule, anıt ve heykeller konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/kuleanitveheykeller
         */
        getKuleAnitHeykellerList() {
            return client.get<OnemliYerWrapper<TarihiYapi>>("ibb/cbs/kuleanitveheykeller");
        },

        /**
         * Tarihi çarşı ve hanlar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/tarihicarsivehanlar
         */
        getTarihiCarsiHanlarList() {
            return client.get<OnemliYerWrapper<TarihiYapi>>("ibb/cbs/tarihicarsivehanlar");
        },

        /**
         * Tarihi su yapıları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/tarihisuyapilari
         */
        getTarihiSuYapilariList() {
            return client.get<OnemliYerWrapper<TarihiYapi>>("ibb/cbs/tarihisuyapilari");
        },

        /**
         * Tarihi yapılar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/tarihiyapilar
         */
        getTarihiYapilarList() {
            return client.get<OnemliYerWrapper<TarihiYapi>>("ibb/cbs/tarihiyapilar");
        },
    };
}
