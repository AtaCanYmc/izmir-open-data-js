export class IzmirClient {
    private readonly baseUrl: string;

    constructor(baseUrl = "https://acikveri.bizizmir.com/api/") {
        this.baseUrl = baseUrl;
    }

    async get(path: string) {
        const res = await fetch(this.baseUrl + path);

        if (!res.ok) {
            throw new Error(`API response error: ${res.status}`);
        }

        return res.json();
    }
}
