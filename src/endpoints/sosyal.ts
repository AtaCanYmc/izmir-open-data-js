import { IzmirClient } from "../client.js";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer.js";

// Sosyal hizmet merkezi için interface
export interface SosyalHizmetMerkezi extends DefaultOnemliYer {}

export function sosyal(client: IzmirClient) {
    return {
        /**
         * Aile dayanışma merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ailedayanismamerkezleri
         */
        getAileDayanismaMerkezleriList() {
            return client.get<OnemliYerWrapper<SosyalHizmetMerkezi>>("ibb/cbs/ailedayanismamerkezleri");
        },

        /**
         * Çocuk ve gençlik merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/cocukvegenclikmerkezleri
         */
        getCocukGenclikMerkezleriList() {
            return client.get<OnemliYerWrapper<SosyalHizmetMerkezi>>("ibb/cbs/cocukvegenclikmerkezleri");
        },

        /**
         * Çocuk yuvaları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/cocukyuvalari
         */
        getCocukYuvalariList() {
            return client.get<OnemliYerWrapper<SosyalHizmetMerkezi>>("ibb/cbs/cocukyuvalari");
        },

        /**
         * Huzurevleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/huzurevleri
         */
        getHuzurevleriList() {
            return client.get<OnemliYerWrapper<SosyalHizmetMerkezi>>("ibb/cbs/huzurevleri");
        },

        /**
         * Toplum merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/toplummerkezleri
         */
        getToplumMerkezleriList() {
            return client.get<OnemliYerWrapper<SosyalHizmetMerkezi>>("ibb/cbs/toplummerkezleri");
        },

        /**
         * Yetiştirme yurtları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/yetistirmeyurtlari
         */
        getYetistirmeYurtlariList() {
            return client.get<OnemliYerWrapper<SosyalHizmetMerkezi>>("ibb/cbs/yetistirmeyurtlari");
        },
    };
}
