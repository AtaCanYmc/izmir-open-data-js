import { IzmirClient } from "../client";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";

// Eğitim kurumları için interface
export interface EgitimKurumu extends DefaultOnemliYer {}

export function egitim(client: IzmirClient) {
    return {
        /**
         * Engelliler okulu konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/engelliokullari
         */
        getEngelliOkullariList() {
            return client.get("ibb/cbs/engelliokullari") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        },

        /**
         * Anaokulu konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/anaokullari
         */
        getAnaokullarList() {
            return client.get("ibb/cbs/anaokullari") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        },

        /**
         * Etüt eğitim merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/etutmerkezleri
         */
        getEtutMerkezleriList() {
            return client.get("ibb/cbs/etutmerkezleri") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        },

        /**
         * Halk eğitim merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/halkegitim
         */
        getHalkEgitimList() {
            return client.get("ibb/cbs/halkegitim") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        },

        /**
         * İlkokullar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ilkokullar
         */
        getIlkokullarList() {
            return client.get("ibb/cbs/ilkokullar") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        },

        /**
         * Kolejler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/kolejler
         */
        getKolejlerList() {
            return client.get("ibb/cbs/kolejler") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        },

        /**
         * Liseler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/liseler
         */
        getLiselerList() {
            return client.get("ibb/cbs/liseler") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        },

        /**
         * Meslek liseleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/meslekliseleri
         */
        getMeslekLiseleriList() {
            return client.get("ibb/cbs/meslekliseleri") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        },

        /**
         * Ortaokullar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ortaokullar
         */
        getOrtaokullarList() {
            return client.get("ibb/cbs/ortaokullar") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        },

        /**
         * Sanat okulları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/sanatokullari
         */
        getSanatOkullariList() {
            return client.get("ibb/cbs/sanatokullari") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        },

        /**
         * Üniversiteler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/universiteler
         */
        getUniversitelerList() {
            return client.get("ibb/cbs/universiteler") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        },

        /**
         * Milli eğitim müdürlükleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/milliegitim
         */
        getMilliEgitimList() {
            return client.get("ibb/cbs/milliegitim") as Promise<OnemliYerWrapper<EgitimKurumu>>;
        }
    };
}

