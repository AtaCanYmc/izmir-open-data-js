import {IzmirClient} from "../client";

export interface Eczane {
    Adi: string;
    Telefon: string;
    Adres: string;
    Bolge: string;
    BolgeAciklama: string;
    LokasyonX: string; // "38.425790" (Aslında Enlem/Latitude)
    LokasyonY: string; // "27.196936" (Aslında Boylam/Longitude)
    Tarih: string;
}

export function eczaneler(client: IzmirClient) {
    return {
        /**
         * Nöbetçi eczanelerin bilgilerini içeren web servisi.
         * Kaynak: https://acikveri.bizizmir.com/dataset/nobetci-eczaneler-ve-eczane-listesi
         */
        getNobetciList() {
            return client.get("ibb/nobetcieczaneler") as Promise<Eczane[]>;
        },

        /**
         * Eczanelerin bilgilerini içeren web servisi.
         * Kaynak: https://acikveri.bizizmir.com/dataset/nobetci-eczaneler-ve-eczane-listesi
         */
        getList() {
            return client.get("ibb/eczaneler") as Promise<Eczane[]>;
        }
    };
}
