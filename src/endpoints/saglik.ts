import { IzmirClient } from "../client";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";

// Sağlık kurumları için interface
export interface SaglikKurumu extends DefaultOnemliYer {}

export function saglik(client: IzmirClient) {
    return {
        /**
         * Acil yardım istasyonları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/acilyardimistasyonu
         */
        getAcilYardimIstasyonlariList() {
            return client.get("ibb/cbs/acilyardimistasyonu") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Aile sağlığı merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/ailesagligimerkezleri
         */
        getAileSagligiMerkezleriList() {
            return client.get("ibb/cbs/ailesagligimerkezleri") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Ağız ve diş sağlığı merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/agizvedissagligimerkezleri
         */
        getAgizDisSagligiMerkezleriList() {
            return client.get("ibb/cbs/agizvedissagligimerkezleri") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Ana çocuk sağlığı merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/anacocuksagligimerkezleri
         */
        getAnaCocukSagligiMerkezleriList() {
            return client.get("ibb/cbs/anacocuksagligimerkezleri") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Dal merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/dalmerkezleri
         */
        getDalMerkezleriList() {
            return client.get("ibb/cbs/dalmerkezleri") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Hastaneler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/hastaneler
         */
        getHastanelerList() {
            return client.get("ibb/cbs/hastaneler") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Kan merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/kanmerkezleri
         */
        getKanMerkezleriList() {
            return client.get("ibb/cbs/kanmerkezleri") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Laboratuvarlar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/laboratuvarlar
         */
        getLaboratuvarlarList() {
            return client.get("ibb/cbs/laboratuvarlar") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Poliklinikler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/poliklinikler
         */
        getPolikliniklerList() {
            return client.get("ibb/cbs/poliklinikler") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Tıp merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/tipmerkezleri
         */
        getTipMerkezleriList() {
            return client.get("ibb/cbs/tipmerkezleri") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Toplum sağlığı merkezleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/toplumsakligimerkezleri
         */
        getToplumSagligiMerkezleriList() {
            return client.get("ibb/cbs/toplumsagligimerkezleri") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Verem savaş dispanserleri konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/veremsavasdispanserleri
         */
        getVeremSavasDispanserleriList() {
            return client.get("ibb/cbs/veremsavasdispanserleri") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        },

        /**
         * Veterinerlikler konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/veterinerlikler
         */
        getVeterinerliklerList() {
            return client.get("ibb/cbs/veterinerlikler") as Promise<OnemliYerWrapper<SaglikKurumu>>;
        }
    };
}

