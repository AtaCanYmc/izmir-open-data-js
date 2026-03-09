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
            return client.get("ibb/cbs/antikkentler") as Promise<OnemliYerWrapper<TarihiYapi>>;
        },

        /**
         * Antik kent yapıları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/antikkentyapilari
         */
        getAntikKentYapilariList() {
            return client.get("ibb/cbs/antikkentyapilari") as Promise<OnemliYerWrapper<TarihiYapi>>;
        },

        /**
         * Köşk ve konaklar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/koskvekonaklar
         */
        getKoskVeKonaklarList() {
            return client.get("ibb/cbs/koskvekonaklar") as Promise<OnemliYerWrapper<TarihiYapi>>;
        },

        /**
         * Kule, anıt ve heykeller konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/kuleanitveheykeller
         */
        getKuleAnitHeykellerList() {
            return client.get("ibb/cbs/kuleanitveheykeller") as Promise<OnemliYerWrapper<TarihiYapi>>;
        },

        /**
         * Tarihi çarşı ve hanlar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/tarihicarsivehanlar
         */
        getTarihiCarsiHanlarList() {
            return client.get("ibb/cbs/tarihicarsivehanlar") as Promise<OnemliYerWrapper<TarihiYapi>>;
        },

        /**
         * Tarihi su yapıları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/tarihisuyapilari
         */
        getTarihiSuYapilariList() {
            return client.get("ibb/cbs/tarihisuyapilari") as Promise<OnemliYerWrapper<TarihiYapi>>;
        },

        /**
         * Tarihi yapılar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/tarihiyapilar
         */
        getTarihiYapilarList() {
            return client.get("ibb/cbs/tarihiyapilar") as Promise<OnemliYerWrapper<TarihiYapi>>;
        }
    };
}

