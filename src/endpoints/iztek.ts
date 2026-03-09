import { IzmirClient } from "../client";

/**
 * Askıda İzmirim Kart istatistik bilgileri
 */
export interface AskidaIzmirimKartIstatistik {
    AskidaBekleyenKart: number;
    AskidanAlinanKart: number;
    ToplamOdenenTutar: number;
}

export function iztek(client: IzmirClient) {
    return {
        /**
         * Askıda İzmirim Kart istatistiklerini içeren web servisi.
         * Askıda bekleyen kart sayısı, alınan kart sayısı ve toplam ödenen tutar bilgilerini döner.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/iztek/askidaizmirimkart
         */
        getAskidaIzmirimKartIstatistik() {
            return client.get("iztek/askidaizmirimkart") as Promise<AskidaIzmirimKartIstatistik>;
        }
    };
}

