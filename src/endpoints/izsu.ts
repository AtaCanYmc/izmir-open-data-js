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

export interface SuKaynagi {
    Adi: string;
    Enlem: number | null;
    Boylam: number | null;
    TurAdi: string; // Baraj - Kuyu
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

export interface SuAnalizSonucu {
    ParametreKodu: string;
    ParametreAdi: string;
    Birim: string;
    Standart: string;
    ParametreDegeri: string;
    SonucId: number;
    SonucTarihi: string; // ISO formatında olduğu için string, istersen Date de yapabilirsin
    NoktaKodu: string;
}

export interface SuAnalizKaydi {
    Tarih: string;
    NoktaTanimi: string;
    analizSonuclari: SuAnalizSonucu[];
}

export interface SuAnalizResponse {
    TumAnalizler: SuAnalizKaydi[];
}

export interface BarajKaliteAnalizi {
    ParametreAdi: string;
    Standart: string;
    Birim: string;
    IslenmisSu: string;    // Veriler string formatında (örn: "7,7" veya "<0,04")
    IslenmemisSu: string;
    Regulasyon: string | null;
}

export interface BarajAnalizGrubu {
    AnalizElemanlari: BarajKaliteAnalizi[];
}

export interface BarajAnalizKaydi {
    Tarih: string; // "2025-12-01T00:00:00"
    Analizler: BarajAnalizGrubu[];
}

export interface BarajAnalizResponse {
    BarajAnalizleri: BarajAnalizKaydi[];
}

export interface KesintiBilgisi {
    KesintiTarihi: string;
    Aciklama: string;
    IlceAdi: string;
    MahalleID: number[];
    Mahalleler: string;
    Tip: string;
    ArizaGiderilmeTarihi: string;
    IlceID: number;
    Birim: string;
    ArizaID: number;
    ArizaDurumu: string;
    GuncellemeTarihi: string;
    ArizaTipID: number;
    KayitTarihi: string;
    KesintiSuresi: string;
    Ongoru: string;
}

export interface IzsuSubeBilgisi {
    AktifMi: boolean;
    SubeAdresi: string;
    ENLEM: string;  // API'den string (örn: "38.419687") olarak dönüyor
    BOYLAM: string;
    IletisimDurumu: boolean;
    SubeAdi: string;
    SubeTelefon: string; // Birden fazla numara içerebilir (örn: "0 232... - 293...")
}

export interface IzsuVezneBilgisi {
    VezneAdi: string;
    VezneAdresi: string | null; // Mobil vezneler için null olabilir
    ENLEM: string | null;       // Koordinat verisi gelmeyebilir
    BOYLAM: string | null;
    AktifMi: boolean;
    Bolge: string;
}

export function izsu(client: IzmirClient) {
    return {
        /**
         * Su üretiminin aylara ve kaynaklara göre dağılımını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/su-uretiminin-aylara-ve-kaynaklara-gore-dagilimi
         */
        getSuUretimiDagilimi() {
            return client.get("izsu/suuretiminindagilimi") as Promise<SuUretimi[]>;
        },

        /**
         * Günlük su üretimi miktarlarını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/gunluk-su-uretimi-miktarlari
         */
        getGunlukSuUretimi() {
            return client.get("izsu/gunluksuuretimi") as Promise<GunlukUretimResponse>;
        },

        /**
         * Barajların doluluk oranlarını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/barajlarin-doluluk-oranlari
         */
        getBarajDolulukOranlari() {
            return client.get("izsu/barajdurum") as Promise<BarajSuDurumu[]>;
        },

        /**
         * Güncel haftalık analiz sonuçlarını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/haftalik-analiz-sonuclari
         */
        getHaftalikSuAnalizi() {
            return client.get("izsu/haftaliksuanalizleri") as Promise<SuAnalizResponse>;
        },

        /**
         * Baraj su kalite raporlarını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/baraj-su-kalite-raporlari
         */
        getBarajSuKaliteRaporlari() {
            return client.get("izsu/barajsukaliteraporlari") as Promise<BarajAnalizResponse>;
        },

        /**
         * Arıza kaynaklı düzensiz su kesintilerinin ilçe, mahalle, kesinti süresi, sebebi ve açıklama verilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/ariza-kaynakli-duzensiz-su-kesintileri
         */
        getArizaKaynakliKesintiList() {
            return client.get("izsu/arizakaynaklisukesintileri") as Promise<KesintiBilgisi[]>;
        },

        /**
         * Baraj ve kuyuların listesi ve konum bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/baraj-ve-kuyular
         */
        getBarajVeKuyuList() {
            return client.get("izsu/barajvekuyular") as Promise<SuKaynagi[]>;
        },

        /**
         * Şube adresleri, telefonları ve konum bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izsu-sube-ve-vezne-bilgileri
         */
        getIzsuSubeList() {
            return client.get("izsu/subeler") as Promise<IzsuSubeBilgisi[]>;
        },

        /**
         * Vezne adresleri, telefonları ve konum bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izsu-sube-ve-vezne-bilgileri
         */
        getIzsuVezneList() {
            return client.get("izsu/vezneler") as Promise<IzsuVezneBilgisi[]>;
        }
    };
}