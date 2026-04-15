import {IzmirClient} from "../client";

export interface IzbanUcretDetay {
    BinisIstasyonu: string;
    InisIstasyonu: string;
    ToplamKm: number;
    // Ücretler
    TamUcret: number;
    OgrenciUcret: number;
    OgretmenUcret: number;
    Yas60Ucret: number;
    SerbestUcret: number;
    // İade Tutarları
    IadeTam: number;
    IadeOgrenci: number;
    IadeOgretmen: number;
    Iade60Yas: number;
    IadeSerbest: number;
    // Minimum Bakiye Gereksinimleri
    MinBakiyeTam: number;
    MinBakiyeOgrenci: number;
    MinBakiyeOgretmen: number;
    MinBakiye60Yas: number;
    MinBakiyeSerbest: number;
}

/**
 * İZBAN duraklar arası mesafe bilgisi (CSV datasından)
 * İstasyonlar arası mesafe bilgilerini içerir
 */
export interface IzbanDurakMesafesi {
    /** İstasyon ID'si */
    ISTASYON_ID: number | string;
    /** İstasyon adı */
    ISTASYON_ADI: string;
    /** Hat üzerindeki istasyon sırası */
    ISTAYON_SIRASI: number | string;
    /** Bir önceki istasyona olan mesafe (metre cinsinden) */
    MESAFE: number | string;
}

export function izban(client: IzmirClient) {
    return {
        /**
         * Banliyö fiyat tarifesi bilgisini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izban-banliyo-fiyat-tarifesi-servisi
         * @param BinisIstasyonuId Binilecek istasyonun id’si
         * @param InisIstasyonuId İnilecek istasyonun id’si
         * @param Aktarma Kaç kez aktarma yapıldı (0, 1 kez, 2 kez, 3 kez)
         * @param httMi Halk taşıt tarifesi saatleri içerisinde mi?
         */
        getTarife(BinisIstasyonuId: number, InisIstasyonuId: number, Aktarma: number, httMi: number) {
            return client.get(`izban/tutarhesaplama/${BinisIstasyonuId}/${InisIstasyonuId}/${Aktarma}/${httMi}`) as Promise<IzbanUcretDetay>;
        },

        /**
         * Banliyö İstasyonlarının konum bilgileri içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izban-istasyonlari
         */
        getIstasyonList() {
            return client.get("izban/istasyonlar");
        },

        /**
         * Banliyö hareket saatlerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izban-banliyo-hareket-saatleri
         * @param kalkisIstasyonId Kalkış istasyonu ID'si
         * @param varisIstasyonId Varış istasyonu ID'si
         */
        getHareketSaatleri(kalkisIstasyonId: number, varisIstasyonId: number) {
            return client.get(`sefersaatleri/${kalkisIstasyonId}/${varisIstasyonId}`);
        },

        /**
         * İZBAN istasyonları arasındaki mesafe bilgilerini içeren web servisi (CSV).
         * Her istasyonun bir önceki istasyona olan mesafesini metre cinsinden içerir.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izban-duraklar-arasi-mesafe
         */
        getDurakMesafeleri(): Promise<IzbanDurakMesafesi[]> {
            return client.getCSV<IzbanDurakMesafesi>(
                'https://acikveri.bizizmir.com/dataset/c40b5759-9394-41b0-a479-0e7c53e18072/resource/53ff5f4b-c514-43aa-a4cd-4a12e03976e1/download/izban-duraklar-arasi-mesafe.csv'
            );
        }
    };
}
