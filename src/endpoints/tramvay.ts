import {IzmirClient} from "../client";

export interface TramvayHatti {
    HatId: number;
    Adi: string;
    Aciklama: string; // "Kara Tarafı", "İç Hat(Mavi)" vb.
    HatBaslangic: string;
    HatBitis: string;
}

export interface TramvayIstasyonu {
    IstasyonId: number;
    Adi: string;
    Enlem: number;
    Boylam: number;
}

export interface TramvaySeferSikligi {
    Sira: number;
    BaslangicSaati: string; // "HH:mm:ss" formatında
    BitisSaati: string;
    Aralik: number;         // Sefer sıklığı (dakika cinsinden)
    TarifeId: number;       //
    SeferId: number;        // İlgili hattın veya seferin kimliği
}

export function tramvay(client: IzmirClient) {
    return {
        /**
         * Tramvay hatları bilgisini içeren web servis:
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izmir-tramvay-hatlari-ve-istasyonlari
         */
        getHatList() {
            return client.get('tramvay/hatlar') as Promise<TramvayHatti[]>;
        },

        /**
         * Sefer numarasına göre tramvay istasyonları listesini içeren web servis.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izmir-tramvay-hatlari-ve-istasyonlari
         *
         * @param seferId Sefer numarası
         */
        getIstasyonList(seferId: number) {
            return client.get(`tramvay/istasyonlar/${seferId}`) as Promise<TramvayIstasyonu[]>;
        },

        /**
         * Sefer numarasına göre tramvay sefer sıklıkları bilgisini veren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/tramvay-seferleri
         *
         * @param seferId Sefer numarası
         */
        getSeferSiklikList(seferId: number) {
            return client.get(`tramvay/seferler/${seferId}`) as Promise<TramvaySeferSikligi[]>;
        }
    };
}
