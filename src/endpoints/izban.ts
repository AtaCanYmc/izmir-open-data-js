import { IzmirClient } from "../client.js";

export interface IzbanIstasyon {
    IstasyonId: number;
    IstasyonAdi: string;
    IstasyonSirasi: number;
    Boylam: number;
    Enlem: number;
}

export interface IzbanSeferSaati {
    HareketIstasyonId: number;
    HareketIstasyonAdi: string;
    VarisIstasyonId: number;
    VarisIstasyonAdi: string;
    HareketSaati: string;
    VarisSaati: string;
}

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
         * Banliyö fiyat tarifesi ve "Gittiğin Kadar Öde" hesaplama web servisi.
         *
         * Kaynak: İZBAN Web Servis Kullanım Dokümanı V.1.0 (Bölüm 4.3)
         * @param BinisIstasyonuId Binilecek istasyonun id’si
         * @param InisIstasyonuId İnilecek istasyonun id’si
         * @param Aktarma Kaç kez aktarma yapıldı (0, 1, 2, 3)
         * @param httMi Halk taşıt tarifesi saatleri içerisinde mi? (boolean)
         */
        getTarife(BinisIstasyonuId: number, InisIstasyonuId: number, Aktarma: number, httMi: boolean | number) {
            return client.get<IzbanUcretDetay>(
                `izban/tutarhesaplama/${BinisIstasyonuId}/${InisIstasyonuId}/${Aktarma}/${httMi}`,
            );
        },

        /**
         * Banliyö İstasyonlarının konum ve sıra bilgilerini içeren web servisi.
         *
         * Kaynak: İZBAN Web Servis Kullanım Dokümanı V.1.0 (Bölüm 4.1)
         */
        getIstasyonList(): Promise<IzbanIstasyon[]> {
            return client.get<IzbanIstasyon[]>("izban/istasyonlar");
        },

        /**
         * Kalkış ve varış istasyonlarına göre banliyö sefer saatlerini içeren web servisi.
         *
         * Kaynak: İZBAN Web Servis Kullanım Dokümanı V.1.0 (Bölüm 4.2)
         * @param kalkisIstasyonId Kalkış istasyonu ID'si
         * @param varisIstasyonId Varış istasyonu ID'si
         */
        getHareketSaatleri(kalkisIstasyonId: number, varisIstasyonId: number): Promise<IzbanSeferSaati[]> {
            return client.get<IzbanSeferSaati[]>(`izban/sefersaatleri/${kalkisIstasyonId}/${varisIstasyonId}`);
        },

        /**
         * İZBAN istasyonları arasındaki mesafe bilgilerini içeren web servisi (CSV).
         * Her istasyonun bir önceki istasyona olan mesafesini metre cinsinden içerir.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izban-duraklar-arasi-mesafe
         */
        getDurakMesafeleri(): Promise<IzbanDurakMesafesi[]> {
            return client.getCSV<IzbanDurakMesafesi>(
                "https://acikveri.bizizmir.com/dataset/c40b5759-9394-41b0-a479-0e7c53e18072/resource/53ff5f4b-c514-43aa-a4cd-4a12e03976e1/download/izban-duraklar-arasi-mesafe.csv",
            );
        },
    };
}
