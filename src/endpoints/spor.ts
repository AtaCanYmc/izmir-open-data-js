import { IzmirClient } from "../client";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";

// Spor tesisi için interface
export interface SporTesisi extends DefaultOnemliYer {}

/**
 * Yürüyüş yolu/parkur bilgisi (CSV datasından)
 */
export interface YuruyusYolu {
    /** Parkur adı */
    PARKUR: string;
    /** Yürüyüşe uygunluk durumu */
    YURUYUS: string;
    /** Mesafe (km) */
    MESAFE: number | string;
    /** Minimum yükseklik (metre) */
    MINIMUM_YUKSEKLIK: number | string;
    /** Maksimum yükseklik (metre) */
    MAKSIMUM_YUKSEKLIK: number | string;
    /** Tahmini süre (dakika) */
    ZAMAN: number | string;
    /** Zorluk derecesi (Kolay, Orta, Zorlu vb.) */
    ZORLUK_DERECESI: string;
    /** Bisiklete uygunluk durumu */
    BISIKLET: string;
}

/**
 * Spor tesisleri endpoint'leri.
 * NOT: Bu endpoint'ler PDF dokümantasyonunda belirtilmiş ancak
 * API'de henüz aktif değil (404 dönüyor). İleride aktif olabilir.
 */
export function spor(client: IzmirClient) {
    return {
        /**
         * Hipodrom konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/hipodrom
         * @deprecated API'de henüz aktif değil
         */
        getHipodromList() {
            return client.get("ibb/cbs/hipodrom") as Promise<OnemliYerWrapper<SporTesisi>>;
        },

        /**
         * Spor salonları ve sahaları konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/sporsalonlari
         * @deprecated API'de henüz aktif değil
         */
        getSporSalonlariList() {
            return client.get("ibb/cbs/sporsalonlari") as Promise<OnemliYerWrapper<SporTesisi>>;
        },

        /**
         * Stadyumlar konum bilgilerini içeren web servisi.
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/stadyumlar
         * @deprecated API'de henüz aktif değil
         */
        getStadyumlarList() {
            return client.get("ibb/cbs/stadyumlar") as Promise<OnemliYerWrapper<SporTesisi>>;
        },

        /**
         * Yürüyüş ve bisiklet parkurlarının bilgilerini içeren web servisi (CSV).
         * Parkur adı, mesafe, yükseklik, zorluk derecesi gibi bilgileri içerir.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/yuruyus-yollari
         */
        getYuruyusYollari(): Promise<YuruyusYolu[]> {
            return client.getCSV<YuruyusYolu>(
                'https://acikveri.bizizmir.com/dataset/48fa21a3-b286-40f2-a286-28aa9dc328df/resource/4896beb8-0139-4135-9475-d790c18bbb19/download/yuruyus-yollar.csv'
            );
        }
    };
}

