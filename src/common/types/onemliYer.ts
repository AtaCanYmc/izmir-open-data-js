export interface DefaultOnemliYer {
    ILCE: string;
    KAPINO: string;
    ENLEM: number;
    ACIKLAMA: string;
    ILCEID: string;
    MAHALLE: string;
    MAHALLEID: string | null;
    ADI: string;
    BOYLAM: number;
    YOL: string;
}

export interface OnemliYerWrapper<T> {
    sayfadaki_kayitsayisi: number;
    kayit_sayisi: number;
    sayfa_numarasi: number;
    onemliyer: T[];
}