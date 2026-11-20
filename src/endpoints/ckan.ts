import { IzmirClient } from "../client.js";

export interface CKANTag {
    id: string;
    name: string;
    display_name?: string;
    vocabulary_id?: string | null;
}

export interface CKANOrganization {
    id: string;
    name: string;
    title: string;
    type?: string;
    description?: string;
    image_url?: string;
}

export interface CKANResource {
    id: string;
    package_id: string;
    name: string;
    description?: string;
    format: string;
    url: string;
    datastore_active?: boolean;
    size?: number | null;
    created?: string;
    last_modified?: string;
}

export interface CKANPackage {
    id: string;
    name: string;
    title: string;
    notes?: string;
    author?: string;
    maintainer?: string;
    num_resources: number;
    num_tags: number;
    resources: CKANResource[];
    tags: CKANTag[];
    organization?: CKANOrganization;
    metadata_created: string;
    metadata_modified: string;
    url?: string;
}

export interface CKANPackageSearchResult {
    count: number;
    results: CKANPackage[];
    sort?: string;
}

export interface CKANPackageSearchOptions {
    /** Arama terimi (örn. 'otopark', 'eshot', 'tuvalet') */
    q?: string;
    /** Filtreleme sorgusu (örn. 'tags:ulasim', 'res_format:CSV') */
    fq?: string;
    /** Dönecek maksimum paket sayısı (varsayılan: 10) */
    rows?: number;
    /** Sayfalama başlangıç kaydı (varsayılan: 0) */
    start?: number;
    /** Sıralama kuralı (örn. 'metadata_modified desc', 'title asc') */
    sort?: string;
}

export interface CKANDatastoreField {
    id: string;
    type: string;
    info?: {
        notes?: string;
        type_override?: string;
        label?: string;
    };
}

export interface CKANDatastoreSearchOptions {
    /** Kaynak ID'si (CKAN Resource ID) */
    resource_id?: string;
    /** Tam metin arama terimi */
    q?: string;
    /** Kolon bazlı filtre sözlüğü (örn. { ILCE: "KONAK" }) */
    filters?: Record<string, any>;
    /** Dönecek kayıt limiti (varsayılan: 100) */
    limit?: number;
    /** Sayfalama başlangıç indeksi */
    offset?: number;
    /** Sıralama (örn. '_id asc', 'TARIH desc') */
    sort?: string;
    /** Sadece belirli kolonları getirme (virgülle ayrılmış veya dizi formatında) */
    fields?: string | string[];
}

export interface CKANDatastoreSearchResult<T = any> {
    include_total: boolean;
    resource_id: string;
    fields: CKANDatastoreField[];
    records_format: string;
    records: T[];
    limit: number;
    total: number;
    offset?: number;
    _links?: {
        start: string;
        next?: string;
        prev?: string;
    };
}

export function ckan(client: IzmirClient) {
    return {
        /**
         * İzmir Açık Veri Portalı üzerindeki tüm veri setlerini arar ve filtreler.
         * 260+ veri seti üzerinde metin, etiket, format veya kurum bazlı arama yapılabilir.
         *
         * @param query Metin araması veya opsiyon objesi
         * @param options Arama ve sayfalama seçenekleri
         */
        searchPackages(
            query?: string | CKANPackageSearchOptions,
            options?: CKANPackageSearchOptions,
        ): Promise<CKANPackageSearchResult> {
            let params: Record<string, any> = {};
            if (typeof query === "string") {
                params.q = query;
                if (options) {
                    params = { ...params, ...options };
                }
            } else if (typeof query === "object" && query !== null) {
                params = { ...query };
            } else if (options) {
                params = { ...options };
            }
            return client.getCKAN<CKANPackageSearchResult>("package_search", params);
        },

        /**
         * Belirli bir veri setinin (package) tüm meta bilgilerini ve kaynaklarını (resources) getirir.
         * @param idOrName Veri seti adı veya ID'si (Örn: 'akilli-tuvaletler', 'eshot-otobus-hatlari')
         */
        getPackage(idOrName: string): Promise<CKANPackage> {
            return client.getCKAN<CKANPackage>("package_show", { id: idOrName });
        },

        /**
         * Portaldaki tüm veri setlerinin slug isimlerini listeler.
         */
        listPackages(options?: { limit?: number; offset?: number }): Promise<string[]> {
            return client.getCKAN<string[]>("package_list", options || {});
        },

        /**
         * Herhangi bir aktif Datastore kaynağında (resource) filtreleme, arama ve sayfalama yapar.
         *
         * @param resourceId CKAN Resource UUID (Örn: 'd87de3c1-9bc0-4a8c-842a-90cd2a30d03a')
         * @param options Arama, filtreleme ve limit seçenekleri
         */
        searchDatastore<T = any>(
            resourceId: string,
            options?: Omit<CKANDatastoreSearchOptions, "resource_id">,
        ): Promise<CKANDatastoreSearchResult<T>> {
            const params: Record<string, any> = {
                resource_id: resourceId,
                ...options,
            };
            if (Array.isArray(params.fields)) {
                params.fields = params.fields.join(",");
            }
            return client.getCKAN<CKANDatastoreSearchResult<T>>("datastore_search", params);
        },

        /**
         * Bir Datastore kaynağının tüm verilerini tek seferde çeker (dump JSON).
         * @param resourceId CKAN Resource UUID
         */
        dumpDatastore<T = any>(resourceId: string): Promise<T> {
            return client.getCKANDump<T>(resourceId);
        },

        /**
         * Portaldaki yayıncı organizasyonların (Daire Başkanlıkları, İştirakler) listesini döndürür.
         */
        listOrganizations(): Promise<string[]> {
            return client.getCKAN<string[]>("organization_list");
        },

        /**
         * Portaldaki veri gruplarını (Ulaşım, Çevre, Sağlık, vb.) listeler.
         */
        listGroups(): Promise<string[]> {
            return client.getCKAN<string[]>("group_list");
        },

        /**
         * Portaldaki tüm etiketleri (tags) listeler.
         */
        listTags(options?: { query?: string }): Promise<string[]> {
            return client.getCKAN<string[]>("tag_list", options?.query ? { query: options.query } : {});
        },
    };
}
