// Node.js ortamında window yoktur, tarayıcıda JSONP kullanılır
const isBrowser = typeof window !== 'undefined';

type FetchJsonpFunction = (url: string, options?: { jsonpCallback?: string; timeout?: number }) => Promise<{ json: () => Promise<any> }>;

export class IzmirClient {
    private readonly baseUrl: string;
    private readonly ckanBaseUrl: string;
    private fetchJsonp: FetchJsonpFunction | null = null;

    constructor(
        baseUrl = "https://openapi.izmir.bel.tr/api/",
        ckanBaseUrl = "https://acikveri.bizizmir.com/api/3/action/"
    ) {
        this.baseUrl = baseUrl;
        this.ckanBaseUrl = ckanBaseUrl;
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
}
