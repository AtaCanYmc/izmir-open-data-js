import {IzmirClient} from "../client";
import {GunReferansi} from "../common/types/gun";

export interface VapurSeferSaati {
    KalkisSaati: string | null;
    VarisSaati: string | null;
}

export interface VapurSeferSatiri {
    seferSaatleri: VapurSeferSaati[];
    IptalMi: boolean;
    IptalAciklama: string;
    Aciklama: string;
}

export interface VapurHatti {
    hatAdi: string;
    iskeleler: string[]; // İskele ID'leri veya isimleri
    seferSatirlari: VapurSeferSatiri[];
}

export interface VapurVarisYeri {
    iskeleAdi: string;
}

export interface DetayliVapurSeferi {
    arabaliVapurSeferi: boolean;
    KalkisSaati: string;
    VarisYerleri: VapurVarisYeri[];
    Aciklama: string;
    IptalMi: boolean | null;
    IptalAciklama: string | null;
}

export interface GunlukVapurPlani {
    gunId: number; // 1: Pazartesi, 2: Salı...
    seferler: DetayliVapurSeferi[];
}

export interface VapurIskele {
    IskeleId: number;
    Adi: string;
    Enlem: number;
    Boylam: number;
    AktifMi: boolean;
    ArabaliVapurIskelesiMi: boolean;
}

export function vapur(client: IzmirClient) {
    return {
        /**
         * Vapur hareket saatleri bilgisini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/vapur-hareket-saatleri
         * @param kalkis kalkış iskelesi ID'si
         * @param varis varış iskelesi ID'si
         * @param gunTipi (0: pazartesi, 1: salı, 2: çarşamba, 3: perşembe, 4: cuma, 5: cumartesi, 6: pazar)
         * @param detay
         */
        getHareketSaatleri(kalkis: string, varis: string, gunTipi: number, detay: number = 0) {
            return client.get(`izdeniz/vapursaatleri/${kalkis}/${varis}/${gunTipi}/${detay}`);
        },

        /**
         * Vapurların çalışma günlerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/vapur-hareket-saatleri
         */
        getCalismaGunleri() {
            return client.get("izdeniz/gunler") as Promise<GunReferansi>;
        },

        /**
         * İskele bazlı vapur hareket saatleri bilgisini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/vapur-hareket-saatleri
         * @param iskeleId İskele ID'si
         * @param gunId (0: pazartesi, 1: salı, 2: çarşamba, 3: perşembe, 4: cuma, 5: cumartesi, 6: pazar)
         */
        getHareketSaatleriByHat(iskeleId: string, gunId: number) {
            return client.get(`izdeniz/iskelesefersaatleri/${iskeleId}/${gunId}`) as Promise<VapurHatti[]>;
        },

        /**
         * Vapur ve arabalı vapur iskele bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izdeniz-vapur-iskeleleri
         */
        getIskeleList() {
            return client.get("izdeniz/iskeleler") as Promise<VapurIskele[]>;
        }
    };
}
