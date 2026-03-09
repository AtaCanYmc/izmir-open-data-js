import { IzmirClient } from "../client";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";

// Spor tesisi için interface
export interface SporTesisi extends DefaultOnemliYer {}

/**
 * Spor tesisleri endpoint'leri.
 * NOT: Bu endpoint'ler PDF dokümantasyonunda belirtilmiş ancak
 * API'de henüz aktif değil (404 dönüyor). İleride aktif olabilir.
 */
export function spor(client: IzmirClient) {
    return {
        /**
         * Hipodrom konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/hipodrom
         * @deprecated API'de henüz aktif değil
         */
        getHipodromList() {
            return client.get("ibb/cbs/hipodrom") as Promise<OnemliYerWrapper<SporTesisi>>;
        },

        /**
         * Spor salonları ve sahaları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/sporsalonlari
         * @deprecated API'de henüz aktif değil
         */
        getSporSalonlariList() {
            return client.get("ibb/cbs/sporsalonlari") as Promise<OnemliYerWrapper<SporTesisi>>;
        },

        /**
         * Stadyumlar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/stadyumlar
         * @deprecated API'de henüz aktif değil
         */
        getStadyumlarList() {
            return client.get("ibb/cbs/stadyumlar") as Promise<OnemliYerWrapper<SporTesisi>>;
        }
    };
}

