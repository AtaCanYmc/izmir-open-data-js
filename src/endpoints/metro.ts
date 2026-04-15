import {IzmirClient} from "../client";

export interface MetroIstasyonu {
    IstasyonId: number;
    Adi: string;
    Enlem: number;
    Boylam: number;
    AktifMi: boolean;
    Sira: number; // Hattaki durak sırası (1'den 24'e kadar)
}

/**
 * Metro durak mesafeleri bilgisi (CSV datasından)
 * İstasyonlar arası mesafe bilgilerini içerir
 */
export interface MetroDurakMesafesi {
    /** İstasyon ID'si */
    ISTASYON_ID: number | string;
    /** İstasyon adı */
    ISTASYON_ADI: string;
    /** Hat üzerindeki istasyon sırası */
    ISTASYON_SIRASI: number | string;
    /** Bir önceki istasyona olan mesafe (metre cinsinden) */
    MESAFE: number | string;
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
        },

        /**
         * Metro istasyonları arasındaki mesafe bilgilerini içeren web servisi (CSV).
         * Her istasyonun bir önceki istasyona olan mesafesini metre cinsinden içerir.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/metro-durak-mesafeleri
         */
        getDurakMesafeleri(): Promise<MetroDurakMesafesi[]> {
            return client.getCSV<MetroDurakMesafesi>(
                'https://acikveri.bizizmir.com/dataset/b43d973e-8b98-4572-a944-dc39373ab7cb/resource/9a503344-25d5-4f34-8811-65e3108303ca/download/metro-durak-mesafeleri.csv',
                ','
            );
        }
    };
}
