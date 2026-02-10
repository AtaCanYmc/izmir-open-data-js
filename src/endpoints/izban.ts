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
        }
    };
}
