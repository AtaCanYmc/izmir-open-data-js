import {IzmirClient} from "../client";
import {CKANDatastoreResponse} from "./eshot";

export interface OtoparkBilgisi {
    ufid: string;
    name: string;
    status: "Closed" | "Opened";
    type: "OnStreet" | "OffStreet"; // Yol kenarı veya Katlı/Açık otopark
    provider: string;
    lat: number;
    lng: number;
    isPaid: boolean;
    nonstop: boolean;
    openingHours: Record<string, string>;
    occupancy: {
        total: { free: number; occupied: number };
        disabled?: { free: number; occupied: number }; // Engelli kontenjanı opsiyonel
    };
    accessibility: {
        lpgAllowed: boolean;
        disabled: boolean;
        maxLength: number;
        maxHeight: number;
        maxWidth: number;
    };
    poi: {
        metroStation: boolean;
        trainStation: boolean;
        busStation: boolean;
        tramStation: boolean;
    };
    payment: {
        cash: boolean;
        card: boolean;
        sms: boolean;
    };
    accessories: {
        covered: boolean;
        barrier: boolean;
        cctv: boolean;
    };
}

/**
 * İzelman otopark ücret bilgisi (CKAN datasından)
 */
export interface OtoparkUcreti {
    _id: number;
    /** Otopark adı */
    "Otopark / Fiyat": string;
    /** 0-1 saat ücreti */
    "0-1 Saat": number | null;
    /** 0-2 saat ücreti */
    "0-2 saat": number | null;
    /** 2-4 saat ücreti */
    "2-4 saat": number | null;
    /** 4-6 saat ücreti */
    "4-6 saat": number | null;
    /** 0-3 saat ücreti */
    "0-3 saat": string | null;
    /** 0-6 saat ücreti */
    "0-6 saat": number | null;
    /** 3-6 saat ücreti */
    "3-6 saat": string | null;
    /** 6-12 saat ücreti */
    "6-12 saat": number | null;
    /** 1-12 saat ücreti */
    "1-12 saat": number | null;
    /** 0-12 saat ücreti */
    "0-12 saat": number | null;
    /** 12-24 saat ücreti */
    "12-24 saat": number | null;
    /** 0-24 saat ücreti */
    "0-24 saat": number | null;
    /** 0-12 saat motosiklet ücreti */
    "0-12 Saat(Motosiklet )": number | null;
    /** 12-24 saat motosiklet ücreti */
    "12-24 Saat(Motosiklet )": number | null;
    /** 0-24 saat motosiklet ücreti */
    "0-24 Saat(Motosiklet )": number | null;
    /** Kayıp bilet ücreti */
    "Kayıp Bilet": number | null;
    /** Aylık abone ücreti */
    "Aylık Abone Ücreti": number | null;
    /** Aylık alan abonelik ücreti */
    "Aylık Alan Abonelik Ücreti": number | null;
    /** Motosiklet aylık abone ücreti */
    "Motosiklet Aylık Abone Ücreti": number | null;
    /** 0-12 saat engelli aracı ücreti */
    "0-12 Saat(Engelli Aracı )": number | null;
    /** 12-24 saat engelli aracı ücreti */
    "12-24 Saat(Engelli Aracı )": number | null;
    /** 0-24 saat engelli aracı ücreti */
    "0-24 Saat(Engelli Aracı )": number | null;
}

export function otopark(client: IzmirClient) {
    return {
        /**
         * Otoparkların konumu, dolu-boş adetleri, çalışma saatleri bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/otopark-doluluk-ve-lokasyon-bilgileri
         */
        getList() {
            return client.get("izum/otoparklar") as Promise<OtoparkBilgisi[]>;
        },

        /**
         * İzelman otopark ücretlerini içeren web servisi (CKAN).
         * Her otopark için farklı saat dilimleri ve araç tiplerinin ücret bilgilerini içerir.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izelman-otopark-ucretleri
         * @param limit Döndürülecek kayıt sayısı (varsayılan: 100)
         * @param offset Atlanacak kayıt sayısı (sayfalama için)
         */
        getUcretler(limit = 100, offset = 0) {
            return client.getCKAN<CKANDatastoreResponse<OtoparkUcreti>>('datastore_search', {
                resource_id: 'b45d2e9f-f258-476e-a12d-d0ff62471ee0',
                limit,
                offset
            });
        }
    };
}