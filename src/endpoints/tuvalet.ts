import { IzmirClient } from "../client.js";
import { CKANDatastoreSearchOptions, CKANDatastoreSearchResult } from "./ckan.js";

export interface AkilliTuvalet {
    _id: number;
    TESIS_ADI: string;
    ILCE: string;
    MAHALLE: string;
    ADRES: string;
    BOYLAM: number;
    ENLEM: number;
}

export interface ModulerTuvalet {
    _id: number;
    KURUM: string;
    TESIS_ADI: string;
    ILCE: string;
    MAHALLE: string;
    ADRES: string;
    UCLETLI_MI: string;
    ODEME_SEKLI: string;
    ENGELLI_ERISIMINE_UYGUNMU: string;
    BEBEK_BAKIM_ODASI: number;
    KABIN_ADEDI: number;
    PISUVAR_ADEDI: number;
    PERSONEL_ODASI: number;
    BOYLAM: number;
    ENLEM: number;
}

export const TUVALET_RESOURCES = {
    AKILLI_TUVALETLER: "d87de3c1-9bc0-4a8c-842a-90cd2a30d03a",
    MODULER_TUVALETLER: "8f6e905d-3f76-45e5-b52a-b89be7d4631b",
} as const;

export function tuvalet(client: IzmirClient) {
    return {
        /**
         * İzmir genelindeki Akıllı Tuvaletlerin konum ve adres bilgilerini sorgular.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/akilli-tuvaletler
         * @param options Arama, filtre (örn: { ILCE: 'KONAK' }) ve sayfalama seçenekleri
         */
        getAkilliTuvaletler(
            options?: Omit<CKANDatastoreSearchOptions, "resource_id">,
        ): Promise<CKANDatastoreSearchResult<AkilliTuvalet>> {
            const params: Record<string, any> = {
                resource_id: TUVALET_RESOURCES.AKILLI_TUVALETLER,
                ...options,
            };
            return client.getCKAN<CKANDatastoreSearchResult<AkilliTuvalet>>("datastore_search", params);
        },

        /**
         * İzmir genelindeki Modüler Sistem Tuvalet ve Bebek Bakım Alanlarının konum,
         * kabin adedi, pisuvar sayısı ve erişilebilirlik bilgilerini sorgular.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/moduler-tuvaletler
         * @param options Arama, filtre ve sayfalama seçenekleri
         */
        getModulerTuvaletler(
            options?: Omit<CKANDatastoreSearchOptions, "resource_id">,
        ): Promise<CKANDatastoreSearchResult<ModulerTuvalet>> {
            const params: Record<string, any> = {
                resource_id: TUVALET_RESOURCES.MODULER_TUVALETLER,
                ...options,
            };
            return client.getCKAN<CKANDatastoreSearchResult<ModulerTuvalet>>("datastore_search", params);
        },

        /**
         * Tüm akıllı tuvalet verilerini tek seferde dump formatında indirir.
         */
        dumpAkilliTuvaletler<T = any>(): Promise<T> {
            return client.getCKANDump<T>(TUVALET_RESOURCES.AKILLI_TUVALETLER);
        },

        /**
         * Tüm modüler tuvalet verilerini tek seferde dump formatında indirir.
         */
        dumpModulerTuvaletler<T = any>(): Promise<T> {
            return client.getCKANDump<T>(TUVALET_RESOURCES.MODULER_TUVALETLER);
        },
    };
}
