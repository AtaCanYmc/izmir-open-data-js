/**
 * Eczane Endpoint Örnekleri
 *
 * Bu örnek dosyası eczane ve nöbetçi eczane sorgularını gösterir.
 */

import { IzmirAPI } from "../src";

const api = new IzmirAPI();

async function main() {
    console.log("🏥 Eczane Örnekleri\n");
    console.log("=".repeat(50));

    // ─────────────────────────────────────────────────────────────────
    // Nöbetçi Eczaneler
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n📋 Nöbetçi Eczaneler:");
        const nobetciler = await api.eczaneler.getNobetciList();

        console.log(`Toplam ${nobetciler.length} nöbetçi eczane bulundu.\n`);

        // İlk 3 eczaneyi göster
        nobetciler.slice(0, 3).forEach((eczane, i) => {
            console.log(`${i + 1}. ${eczane.Adi}`);
            console.log(`   📍 Adres: ${eczane.Adres}`);
            console.log(`   📞 Telefon: ${eczane.Telefon}`);
            console.log(`   🏘️ Bölge: ${eczane.BolgeAciklama}`);
            console.log();
        });
    } catch (error) {
        console.error("Nöbetçi eczaneler alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // Tüm Eczaneler
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n📋 Tüm Eczaneler:");
        const tumEczaneler = await api.eczaneler.getList();

        console.log(`Toplam ${tumEczaneler.length} eczane kayıtlı.\n`);

        // Bölgelere göre grupla
        const bolgeGruplari = tumEczaneler.reduce((acc, eczane) => {
            const bolge = eczane.BolgeAciklama || "Bilinmiyor";
            acc[bolge] = (acc[bolge] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        console.log("Bölgelere göre eczane sayıları:");
        Object.entries(bolgeGruplari)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .forEach(([bolge, sayi]) => {
                console.log(`   ${bolge}: ${sayi} eczane`);
            });
    } catch (error) {
        console.error("Eczane listesi alınamadı:", error);
    }
}

main().catch(console.error);

