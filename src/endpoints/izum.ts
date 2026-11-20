import { IzmirClient } from "../client.js";
import { OtoparkBilgisi } from "./otopark.js";
import { TrafikKamerasi } from "./trafik.js";
import { CKANDatastoreSearchOptions, CKANDatastoreSearchResult } from "./ckan.js";

export interface IzumHizVeSure {
    _id: number;
    TARIH: string;
    SAAT: string;
    BASLAMA: string;
    BITIS: string;
    HIZ: number;
    SURE: number;
}

export interface IzumVmsPano {
    _id: number;
    VMS: string;
    BOY: string;
    OLCU: string;
    ADRES: string;
}

export interface IzumAracSayim {
    _id: number;
    TARIH: string;
    ANA_ARTER_ADI: string;
    ISTIKAMET: string;
    BASLAMA: string;
    BITIS: string;
    ARAC_SAYISI: number;
    EK_SERIT: number;
    ACIKLAMA: string;
}

export const IZUM_RESOURCES = {
    HIZ_VE_SURE: "a3bd880f-dfc6-4f65-bbfd-5fcc998268c3",
    VMS_PANOLAR: "c1bcea54-bdf6-417f-b807-6d695afed56f",
    ARAC_SAYIM: "25866cc4-298a-4ee7-bfd3-719ea7f530b2",
} as const;

export function izum(client: IzmirClient) {
    return {
        /**
         * İzmir Ulaşım Merkezi (İZUM) ana arterler günlük hız ve seyahat süresi verilerini sorgular.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/ana-arterler-gunluk-hiz-ve-sure-verileri
         * @param options Tarih, arter veya saat filtreleme ve sayfalama seçenekleri
         */
        getAnaArterHizVeSure(
            options?: Omit<CKANDatastoreSearchOptions, "resource_id">,
        ): Promise<CKANDatastoreSearchResult<IzumHizVeSure>> {
            const params: Record<string, any> = {
                resource_id: IZUM_RESOURCES.HIZ_VE_SURE,
                ...options,
            };
            return client.getCKAN<CKANDatastoreSearchResult<IzumHizVeSure>>("datastore_search", params);
        },

        /**
         * Işıklı Şehir Yönlendirme Panoları (VMS - Variable Message Signs) konum ve boyut bilgilerini sorgular.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/isikli-sehir-yonlendirme-panolari
         * @param options Filtreleme ve arama seçenekleri
         */
        getVmsPanolari(
            options?: Omit<CKANDatastoreSearchOptions, "resource_id">,
        ): Promise<CKANDatastoreSearchResult<IzumVmsPano>> {
            const params: Record<string, any> = {
                resource_id: IZUM_RESOURCES.VMS_PANOLAR,
                ...options,
            };
            return client.getCKAN<CKANDatastoreSearchResult<IzumVmsPano>>("datastore_search", params);
        },

        /**
         * İzmir ili ana arterler araç sayım verilerini sorgular.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izmir-ili-arac-sayim-verileri
         * @param options Tarih, arter ve yön filtreleme seçenekleri
         */
        getAracSayimVerileri(
            options?: Omit<CKANDatastoreSearchOptions, "resource_id">,
        ): Promise<CKANDatastoreSearchResult<IzumAracSayim>> {
            const params: Record<string, any> = {
                resource_id: IZUM_RESOURCES.ARAC_SAYIM,
                ...options,
            };
            return client.getCKAN<CKANDatastoreSearchResult<IzumAracSayim>>("datastore_search", params);
        },

        /**
         * İZUM otopark doluluk ve konum verilerini getirir.
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/izum/otoparklar
         */
        getOtoparklar(): Promise<OtoparkBilgisi[]> {
            return client.get<OtoparkBilgisi[]>("ibb/izum/otoparklar");
        },

        /**
         * İZUM trafik izleme kameralarını getirir (CSV).
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/trafik-kameralari
         */
        getKameralar(): Promise<TrafikKamerasi[]> {
            return client.getCSV<TrafikKamerasi>(
                "https://acikveri.bizizmir.com/dataset/a5cda2f2-ccbd-4fac-a4bb-c691abff28f1/resource/b91cb15d-05c6-45b7-8a75-48e030aad368/download/trafikkameralari.csv",
            );
        },

        /**
         * Hız ve seyahat süresi verilerini toplu dump formatında çeker.
         */
        dumpAnaArterHizVeSure<T = any>(): Promise<T> {
            return client.getCKANDump<T>(IZUM_RESOURCES.HIZ_VE_SURE);
        },

        /**
         * Araç sayım verilerini toplu dump formatında çeker.
         */
        dumpAracSayimVerileri<T = any>(): Promise<T> {
            return client.getCKANDump<T>(IZUM_RESOURCES.ARAC_SAYIM);
        },
    };
}
