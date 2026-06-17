import { IzmirClient } from "../client.js";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer.js";

// Coğrafi özellikler için interface
export interface CografiYer extends DefaultOnemliYer {}

export function cografi(client: IzmirClient) {
    return {
        /**
         * Ada ve yarımada konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/adayarimada
         */
        getAdaYarimadaList() {
            return client.get<OnemliYerWrapper<CografiYer>>("ibb/cbs/adayarimada");
        },

        /**
         * Burun konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/burunlar
         */
        getBurunlarList() {
            return client.get<OnemliYerWrapper<CografiYer>>("ibb/cbs/burunlar");
        },

        /**
         * Dağ ve tepelerin konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/dagtepe
         */
        getDagTepeList() {
            return client.get<OnemliYerWrapper<CografiYer>>("ibb/cbs/dagtepe");
        },

        /**
         * Göl konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/goller
         */
        getGollerList() {
            return client.get<OnemliYerWrapper<CografiYer>>("ibb/cbs/goller");
        },

        /**
         * Körfez ve koyların konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/korfezvekoylar
         */
        getKorfezKoylarList() {
            return client.get<OnemliYerWrapper<CografiYer>>("ibb/cbs/korfezvekoylar");
        },

        /**
         * Nehir ve çayların konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/nehirvecaylar
         */
        getNehirCaylarList() {
            return client.get<OnemliYerWrapper<CografiYer>>("ibb/cbs/nehirvecaylar");
        },

        /**
         * Ormanların konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ormanlar
         */
        getOrmanlarList() {
            return client.get<OnemliYerWrapper<CografiYer>>("ibb/cbs/ormanlar");
        },

        /**
         * Meydanların konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/meydanlar
         */
        getMeydanlarList() {
            return client.get<OnemliYerWrapper<CografiYer>>("ibb/cbs/meydanlar");
        },
    };
}
