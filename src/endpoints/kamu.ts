import { IzmirClient } from "../client";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";

// Kamu kurumu için interface
export interface KamuKurumu extends DefaultOnemliYer {}

export function kamu(client: IzmirClient) {
    return {
        /**
         * Bankalar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/bankalar
         */
        getBankalarList() {
            return client.get("ibb/cbs/bankalar") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Belediye ve birimler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/belediyeler
         */
        getBelediyelerList() {
            return client.get("ibb/cbs/belediyeler") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Bölge müdürlükleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/bolgemudurlukleri
         */
        getBolgeMudurlukleriList() {
            return client.get("ibb/cbs/bolgemudurlukleri") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Defterdarlık konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/defterdarliklar
         */
        getDefterdarliklarList() {
            return client.get("ibb/cbs/defterdarliklar") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Dernekler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/dernekler
         */
        getDerneklerList() {
            return client.get("ibb/cbs/dernekler") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Evlendirme daireleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/evlendirmedaireleri
         */
        getEvlendirmeDaireleriList() {
            return client.get("ibb/cbs/evlendirmedaireleri") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * İl ve ilçe müdürlükleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ilveilcemudurlukleri
         */
        getIlIlceMudurlukleriList() {
            return client.get("ibb/cbs/ilveilcemudurlukleri") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * İtfaiye grupları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/itfaiyegruplari
         */
        getItfaiyeGruplariList() {
            return client.get("ibb/cbs/itfaiyegruplari") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Konsolosluklar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/konsolosluklar
         */
        getKonsolosluklarList() {
            return client.get("ibb/cbs/konsolosluklar") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Meslek odaları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/meslekodalari
         */
        getMeslekOdalariList() {
            return client.get("ibb/cbs/meslekodalari") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Noterler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/noterler
         */
        getNoterlerList() {
            return client.get("ibb/cbs/noterler") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Nüfus müdürlükleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/nufusmudurlukleri
         */
        getNufusMudurlukleriList() {
            return client.get("ibb/cbs/nufusmudurlukleri") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * PTT (Posta ve Telgraf Teşkilatı) konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ptt
         */
        getPttList() {
            return client.get("ibb/cbs/ptt") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Turizm danışma müdürlükleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/turizmdanisma
         */
        getTurizmDanismaList() {
            return client.get("ibb/cbs/turizmdanisma") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Vergi daireleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/vergidaireleri
         */
        getVergiDaireleriList() {
            return client.get("ibb/cbs/vergidaireleri") as Promise<OnemliYerWrapper<KamuKurumu>>;
        },

        /**
         * Maskematik istasyon noktaları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/maskematiknoktalari
         */
        getMaskematikNoktalariList() {
            return client.get("ibb/cbs/maskematiknoktalari") as Promise<OnemliYerWrapper<KamuKurumu>>;
        }
    };
}

