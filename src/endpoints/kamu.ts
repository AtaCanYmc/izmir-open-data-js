import { IzmirClient } from "../client.js";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer.js";

// Kamu kurumu için interface
export interface KamuKurumu extends DefaultOnemliYer {}

export function kamu(client: IzmirClient) {
    return {
        /**
         * Bankalar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/bankalar
         */
        getBankalarList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/bankalar");
        },

        /**
         * Belediye ve birimler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/belediyeler
         */
        getBelediyelerList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/belediyeler");
        },

        /**
         * Bölge müdürlükleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/bolgemudurlukleri
         */
        getBolgeMudurlukleriList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/bolgemudurlukleri");
        },

        /**
         * Defterdarlık konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/defterdarliklar
         */
        getDefterdarliklarList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/defterdarliklar");
        },

        /**
         * Dernekler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/dernekler
         */
        getDerneklerList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/dernekler");
        },

        /**
         * Evlendirme daireleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/evlendirmedaireleri
         */
        getEvlendirmeDaireleriList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/evlendirmedaireleri");
        },

        /**
         * İl ve ilçe müdürlükleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ilveilcemudurlukleri
         */
        getIlIlceMudurlukleriList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/ilveilcemudurlukleri");
        },

        /**
         * İtfaiye grupları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/itfaiyegruplari
         */
        getItfaiyeGruplariList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/itfaiyegruplari");
        },

        /**
         * Konsolosluklar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/konsolosluklar
         */
        getKonsolosluklarList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/konsolosluklar");
        },

        /**
         * Meslek odaları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/meslekodalari
         */
        getMeslekOdalariList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/meslekodalari");
        },

        /**
         * Noterler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/noterler
         */
        getNoterlerList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/noterler");
        },

        /**
         * Nüfus müdürlükleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/nufusmudurlukleri
         */
        getNufusMudurlukleriList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/nufusmudurlukleri");
        },

        /**
         * PTT (Posta ve Telgraf Teşkilatı) konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ptt
         */
        getPttList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/ptt");
        },

        /**
         * Turizm danışma müdürlükleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/turizmdanisma
         */
        getTurizmDanismaList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/turizmdanisma");
        },

        /**
         * Vergi daireleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/vergidaireleri
         */
        getVergiDaireleriList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/vergidaireleri");
        },

        /**
         * Maskematik istasyon noktaları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/maskematiknoktalari
         */
        getMaskematikNoktalariList() {
            return client.get<OnemliYerWrapper<KamuKurumu>>("ibb/cbs/maskematiknoktalari");
        },
    };
}
