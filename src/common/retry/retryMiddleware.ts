export interface RetryConfig {
    /** Azami deneme adedi (varsayılan: 3, 0 ise yeniden deneme kapalı) */
    retries?: number;
    /** İlk bekleme süresi milisaniye (varsayılan: 300 ms) */
    baseDelayMs?: number;
    /** En fazla bekleme süresi milisaniye (varsayılan: 3000 ms) */
    maxDelayMs?: number;
    /** Yeniden denenecek HTTP durum kodları (varsayılan: [408, 429, 500, 502, 503, 504]) */
    statusCodes?: number[];
    /** Jitter (rastgele bekleme sapması) eklensin mi? (varsayılan: true) */
    jitter?: boolean;
}

export const DEFAULT_RETRY_CONFIG: Required<RetryConfig> = {
    retries: 3,
    baseDelayMs: 300,
    maxDelayMs: 3000,
    statusCodes: [408, 429, 500, 502, 503, 504],
    jitter: true,
};

function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function calculateBackoff(attempt: number, config: Required<RetryConfig>): number {
    const safeAttempt = Math.max(1, Math.min(20, attempt));
    const baseDelay = Math.max(0, config.baseDelayMs);
    const maxDelay = Math.max(baseDelay, config.maxDelayMs);
    const exponential = Math.min(maxDelay, baseDelay * Math.pow(2, safeAttempt - 1));
    if (!config.jitter) {
        return exponential;
    }
    // Full jitter formülü: [0, exponential] arasında rastgele süre
    return Math.floor(Math.random() * exponential);
}

export function isRetryableError(error: any, retryStatusCodes: number[]): boolean {
    if (!error) return false;

    // HTTP durum kodu içeren hatalar
    const message = String(error.message ?? "");
    for (const code of retryStatusCodes) {
        if (message.includes(String(code)) || error.status === code) {
            return true;
        }
    }

    // Ağ seviyesi geçici hatalar (fetch timeout, network error, reset)
    const transientPhrases = [
        "network",
        "timeout",
        "econnreset",
        "econnrefused",
        "etimedout",
        "fetch failed",
        "failed to fetch",
    ];

    const lower = message.toLowerCase();
    return transientPhrases.some((phrase) => lower.includes(phrase));
}

export async function executeWithRetry<T>(
    operation: () => Promise<T>,
    customConfig?: RetryConfig | boolean,
): Promise<T> {
    if (customConfig === false) {
        return operation();
    }

    const config: Required<RetryConfig> = {
        ...DEFAULT_RETRY_CONFIG,
        ...(typeof customConfig === "object" ? customConfig : {}),
    };

    const maxRetries = Math.max(0, Math.min(10, typeof config.retries === "number" ? config.retries : 3));
    if (maxRetries <= 0) {
        return operation();
    }

    let lastError: any;
    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
        try {
            return await operation();
        } catch (error: any) {
            lastError = error;
            // Son denemede veya hata tekrarlanabilir değilse doğrudan fırlat
            if (attempt > maxRetries || !isRetryableError(error, config.statusCodes)) {
                throw error;
            }

            const delayMs = calculateBackoff(attempt, config);
            if (delayMs > 0) {
                await sleep(delayMs);
            }
        }
    }

    throw lastError;
}
