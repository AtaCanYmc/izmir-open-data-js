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
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/engelliokullari");
        },

        /**
         * Anaokulu konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/anaokullari
         */
        getAnaokullarList() {
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/anaokullari");
        },

        /**
         * Etüt eğitim merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/etutmerkezleri
         */
        getEtutMerkezleriList() {
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/etutmerkezleri");
        },

        /**
         * Halk eğitim merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/halkegitim
         */
        getHalkEgitimList() {
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/halkegitim");
        },

        /**
         * İlkokullar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ilkokullar
         */
        getIlkokullarList() {
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/ilkokullar");
        },

        /**
         * Kolejler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/kolejler
         */
        getKolejlerList() {
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/kolejler");
        },

        /**
         * Liseler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/liseler
         */
        getLiselerList() {
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/liseler");
        },

        /**
         * Meslek liseleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/meslekliseleri
         */
        getMeslekLiseleriList() {
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/meslekliseleri");
        },

        /**
         * Ortaokullar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ortaokullar
         */
        getOrtaokullarList() {
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/ortaokullar");
        },

        /**
         * Sanat okulları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/sanatokullari
         */
        getSanatOkullariList() {
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/sanatokullari");
        },

        /**
         * Üniversiteler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/universiteler
         */
        getUniversitelerList() {
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/universiteler");
        },

        /**
         * Milli eğitim müdürlükleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/milliegitim
         */
        getMilliEgitimList() {
            return client.get<OnemliYerWrapper<EgitimKurumu>>("ibb/cbs/milliegitim");
        },
    };
}
