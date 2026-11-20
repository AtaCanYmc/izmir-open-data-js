import { IzmirClient } from "../client.js";

export interface Eczane {
    EczaneId?: number;
    Adi: string;
    Telefon: string;
    Adres: string;
    IlceId?: number;
    Bolge: string;
    BolgeId?: number;
    BolgeAciklama?: string;
    LokasyonX: string; // Enlem (Latitude)
    LokasyonY: string; // Boylam (Longitude)
    Tarih?: string;
    UzaklikMetre?: number;
}

export function eczaneler(client: IzmirClient) {
    return {
        /**
         * Nöbetçi eczanelerin bilgilerini içeren web servisi.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/nobetcieczaneler
         */
        getNobetciList() {
            return client.get<Eczane[]>("ibb/nobetcieczaneler");
        },

        /**
         * Eczanelerin bilgilerini içeren web servisi.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/eczaneler
         */
        getList() {
            return client.get<Eczane[]>("ibb/eczaneler");
        },
    };
}
