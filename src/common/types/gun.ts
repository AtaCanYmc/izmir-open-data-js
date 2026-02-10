export interface GunReferansi {
    GunId: number;
    Gun: string;
}

// Uygulama genelinde enum olarak kullanmak daha pratiktir:
export enum Gunler {
    Pazartesi = 1,
    Sali = 2,
    Carsamba = 3,
    Persembe = 4,
    Cuma = 5,
    Cumartesi = 6,
    Pazar = 7
}