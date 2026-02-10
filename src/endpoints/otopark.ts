import {IzmirClient} from "../client";

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

export function otopark(client: IzmirClient) {
    return {
        /**
         * Otoparkların konumu, dolu-boş adetleri, çalışma saatleri bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/otopark-doluluk-ve-lokasyon-bilgileri
         */
        getList() {
            return client.get("izum/otoparklar") as Promise<OtoparkBilgisi[]>;
        }
    };
}