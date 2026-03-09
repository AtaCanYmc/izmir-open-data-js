import { IzmirClient } from "../client";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";

// Sosyal hizmet merkezi için interface
export interface SosyalHizmetMerkezi extends DefaultOnemliYer {}

export function sosyal(client: IzmirClient) {
    return {
        /**
         * Aile dayanışma merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ailedayanismamerkezleri
         */
        getAileDayanismaMerkezleriList() {
            return client.get("ibb/cbs/ailedayanismamerkezleri") as Promise<OnemliYerWrapper<SosyalHizmetMerkezi>>;
        },

        /**
         * Çocuk ve gençlik merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/cocukvegenclikmerkezleri
         */
        getCocukGenclikMerkezleriList() {
            return client.get("ibb/cbs/cocukvegenclikmerkezleri") as Promise<OnemliYerWrapper<SosyalHizmetMerkezi>>;
        },

        /**
         * Çocuk yuvaları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/cocukyuvalari
         */
        getCocukYuvalariList() {
            return client.get("ibb/cbs/cocukyuvalari") as Promise<OnemliYerWrapper<SosyalHizmetMerkezi>>;
        },

        /**
         * Huzurevleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/huzurevleri
         */
        getHuzurevleriList() {
            return client.get("ibb/cbs/huzurevleri") as Promise<OnemliYerWrapper<SosyalHizmetMerkezi>>;
        },

        /**
         * Toplum merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/toplummerkezleri
         */
        getToplumMerkezleriList() {
            return client.get("ibb/cbs/toplummerkezleri") as Promise<OnemliYerWrapper<SosyalHizmetMerkezi>>;
        },

        /**
         * Yetiştirme yurtları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/yetistirmeyurtlari
         */
        getYetistirmeYurtlariList() {
            return client.get("ibb/cbs/yetistirmeyurtlari") as Promise<OnemliYerWrapper<SosyalHizmetMerkezi>>;
        }
    };
}

