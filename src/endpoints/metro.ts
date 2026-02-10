import {IzmirClient} from "../client";

export interface MetroIstasyonu {
    IstasyonId: number;
    Adi: string;
    Enlem: number;
    Boylam: number;
    AktifMi: boolean;
    Sira: number; // Hattaki durak sırası (1'den 24'e kadar)
}

export function metro(client: IzmirClient) {
    return {
        /**
         * Metro istasyonları sıra ve konum verisi bilgileri içeren web servis.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/metro-istayonlari
         */
        getIstasyonList() {
            return client.get('metro/istasyonlar') as Promise<MetroIstasyonu[]>;
        }
    };
}
