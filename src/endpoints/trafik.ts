import {IzmirClient} from "../client";

/**
 * Trafik kamerası bilgisi (CSV datasından)
 */
export interface TrafikKamerasi {
    /** Kamera/Kavşak adı */
    ADI: string;
    /** Enlem koordinatı */
    ENLEM: number;
    /** Boylam koordinatı */
    BOYLAM: number;
}

export function trafik(client: IzmirClient) {
    return {
        /**
         * İzmir'deki trafik kameralarının listesini içeren web servisi (CSV).
         * Kavşak adı ve koordinat bilgilerini içerir (~92 kamera).
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/trafik-kameralari
         */
        getKameraList(): Promise<TrafikKamerasi[]> {
            return client.getCSV<TrafikKamerasi>(
                'https://acikveri.bizizmir.com/dataset/a5cda2f2-ccbd-4fac-a4bb-c691abff28f1/resource/b91cb15d-05c6-45b7-8a75-48e030aad368/download/trafikkameralari.csv'
            );
        }
    };
}

