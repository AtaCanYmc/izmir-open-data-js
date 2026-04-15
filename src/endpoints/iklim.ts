import {IzmirClient} from "../client";
import {formatDate} from "../common/utils/dateUtils";

export interface HavaKalitesiOlcum {
    OlcumTarihi: string;   // ISO date
    BolgeId: number;
    BolgeAdi: string;
    GazId: number;
    GazAdi: string;
    OlcumDegeri: string;   // API kirli veri döndürüyor
}

/**
 * Hava kalitesi ölçüm istasyonu bilgisi (CSV datasından)
 */
export interface HavaKalitesiIstasyonu {
    /** Bölge ID'si */
    BOLGE: number | string;
    /** İlçe adı */
    ILCE: string;
    /** İstasyon adı */
    ISTASYON_ADI: string;
    /** Enlem (latitude) */
    ENLEM: number | string;
    /** Boylam (longitude) */
    BOYLAM: number | string;
}

export function iklim(client: IzmirClient) {
    return {
        /**
         * Belirtilen tarihe göre hava kalitesi ölçüm değerlerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/hava-kalitesi-olcum-degerleri
         */
        getGunlukHavaKalitesiOlcumleri(tarih: Date) {
            return client.get(`ibb/cevre/havadegerleri/${formatDate(tarih)}`) as Promise<HavaKalitesiOlcum[]>;
        },

        /**
         * Hava kalitesi ölçüm istasyonlarının konum bilgilerini içeren web servisi (CSV).
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/hava-kalitesi-olcum-istasyonlari
         */
        getHavaKalitesiIstasyonlari(): Promise<HavaKalitesiIstasyonu[]> {
            return client.getCSV<HavaKalitesiIstasyonu>(
                'https://acikveri.bizizmir.com/dataset/3712094a-ded4-40cf-ac94-2102eeb73cbc/resource/7b0edbda-350a-4240-b2c5-a4deb1b4bdfc/download/hava-kalitesi-olcum-istasyonlari.csv'
            );
        }
    };
}