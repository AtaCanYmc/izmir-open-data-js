import { IzmirClient } from "../client.js";

export interface IzmirEtkinlik {
    Id: number;
    Adi: string;
    Tur: string;
    TurId?: number;
    KucukAfis: string;
    Resim: string;
    BuyukFoto?: string;
    KisaAciklama?: string;
    Aciklama?: string;
    AciklamaOzeti?: string;
    EtkinlikUrl: string;
    EtkinlikBaslamaTarihi: string;
    EtkinlikBitisTarihi: string;
    EtkinlikMerkezi: string;
    BiletSatisLinki: string | null;
    UcretsizMi: boolean;
}

export function etkinlikler(client: IzmirClient) {
    return {
        /**
         * Güncel kültür sanat etkinlikler listesini içeren web servisi.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/kultursanat/etkinlikler
         */
        getList(): Promise<IzmirEtkinlik[]> {
            return client.get<IzmirEtkinlik[]>("ibb/kultursanat/etkinlikler");
        },

        /**
         * Belirli bir etkinliğin detay bilgilerini içeren web servisi.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/kultursanat/etkinlik/{id}
         * @param etkinlikId Etkinlik ID numarası
         */
        getEtkinlikById(etkinlikId: number): Promise<IzmirEtkinlik> {
            return client.get<IzmirEtkinlik>(`ibb/kultursanat/etkinlik/${etkinlikId}`);
        },
    };
}
