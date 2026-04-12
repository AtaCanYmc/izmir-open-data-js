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

/**
 * Vapur detay bilgisi (CSV datasından)
 * Gemilerin kapasite ve donanım özellikleri
 */
export interface VapurDetay {
    /** Gemi adı */
    GEMI_ADI: string;
    /** Gemi tipi (Yolcu Gemisi, Araba Vapuru vb.) */
    GEMI_TIPI: string;
    /** Yolcu kapasitesi */
    YOLCU_KAPASITESI: number | string;
    /** Araç kapasitesi */
    ARAC_KAPASITESI: number | string;
    /** Bisiklet park yeri kapasitesi */
    BISIKLET_PARK_YERI_KAPASITESI: number | string;
    /** Engelli erişimine uygunluk (Var/Yok) */
    ENGELLI_ERISIMINE_UYGUNLUK: string;
    /** Engelli asansörü sayısı */
    ENGELLI_ASANSORU_SAYISI: number | string;
    /** Erkek tuvaleti sayısı */
    ERKEK_TUVALETI_SAYISI: number | string;
    /** Kadın tuvaleti sayısı */
    KADIN_TUVALETI_SAYISI: number | string;
    /** Engelli tuvaleti sayısı */
    ENGELLI_TUVALETI_SAYISI: number | string;
    /** Bebek bakım odası sayısı */
    BEBEK_BAKIM_ODASI_SAYISI: number | string;
    /** Büfe veya otomat (Var/Yok) */
    BUFE_VEYA_OTOMAT: string;
    /** Evcil hayvan taşıma kafesi sayısı */
    EVCIL_HAYVAN_TASIMA_KAFESI_SAYISI: number | string;
    /** Wizmirnet kablosuz internet (Var/Yok) */
    WIZMIRNET_KABLOSUZ_INTERNET: string;
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
        },

        /**
         * Vapurların detaylı bilgilerini içeren web servisi (CSV).
         * Kapasite, donanım ve erişilebilirlik bilgilerini içerir (~20 gemi).
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/vapur-detay
         */
        getDetayList(): Promise<VapurDetay[]> {
            return client.getCSV<VapurDetay>(
                'https://acikveri.bizizmir.com/dataset/87b38b23-4f73-4650-9d96-c72ad6ee73e3/resource/e6d7425a-694c-4f39-b452-4aade132635c/download/vapurdetay.csv'
            );
        }
    };
}
