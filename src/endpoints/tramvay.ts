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

/**
 * Tramvay durak mesafeleri bilgisi (CSV datasından)
 * İstasyonlar arası mesafe bilgilerini içerir
 */
export interface TramvayDurakMesafesi {
    /** İstasyon ID'si */
    ISTASYON_ID: number | string;
    /** İstasyon adı */
    ISTASYON_ADI: string;
    /** Hat üzerindeki istasyon sırası */
    ISTASYON_SIRASI: number | string;
    /** Bir önceki istasyona olan mesafe (metre cinsinden) */
    MESAFE: number | string;
}

/**
 * Tramvay hatları için durak mesafe URL'leri
 */
export type TramvayHatTipi = 'karsiyaka' | 'konak-sag' | 'konak-sol' | 'cigili';

const TRAMVAY_DURAK_MESAFE_URLS: Record<TramvayHatTipi, string> = {
    'karsiyaka': 'https://acikveri.bizizmir.com/dataset/b43d973e-8b98-4572-a944-dc39373ab7cb/resource/45d03ae3-f928-441f-bed3-e26c5edd9f42/download/tramvay-karsiyaka-durak-mesafeleri.csv',
    'konak-sag': 'https://acikveri.bizizmir.com/dataset/b43d973e-8b98-4572-a944-dc39373ab7cb/resource/32930780-fd3a-4b9d-a1b5-a299440a1d6c/download/tramvay-konak-durak-mesafeleri-sag.csv',
    'konak-sol': 'https://acikveri.bizizmir.com/dataset/b43d973e-8b98-4572-a944-dc39373ab7cb/resource/33480acc-873b-43e5-aa3d-2bd6d5fb2134/download/tramvay-konak-durak-mesafeleri-sol.csv',
    'cigili': 'https://acikveri.bizizmir.com/dataset/b43d973e-8b98-4572-a944-dc39373ab7cb/resource/b29426e4-39ae-4b89-8bbd-be6104161fb7/download/tramvay-cigili-durak-mesafeleri.csv'
};

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
        },

        /**
         * Tramvay hatları için durak mesafelerini içeren web servisi (CSV).
         * Her istasyonun bir önceki istasyona olan mesafesini metre cinsinden içerir.
         *
         * @param hat Tramvay hattı tipi: 'karsiyaka' | 'konak-sag' | 'konak-sol' | 'cigili'
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/tramvay-durak-mesafeleri
         *
         * @example
         * // Karşıyaka tramvay durak mesafeleri
         * const karsiyaka = await api.tramvay.getDurakMesafeleri('karsiyaka');
         *
         * // Konak tramvay (sağ hat) durak mesafeleri
         * const konakSag = await api.tramvay.getDurakMesafeleri('konak-sag');
         */
        getDurakMesafeleri(hat: TramvayHatTipi): Promise<TramvayDurakMesafesi[]> {
            const url = TRAMVAY_DURAK_MESAFE_URLS[hat];
            return client.getCSV<TramvayDurakMesafesi>(url);
        }
    };
}
