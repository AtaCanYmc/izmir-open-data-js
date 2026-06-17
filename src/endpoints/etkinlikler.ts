import { IzmirClient } from "../client.js";

export interface IzmirEtkinlik {
    Tur: string;
    Id: number;
    Adi: string;
    EtkinlikBitisTarihi: string;
    KucukAfis: string;
    EtkinlikMerkezi: string;
    KisaAciklama: string;
    BiletSatisLinki: string | null;
    UcretsizMi: boolean;
    Resim: string;
    EtkinlikUrl: string;
    EtkinlikBaslamaTarihi: string;
}

export function etkinlikler(client: IzmirClient) {
    return {
        /**
         * Güncel kültür sanat etkinlikler listesini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/kultur-sanat-etkinlikleri
         */
        getList() {
            return client.get<IzmirEtkinlik[]>("ibb/kultursanat/etkinlikler");
        },

        /**
         * Belirli bir etkinliğin detay bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/kultur-sanat-etkinlikleri
         */
        getEtkinlikById(etkinlikId: number) {
            return client.get<IzmirEtkinlik>(`ibb/kultursanat/etkinlikler/${etkinlikId}`);
        },
    };
}
