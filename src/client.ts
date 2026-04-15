// Node.js ortamında window yoktur, tarayıcıda JSONP kullanılır
const isBrowser = typeof window !== 'undefined';

type FetchJsonpFunction = (url: string, options?: { jsonpCallback?: string; timeout?: number }) => Promise<{ json: () => Promise<any> }>;

export class IzmirClient {
    private readonly baseUrl: string;
    private readonly ckanBaseUrl: string;
    private readonly ckanDumpBaseUrl: string;
    private fetchJsonp: FetchJsonpFunction | null = null;

    constructor(
        baseUrl = "https://openapi.izmir.bel.tr/api/",
        ckanBaseUrl = "https://acikveri.bizizmir.com/api/3/action/",
        ckanDumpBaseUrl = "https://acikveri.bizizmir.com/datastore/dump/"
    ) {
        this.baseUrl = baseUrl;
        this.ckanBaseUrl = ckanBaseUrl;
        this.ckanDumpBaseUrl = ckanDumpBaseUrl;
    }

    async get(path: string) {
        const res = await fetch(this.baseUrl + path);

        if (!res.ok) {
            throw new Error(`API response error: ${res.status}`);
        }

        return res.json();
    }

    /**
     * CKAN API'den veri çeker.
     * Tarayıcıda JSONP, Node.js'de normal fetch kullanır.
     */
    async getCKAN<T = any>(action: string, params: Record<string, string | number> = {}): Promise<T> {
        const queryParams = new URLSearchParams();
        
        for (const [key, value] of Object.entries(params)) {
            queryParams.append(key, String(value));
        }

        const url = `${this.ckanBaseUrl}${action}?${queryParams.toString()}`;

        if (isBrowser) {
            return this.getCKANWithJsonp<T>(url);
        } else {
            return this.getCKANWithFetch<T>(url);
        }
    }

    /**
     * JSONP ile CKAN API çağrısı (tarayıcı için)
     */
    private async getCKANWithJsonp<T>(url: string): Promise<T> {
        try {
            // Lazy load fetch-jsonp
            if (!this.fetchJsonp) {
                const module = await import('fetch-jsonp');
                this.fetchJsonp = module.default;
            }

            const response = await this.fetchJsonp(url, {
                jsonpCallback: 'callback',
                timeout: 10000,
            });

            const data = await response.json();

            if (data.success) {
                return data.result as T;
            } else {
                throw new Error(data.error?.message || "API verisi alınamadı");
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`JSONP Hatası: ${error.message}`);
            }
            throw new Error("Bilinmeyen JSONP hatası");
        }
    }

    /**
     * Normal fetch ile CKAN API çağrısı (Node.js için)
     */
    private async getCKANWithFetch<T>(url: string): Promise<T> {
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`CKAN API response error: ${res.status}`);
            }

            const data = await res.json();

            if (data.success) {
                return data.result as T;
            } else {
                throw new Error(data.error?.message || "API verisi alınamadı");
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`CKAN Hatası: ${error.message}`);
            }
            throw new Error("Bilinmeyen CKAN hatası");
        }
    }

    /**
     * CKAN dump endpoint'inden veri çeker.
     * Tüm veriyi JSON formatında döndürür.
     * @param resourceId Kaynak ID'si
     */
    async getCKANDump<T = any>(resourceId: string): Promise<T> {
        const url = `${this.ckanDumpBaseUrl}${resourceId}?format=json`;

        if (isBrowser) {
            return this.getCKANDumpWithJsonp<T>(url);
        } else {
            return this.getCKANDumpWithFetch<T>(url);
        }
    }

    /**
     * JSONP ile CKAN dump API çağrısı (tarayıcı için)
     */
    private async getCKANDumpWithJsonp<T>(url: string): Promise<T> {
        try {
            if (!this.fetchJsonp) {
                const module = await import('fetch-jsonp');
                this.fetchJsonp = module.default;
            }

            const response = await this.fetchJsonp(url, {
                jsonpCallback: 'callback',
                timeout: 30000, // Dump daha büyük olabilir
            });

            const data = await response.json();
            return data as T;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`JSONP Hatası: ${error.message}`);
            }
            throw new Error("Bilinmeyen JSONP hatası");
        }
    }

    /**
     * Normal fetch ile CKAN dump API çağrısı (Node.js için)
     */
    private async getCKANDumpWithFetch<T>(url: string): Promise<T> {
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`CKAN Dump API response error: ${res.status}`);
            }

            const data = await res.json();
            return data as T;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`CKAN Dump Hatası: ${error.message}`);
            }
            throw new Error("Bilinmeyen CKAN Dump hatası");
        }
    }

    /**
     * CSV dosyasını çeker ve parse eder.
     * @param url CSV dosyasının URL'i
     * @param delimiter Ayırıcı karakter (varsayılan: ;)
     */
    async getCSV<T = Record<string, string>>(url: string, delimiter = ';'): Promise<T[]> {
        try {
            const res = await fetch(url);

            if (!res.ok) {
                throw new Error(`CSV API response error: ${res.status}`);
            }

            const text = await res.text();
            return this.parseCSV<T>(text, delimiter);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`CSV Hatası: ${error.message}`);
            }
            throw new Error("Bilinmeyen CSV hatası");
        }
    }

    /**
     * CSV string'i parse eder.
     * @param csv CSV string
     * @param delimiter Ayırıcı karakter
     */
    private parseCSV<T>(csv: string, delimiter: string): T[] {
        const lines = csv.trim().split('\n');
        if (lines.length < 2) return [];

        // Tırnak işaretlerini temizle
        const cleanValue = (val: string): string => {
            let cleaned = val.trim();
            if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
                cleaned = cleaned.slice(1, -1);
            }
            return cleaned;
        };

        const headers = lines[0].split(delimiter).map(h => cleanValue(h));
        const results: T[] = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(delimiter);
            const obj: Record<string, string | number> = {};

            for (let j = 0; j < headers.length; j++) {
                const rawValue = values[j]?.trim() || '';
                const value = cleanValue(rawValue);
                // Sayısal değerleri number'a çevir, ancak özel karakterler içeriyorsa string bırak
                // Örn: "06:00" (saat), "29-30" (hat numaraları), "True/False" string kalmalı
                if (value === '' || value.includes(':') || value.includes('-') || 
                    value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
                    obj[headers[j]] = value;
                } else {
                    const numValue = parseFloat(value);
                    obj[headers[j]] = !isNaN(numValue) ? numValue : value;
                }
            }

            results.push(obj as T);
        }

        return results;
    }
}
