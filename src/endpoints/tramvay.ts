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
         */
        getIstasyonList(seferId: number) {
            return client.get(`tramvay/istasyonlar/${seferId}`) as Promise<TramvayIstasyonu[]>;
        }
    };
}
