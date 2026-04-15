import {IzmirClient} from "../client";

/**
 * İzmirimKart dolum noktası bilgisi (CSV datasından)
 * Dolum noktalarının adres ve konum bilgilerini içerir
 */
export interface IzmirimKartDolumNoktasi {
    /** Dolum noktası adresi */
    ADDRESS: string;
    /** Boylam (longitude) */
    LONGITUDE: number | string;
    /** Enlem (latitude) */
    LATITUDE: number | string;
}

export function izmirimkart(client: IzmirClient) {
    return {
        /**
         * İzmirimKart dolum noktalarının adres ve konum bilgilerini içeren web servisi (CSV).
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izmirimkart-dolum-noktalari
         */
        getDolumNoktalari(): Promise<IzmirimKartDolumNoktasi[]> {
            return client.getCSV<IzmirimKartDolumNoktasi>(
                'https://acikveri.bizizmir.com/dataset/a0bb148a-f1f0-4a68-a534-4a273573d132/resource/7a3efbec-fa4f-4b1e-9f9a-ac28f3608b40/download/izmirimkart-dolum-noktalari.csv'
            );
        }
    };
}

