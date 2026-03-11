/**
 * İZSU Endpoint Örnekleri
 *
 * Su üretimi, baraj doluluk oranları, su analizi ve kesinti bilgileri.
 */

import { IzmirAPI } from "../src";

const api = new IzmirAPI();

async function main() {
    console.log("💧 İZSU Örnekleri\n");
    console.log("=".repeat(50));

    // ─────────────────────────────────────────────────────────────────
    // Baraj Doluluk Oranları
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n🏞️ Baraj Doluluk Oranları:");
        const barajlar = await api.izsu.getBarajDolulukOranlari();

        console.log(`Toplam ${barajlar.length} baraj/kuyu izleniyor.\n`);

        barajlar
            .filter((b) => b.DolulukOrani > 0)
            .sort((a, b) => b.DolulukOrani - a.DolulukOrani)
            .slice(0, 5)
            .forEach((baraj) => {
                const dolulukBar = "█".repeat(Math.floor(baraj.DolulukOrani / 10)) +
                    "░".repeat(10 - Math.floor(baraj.DolulukOrani / 10));
                console.log(`💧 ${baraj.BarajKuyuAdi}`);
                console.log(`   [${dolulukBar}] ${baraj.DolulukOrani.toFixed(1)}%`);
                console.log(`   Su yüksekliği: ${baraj.SuYuksekligi} m`);
                console.log();
            });
    } catch (error) {
        console.error("Baraj bilgileri alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // Günlük Su Üretimi
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n📊 Günlük Su Üretimi:");
        const uretim = await api.izsu.getGunlukSuUretimi();

        console.log(`Üretim Tarihi: ${new Date(uretim.UretimTarihi).toLocaleDateString("tr-TR")}\n`);

        const toplamUretim = uretim.BarajKuyuUretimleri.reduce((t, b) => t + b.UretimMiktari, 0);
        console.log(`Toplam Üretim: ${toplamUretim.toLocaleString("tr-TR")} m³\n`);

        // Kaynak türüne göre grupla
        const kaynakGruplari = uretim.BarajKuyuUretimleri.reduce((acc, b) => {
            acc[b.TurAdi] = (acc[b.TurAdi] || 0) + b.UretimMiktari;
            return acc;
        }, {} as Record<string, number>);

        console.log("Kaynak türüne göre üretim:");
        Object.entries(kaynakGruplari).forEach(([tur, miktar]) => {
            const oran = ((miktar / toplamUretim) * 100).toFixed(1);
            console.log(`   ${tur}: ${miktar.toLocaleString("tr-TR")} m³ (%${oran})`);
        });
    } catch (error) {
        console.error("Günlük üretim bilgileri alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // Su Üretimi Dağılımı (Aylık)
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n\n📅 Su Üretimi Dağılımı (Aylık):");
        const dagilim = await api.izsu.getSuUretimiDagilimi();

        // Son 6 ayı göster
        const sonAylar = dagilim.slice(-6);
        console.log("Son 6 ay üretim miktarları:\n");

        sonAylar.forEach((ay) => {
            const ayAdi = new Date(ay.Yil, ay.Ay - 1).toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
            console.log(`   ${ayAdi}: ${ay.UretimMiktari.toLocaleString("tr-TR")} m³`);
        });
    } catch (error) {
        console.error("Su üretimi dağılımı alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // Haftalık Su Analizi
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n\n🔬 Haftalık Su Analizi:");
        const analiz = await api.izsu.getHaftalikSuAnalizi();

        if (analiz.TumAnalizler && analiz.TumAnalizler.length > 0) {
            const sonAnaliz = analiz.TumAnalizler[0];
            console.log(`Tarih: ${new Date(sonAnaliz.Tarih).toLocaleDateString("tr-TR")}`);
            console.log(`Nokta: ${sonAnaliz.NoktaTanimi}\n`);

            console.log("Analiz Sonuçları:");
            sonAnaliz.analizSonuclari?.slice(0, 5).forEach((sonuc) => {
                console.log(`   ${sonuc.ParametreAdi}: ${sonuc.ParametreDegeri} ${sonuc.Birim}`);
            });
        }
    } catch (error) {
        console.error("Su analizi alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // Arıza Kaynaklı Kesintiler
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n\n⚠️ Arıza Kaynaklı Su Kesintileri:");
        const kesintiler = await api.izsu.getArizaKaynakliKesintiList();

        if (kesintiler.length === 0) {
            console.log("Şu anda aktif kesinti bulunmuyor. ✅");
        } else {
            console.log(`${kesintiler.length} aktif kesinti var.\n`);

            kesintiler.slice(0, 3).forEach((kesinti) => {
                console.log(`📍 ${kesinti.IlceAdi} - ${kesinti.Mahalleler}`);
                console.log(`   Tarih: ${new Date(kesinti.KesintiTarihi).toLocaleDateString("tr-TR")}`);
                console.log(`   Açıklama: ${kesinti.Aciklama}`);
                console.log(`   Durum: ${kesinti.ArizaDurumu}`);
                console.log();
            });
        }
    } catch (error) {
        console.error("Kesinti bilgileri alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // Baraj ve Kuyular
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n🗺️ Baraj ve Kuyular:");
        const kaynaklar = await api.izsu.getBarajVeKuyuList();

        const barajlar = kaynaklar.filter((k) => k.TurAdi === "Baraj");
        const kuyular = kaynaklar.filter((k) => k.TurAdi === "Kuyu");

        console.log(`Toplam ${barajlar.length} baraj, ${kuyular.length} kuyu.\n`);

        console.log("Barajlar:");
        barajlar.slice(0, 5).forEach((b) => {
            console.log(`   🏞️ ${b.Adi}`);
        });
    } catch (error) {
        console.error("Baraj ve kuyu listesi alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // İZSU Şube ve Vezneler
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n\n🏢 İZSU Şubeleri:");
        const subeler = await api.izsu.getIzsuSubeList();

        console.log(`Toplam ${subeler.length} şube.\n`);
        subeler.slice(0, 3).forEach((sube) => {
            console.log(`📍 ${sube.SubeAdi}`);
            console.log(`   Adres: ${sube.SubeAdresi}`);
            console.log(`   Tel: ${sube.SubeTelefon}`);
            console.log();
        });

        console.log("\n💳 İZSU Vezneleri:");
        const vezneler = await api.izsu.getIzsuVezneList();
        console.log(`Toplam ${vezneler.length} vezne noktası.`);
    } catch (error) {
        console.error("Şube/vezne bilgileri alınamadı:", error);
    }
}

main().catch(console.error);

