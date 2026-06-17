import { IzmirClient } from "../client.js";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer.js";

// Sağlık kurumları için interface
export interface SaglikKurumu extends DefaultOnemliYer {}

export function saglik(client: IzmirClient) {
    return {
        /**
         * Acil yardım istasyonları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/acilyardimistasyonu
         */
        getAcilYardimIstasyonlariList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/acilyardimistasyonu");
        },

        /**
         * Aile sağlığı merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ailesagligimerkezleri
         */
        getAileSagligiMerkezleriList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/ailesagligimerkezleri");
        },

        /**
         * Ağız ve diş sağlığı merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/agizvedissagligimerkezleri
         */
        getAgizDisSagligiMerkezleriList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/agizvedissagligimerkezleri");
        },

        /**
         * Ana çocuk sağlığı merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/anacocuksagligimerkezleri
         */
        getAnaCocukSagligiMerkezleriList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/anacocuksagligimerkezleri");
        },

        /**
         * Dal merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/dalmerkezleri
         */
        getDalMerkezleriList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/dalmerkezleri");
        },

        /**
         * Hastaneler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/hastaneler
         */
        getHastanelerList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/hastaneler");
        },

        /**
         * Kan merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/kanmerkezleri
         */
        getKanMerkezleriList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/kanmerkezleri");
        },

        /**
         * Laboratuvarlar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/laboratuvarlar
         */
        getLaboratuvarlarList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/laboratuvarlar");
        },

        /**
         * Poliklinikler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/poliklinikler
         */
        getPolikliniklerList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/poliklinikler");
        },

        /**
         * Tıp merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/tipmerkezleri
         */
        getTipMerkezleriList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/tipmerkezleri");
        },

        /**
         * Toplum sağlığı merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/toplumsakligimerkezleri
         */
        getToplumSagligiMerkezleriList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/toplumsagligimerkezleri");
        },

        /**
         * Verem savaş dispanserleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/veremsavasdispanserleri
         */
        getVeremSavasDispanserleriList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/veremsavasdispanserleri");
        },

        /**
         * Veterinerlikler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/veterinerlikler
         */
        getVeterinerliklerList() {
            return client.get<OnemliYerWrapper<SaglikKurumu>>("ibb/cbs/veterinerlikler");
        },
    };
}
