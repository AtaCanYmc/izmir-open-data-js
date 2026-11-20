export interface CacheProvider {
    get<T>(key: string): Promise<T | undefined> | T | undefined;
    set<T>(key: string, value: T, ttlMs?: number): Promise<void> | void;
    delete(key: string): Promise<boolean | void> | boolean | void;
    clear(): Promise<void> | void;
    has?(key: string): Promise<boolean> | boolean;
}

export interface MemoryCacheOptions {
    /** Varsayılan önbellek ömrü (milisaniye cinsinden, varsayılan: 300_000 ms / 5 dk) */
    defaultTtlMs?: number;
    /** Saklanabilecek azami kayıt adedi (varsayılan: 500) */
    maxItems?: number;
}

interface CacheEntry<T> {
    value: T;
    expiresAt: number;
}

export class MemoryCache implements CacheProvider {
    private readonly cache = new Map<string, CacheEntry<any>>();
    private readonly defaultTtlMs: number;
    private readonly maxItems: number;

    constructor(options: MemoryCacheOptions = {}) {
        this.defaultTtlMs = options.defaultTtlMs ?? 300_000;
        this.maxItems = options.maxItems ?? 500;
    }

    get<T>(key: string): T | undefined {
        const entry = this.cache.get(key);
        if (!entry) {
            return undefined;
        }

        if (Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return undefined;
        }

        return entry.value as T;
    }

    set<T>(key: string, value: T, ttlMs?: number): void {
        const ttl = ttlMs ?? this.defaultTtlMs;
        const expiresAt = Date.now() + ttl;

        // Kapasite aşıldığında en eski anahtarı sil (FIFO tahliye)
        if (this.cache.size >= this.maxItems && !this.cache.has(key)) {
            const oldestKey = this.cache.keys().next().value;
            if (oldestKey !== undefined) {
                this.cache.delete(oldestKey);
            }
        }

        this.cache.set(key, { value, expiresAt });
    }

    delete(key: string): boolean {
        return this.cache.delete(key);
    }

    clear(): void {
        this.cache.clear();
    }

    has(key: string): boolean {
        return this.get(key) !== undefined;
    }

    size(): number {
        // Süresi dolmuş kayıtları filtreleyerek gerçek sayıyı döndür
        let count = 0;
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiresAt) {
                this.cache.delete(key);
            } else {
                count++;
            }
        }
        return count;
    }
}
