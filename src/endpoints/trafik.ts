import { IzmirClient } from "../client.js";
import { CKANDatastoreSearchOptions, CKANDatastoreSearchResult } from "./ckan.js";
import { IZUM_RESOURCES, IzumAracSayim, IzumHizVeSure, IzumVmsPano } from "./izum.js";

/**
 * Trafik kamerası bilgisi (CSV datasından)
 */
export interface TrafikKamerasi {
    /** Kamera/Kavşak adı */
    ADI: string;
    /** Enlem koordinatı */
    ENLEM: number;
    /** Boylam koordinatı */
    BOYLAM: number;
}

export function trafik(client: IzmirClient) {
    return {
        /**
         * İzmir'deki trafik kameralarının listesini içeren web servisi (CSV).
         * Kavşak adı ve koordinat bilgilerini içerir (~92 kamera).
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/trafik-kameralari
         */
        getKameraList(): Promise<TrafikKamerasi[]> {
            return client.getCSV<TrafikKamerasi>(
                "https://acikveri.bizizmir.com/dataset/a5cda2f2-ccbd-4fac-a4bb-c691abff28f1/resource/b91cb15d-05c6-45b7-8a75-48e030aad368/download/trafikkameralari.csv",
            );
        },

        /**
         * Ana arterler günlük hız ve seyahat süresi verilerini sorgular.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/ana-arterler-gunluk-hiz-ve-sure-verileri
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
         * Işıklı Şehir Yönlendirme Panoları (VMS) verilerini sorgular.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/isikli-sehir-yonlendirme-panolari
         */
        getIsikliYonlendirmePanolari(
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
    };
}
