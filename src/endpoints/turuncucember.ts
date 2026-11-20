import { IzmirClient } from "../client.js";

export interface TuruncuCemberIsletme {
    Id: number;
    TicariUnvan: string;
    TabelaAdi: string;
    FaaliyetAlani: string;
    FaaliyetId: number;
    LokasyonX: string;
    LokasyonY: string;
    EklenmeTarihi: string;
}

export interface TuruncuCemberSayilar {
    BasvuruSayisi: number;
    IslemdeBekleyen: number;
    KabulEdilen: number;
    Reddedilen: number;
}

export function turuncucember(client: IzmirClient) {
    return {
        /**
         * Turuncu Çember sertifikası almış aktif işletmelerin listesini döndürür.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/turuncucember/isletmeler
         */
        getIsletmeler(): Promise<TuruncuCemberIsletme[]> {
            return client.get<TuruncuCemberIsletme[]>("ibb/turuncucember/isletmeler");
        },

        /**
         * Belirli bir işletmenin Turuncu Çember sertifika detay bilgilerini getirir.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/turuncucember/isletme/{id}
         * @param id İşletme benzersiz kimliği
         */
        getIsletme(id: number): Promise<TuruncuCemberIsletme> {
            return client.get<TuruncuCemberIsletme>(`ibb/turuncucember/isletme/${id}`);
        },

        /**
         * Turuncu Çember sertifika başvuru sonuçları ve istatistiklerini getirir.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/turuncucember/sayilar
         */
        getSayilar(): Promise<TuruncuCemberSayilar> {
            return client.get<TuruncuCemberSayilar>("ibb/turuncucember/sayilar");
        },
    };
}
