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

export function iklim(client: IzmirClient) {
    return {
        /**
         * Belirtilen tarihe göre hava kalitesi ölçüm değerlerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/hava-kalitesi-olcum-degerleri
         */
        getGunlukHavaKalitesiOlcumleri(tarih: Date) {
            return client.get(`ibb/cevre/havadegerleri/${formatDate(tarih)}`) as Promise<HavaKalitesiOlcum[]>;
        }
    };
}