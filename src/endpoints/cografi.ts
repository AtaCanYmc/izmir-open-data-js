import { IzmirClient } from "../client";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";

// Coğrafi özellikler için interface
export interface CografiYer extends DefaultOnemliYer {}

export function cografi(client: IzmirClient) {
    return {
        /**
         * Ada ve yarımada konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/adayarimada
         */
        getAdaYarimadaList() {
            return client.get("ibb/cbs/adayarimada") as Promise<OnemliYerWrapper<CografiYer>>;
        },

        /**
         * Burun konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/burunlar
         */
        getBurunlarList() {
            return client.get("ibb/cbs/burunlar") as Promise<OnemliYerWrapper<CografiYer>>;
        },

        /**
         * Dağ ve tepelerin konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/dagtepe
         */
        getDagTepeList() {
            return client.get("ibb/cbs/dagtepe") as Promise<OnemliYerWrapper<CografiYer>>;
        },

        /**
         * Göl konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/goller
         */
        getGollerList() {
            return client.get("ibb/cbs/goller") as Promise<OnemliYerWrapper<CografiYer>>;
        },

        /**
         * Körfez ve koyların konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/korfezvekoylar
         */
        getKorfezKoylarList() {
            return client.get("ibb/cbs/korfezvekoylar") as Promise<OnemliYerWrapper<CografiYer>>;
        },

        /**
         * Nehir ve çayların konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/nehirvecaylar
         */
        getNehirCaylarList() {
            return client.get("ibb/cbs/nehirvecaylar") as Promise<OnemliYerWrapper<CografiYer>>;
        },

        /**
         * Ormanların konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ormanlar
         */
        getOrmanlarList() {
            return client.get("ibb/cbs/ormanlar") as Promise<OnemliYerWrapper<CografiYer>>;
        },

        /**
         * Meydanların konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/meydanlar
         */
        getMeydanlarList() {
            return client.get("ibb/cbs/meydanlar") as Promise<OnemliYerWrapper<CografiYer>>;
        }
    };
}

