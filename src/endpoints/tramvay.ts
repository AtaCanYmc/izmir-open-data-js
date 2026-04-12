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

/**
 * Tüm tramvay sefer bilgileri (parametre almadan)
 */
export interface TramvaySefer {
    BaslangicSaati: string; // "HH:mm:ss" formatında
    BitisSaati: string;
    Aralik: number;
}

/**
 * Planlanan sefer sayıları (CSV datasından)
 * Metro ve tramvay hatları için aylık planlanan sefer sayıları
 */
export interface TramvayPlanlananiSefer {
    YIL: number;
    AY: number;
    /** İzmir Metrosu planlanan sefer sayısı */
    IZMIR_METROSU: number;
    /** Karşıyaka ve Çiğli Tramvayı planlanan sefer sayısı */
    KARSIYAKA_TRAMVAYI_VE_CIGLI_TRAMVAYI: number;
    /** Konak Tramvayı planlanan sefer sayısı */
    KONAK_TRAMVAYI: number;
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
         * Tüm tramvay sefer bilgilerini içeren web servisi.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/tramvay/sefer
         * @deprecated API'de henüz aktif değil (404 dönüyor)
         */
        getSeferList() {
            return client.get('tramvay/sefer') as Promise<TramvaySefer[]>;
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
        },

        /**
         * Metro ve tramvay hatları için aylık planlanan sefer sayılarını içeren web servisi (CSV).
         * İzmir Metrosu, Karşıyaka/Çiğli Tramvayı ve Konak Tramvayı verilerini içerir.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/planlanan-sefer-sayilari
         */
        getPlanlananiSeferSayilari(): Promise<TramvayPlanlananiSefer[]> {
            return client.getCSV<TramvayPlanlananiSefer>(
                'https://acikveri.bizizmir.com/dataset/ace45290-413e-4786-82e4-d23fd56591b1/resource/2fc4d0cf-9628-43b7-95d3-df5742a95f02/download/planlanan_sefer_sayilari.csv'
            );
        }
    };
}
