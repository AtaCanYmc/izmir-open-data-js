import {IzmirClient} from "../client";

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
            return client.get("ibb/kultursanat/etkinlikler") as Promise<IzmirEtkinlik[]>;
        },

        /**
         * Belirli bir etkinliğin detay bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/kultur-sanat-etkinlikleri
         */
        getEtkinlikById(etkinlikId: number) {
            return client.get(`ibb/kultursanat/etkinlikler/${etkinlikId}`) as Promise<IzmirEtkinlik>;
        }

    };
}