import {IzmirClient} from "../client";

export interface SuUretimi {
    UretimKaynagi: string;
    UretimMiktari: number;
    Yil: number;
    Ay: number;
}

export interface BarajKuyuUretim {
    TurAdi: string;
    BarajKuyuAdi: string;
    BarajKuyuId: number;
    UretimMiktari: number;
}

export interface GunlukUretimResponse {
    UretimTarihi: string; // ISO date string
    BarajKuyuUretimleri: BarajKuyuUretim[];
}

export interface BarajSuDurumu {
    SuDurumu: number;
    BarajKuyuAdi: string;
    SuYuksekligi: number;
    KullanılabilirGolSuHacmi: number;
    Boylam: number | null;
    TuketilebilirSuKapasitesi: number;
    MaksimumSuKapasitesi: number;
    BarajSuDurumuGosterimi: string | null;
    MinimumSuYuksekligi: number;
    DolulukOrani: number;
    DurumTarihi: string; // ISO date
    MinimumSuKapasitesi: number;
    Enlem: number | null;
    BarajKuyuId: number;
    MaksimumSuYuksekligi: number;
}

export function izsu(client: IzmirClient) {
    return {
        /**
         * Su üretiminin aylara ve kaynaklara göre dağılımını içeren web servisi.
         * Kaynak: https://acikveri.bizizmir.com/dataset/su-uretiminin-aylara-ve-kaynaklara-gore-dagilimi
         */
        getSuUretimiDagilimi() {
            return client.get("izsu/suuretiminindagilimi") as Promise<SuUretimi[]>;
        },

        getGunlukSuUretimi() {
            return client.get("izsu/gunluksuuretimi") as Promise<GunlukUretimResponse>;
        },

        /**
         * Barajların doluluk oranlarını içeren web servisi.
         * Kaynak: https://acikveri.bizizmir.com/dataset/barajlarin-doluluk-oranlari
         */
        getBarajDolulukOranlari() {
            return client.get("izsu/barajdurum") as Promise<BarajSuDurumu[]>;
        }
    };
}