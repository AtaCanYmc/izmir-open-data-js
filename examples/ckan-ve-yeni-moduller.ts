import { IzmirAPI } from "../src/index.js";

async function main() {
    const api = new IzmirAPI();
    console.log("=== İzmir Açık Veri Portalı: CKAN ve Yeni Modüller ===\n");

    try {
        // 1. CKAN Veri Seti Arama
        console.log("1. CKAN Portalı Üzerinde 'tuvalet' Araması Yapılıyor...");
        const searchResult = await api.ckan.searchPackages("tuvalet", { rows: 3 });
        console.log(`Bulunan Veri Seti Sayısı: ${searchResult.count}`);
        for (const pkg of searchResult.results) {
            console.log(`  - ${pkg.title} (${pkg.name}) [${pkg.num_resources} kaynak]`);
        }

        // 2. Akıllı Tuvaletler
        console.log("\n2. Akıllı Tuvaletler Sorgulanıyor (Konak İlçesi)...");
        const tuvaletler = await api.tuvalet.getAkilliTuvaletler({
            filters: { ILCE: "KONAK" },
            limit: 2,
        });
        console.log(`Konak'taki Akıllı Tuvalet Sayısı: ${tuvaletler.total}`);
        for (const wc of tuvaletler.records) {
            console.log(`  - ${wc.TESIS_ADI} (${wc.ADRES}) [${wc.ENLEM}, ${wc.BOYLAM}]`);
        }

        // 3. İtfaiye Grupları (CBS)
        console.log("\n3. İtfaiye İstasyonları ve Grupları Listeleniyor...");
        const itfaiyeGruplari = await api.itfaiye.getGruplar();
        const ilkIkiGrup = itfaiyeGruplari.onemliyer?.slice(0, 2) || [];
        for (const g of ilkIkiGrup) {
            console.log(`  - ${g.ADI} (${g.ILCE})`);
        }

        // 4. İZUM Ana Arter Hız ve Seyahat Süresi Verileri
        console.log("\n4. İZUM Ana Arterler Hız ve Seyahat Süreleri Sorgulanıyor...");
        const hizlar = await api.izum.getAnaArterHizVeSure({ limit: 2 });
        for (const h of hizlar.records) {
            console.log(`  - ${h.BASLAMA} -> ${h.BITIS} | Hız: ${h.HIZ} km/s, Süre: ${h.SURE} dk (${h.SAAT})`);
        }

        console.log("\nİşlem başarıyla tamamlandı.");
    } catch (error: any) {
        console.error("Hata:", error.message);
    }
}

main();
