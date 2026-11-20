import { IzmirClient } from "../client.js";
import { CKANDatastoreSearchOptions, CKANDatastoreSearchResult } from "./ckan.js";

export class CKANQueryBuilder<T = any> {
    private readonly client: IzmirClient;
    private readonly resourceId: string;
    private searchFilter?: string;
    private fieldFilters: Record<string, any> = {};
    private recordLimit = 100;
    private recordOffset = 0;
    private sortOrder?: string;
    private selectedFields?: string[];

    constructor(client: IzmirClient, resourceId: string) {
        this.client = client;
        this.resourceId = resourceId;
    }

    /**
     * Belirli bir alana göre filtre uygular (örn: ILCE = "KONAK").
     */
    where(field: string, value: any): this {
        this.fieldFilters[field] = value;
        return this;
    }

    /**
     * `where` metodunun takma adıdır.
     */
    filter(field: string, value: any): this {
        return this.where(field, value);
    }

    /**
     * Birden fazla filtreyi toplu nesne olarak ekler.
     */
    whereAll(filters: Record<string, any>): this {
        this.fieldFilters = { ...this.fieldFilters, ...filters };
        return this;
    }

    /**
     * Datastore üzerinde tam metin (full-text) araması yapar.
     */
    search(query: string): this {
        this.searchFilter = query;
        return this;
    }

    /**
     * Dönecek azami kayıt adedini belirler (varsayılan: 100).
     */
    limit(count: number): this {
        this.recordLimit = count;
        return this;
    }

    /**
     * Sayfalama başlangıç kaydını belirler (offset).
     */
    offset(startIndex: number): this {
        this.recordOffset = startIndex;
        return this;
    }

    /**
     * Sayfa numarası ve sayfa boyutuna göre offset ve limiti otomatik ayarlar.
     * @param page Sayfa numarası (1'den başlar)
     * @param pageSize Sayfa başına kayıt adedi (varsayılan: 50)
     */
    page(pageNumber: number, pageSize = 50): this {
        const p = Math.max(1, pageNumber);
        this.recordLimit = pageSize;
        this.recordOffset = (p - 1) * pageSize;
        return this;
    }

    /**
     * Sıralama kuralı tanımlar (örn: 'TARIH desc' veya 'ADI asc').
     */
    sort(field: string, direction: "asc" | "desc" = "asc"): this {
        this.sortOrder = `${field} ${direction}`;
        return this;
    }

    /**
     * Yalnızca seçilen kolonların getirilmesini sağlar.
     */
    fields(fields: string[]): this {
        this.selectedFields = fields;
        return this;
    }

    /**
     * Oluşturulan sorgu parametrelerini saf nesne olarak döndürür.
     */
    toParams(): CKANDatastoreSearchOptions {
        const params: CKANDatastoreSearchOptions = {
            resource_id: this.resourceId,
            limit: this.recordLimit,
            offset: this.recordOffset,
        };

        if (this.searchFilter) {
            params.q = this.searchFilter;
        }

        if (Object.keys(this.fieldFilters).length > 0) {
            params.filters = this.fieldFilters;
        }

        if (this.sortOrder) {
            params.sort = this.sortOrder;
        }

        if (this.selectedFields && this.selectedFields.length > 0) {
            params.fields = this.selectedFields;
        }

        return params;
    }

    /**
     * Hazırlanan sorguyu CKAN Datastore API üzerinde çalıştırır.
     */
    async execute(): Promise<CKANDatastoreSearchResult<T>> {
        const params = this.toParams();
        const apiParams: Record<string, any> = { ...params };
        if (Array.isArray(apiParams.fields)) {
            apiParams.fields = apiParams.fields.join(",");
        }
        return this.client.getCKAN<CKANDatastoreSearchResult<T>>("datastore_search", apiParams);
    }

    /**
     * Sayfalama yaparak tüm kayıtları (veya belirtilen azami sayıya kadar) dizi olarak çeker.
     * @param options Toplu çekme seçenekleri (batchSize, maxRecords)
     */
    async fetchAll(options: { batchSize?: number; maxRecords?: number } = {}): Promise<T[]> {
        const batchSize = options.batchSize ?? 1000;
        const maxRecords = options.maxRecords ?? Infinity;
        const allRecords: T[] = [];
        let currentOffset = this.recordOffset;

        while (allRecords.length < maxRecords) {
            const currentLimit = Math.min(batchSize, maxRecords - allRecords.length);
            const clone = new CKANQueryBuilder<T>(this.client, this.resourceId);
            clone.fieldFilters = { ...this.fieldFilters };
            clone.searchFilter = this.searchFilter;
            clone.sortOrder = this.sortOrder;
            clone.selectedFields = this.selectedFields;
            clone.recordLimit = currentLimit;
            clone.recordOffset = currentOffset;

            const res = await clone.execute();
            if (!res.records || res.records.length === 0) {
                break;
            }

            allRecords.push(...res.records);
            currentOffset += res.records.length;

            if (res.records.length < currentLimit || currentOffset >= res.total) {
                break;
            }
        }

        return allRecords;
    }
}
