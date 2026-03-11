/**
 * Tüm Endpoint Örneklerini Çalıştır
 *
 * Kullanım: npx tsx examples/all.ts
 */
import { IzmirAPI } from "../src";

const api = new IzmirAPI();

async function main() {
    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log("║       İzmir Açık Veri API - Tüm Endpoint Örnekleri         ║");
    console.log("╚════════════════════════════════════════════════════════════╝\n");

    // Eczaneler
    console.log("🏥 ECZANELER");
    const nobetci = await api.eczaneler.getNobetciList();
    console.log(`   Nöbetçi: ${nobetci.length} adet`);

    // Ulaşım
    console.log("\n🚌 ULAŞIM");
    const metro = await api.metro.getIstasyonList();
    console.log(`   Metro İstasyonları: ${metro.length} adet`);
    const tramvay = await api.tramvay.getHatList();
    console.log(`   Tramvay Hatları: ${tramvay.length} adet`);
    const vapur = await api.vapur.getIskeleList();
    console.log(`   Vapur İskeleleri: ${vapur.length} adet`);

    // İZSU
    console.log("\n💧 İZSU");
    const baraj = await api.izsu.getBarajDolulukOranlari();
    console.log(`   Baraj/Kuyu: ${baraj.length} adet`);

    // Sağlık
    console.log("\n🏥 SAĞLIK");
    const hastane = await api.saglik.getHastanelerList();
    console.log(`   Hastaneler: ${hastane.onemliyer?.length || 0} adet`);

    // Eğitim
    console.log("\n📚 EĞİTİM");
    const uni = await api.egitim.getUniversitelerList();
    console.log(`   Üniversiteler: ${uni.onemliyer?.length || 0} adet`);

    // Kültür
    console.log("\n🎭 KÜLTÜR");
    const etkinlik = await api.etkinlikler.getList();
    console.log(`   Etkinlikler: ${etkinlik.length} adet`);
    const muze = await api.kutuphane.getMuzelerList();
    console.log(`   Müzeler: ${muze.onemliyer?.length || 0} adet`);

    // Kamu
    console.log("\n🏛️ KAMU");
    const ptt = await api.kamu.getPttList();
    console.log(`   PTT: ${ptt.onemliyer?.length || 0} adet`);

    // Coğrafi
    console.log("\n🗺️ COĞRAFİ");
    const dag = await api.cografi.getDagTepeList();
    console.log(`   Dağ/Tepe: ${dag.onemliyer?.length || 0} adet`);

    // Tarihi
    console.log("\n📜 TARİHİ");
    const antik = await api.tarihi.getAntikKentlerList();
    console.log(`   Antik Kentler: ${antik.onemliyer?.length || 0} adet`);

    // Diğer
    console.log("\n📌 DİĞER");
    const wifi = await api.wizmirnet.getList();
    console.log(`   WiFi Noktaları: ${wifi.onemliyer?.length || 0} adet`);
    const afet = await api.afetler.getAcilDurumToplanmaAlanlari();
    console.log(`   Afet Toplanma: ${afet.onemliyer?.length || 0} adet`);

    console.log("\n" + "═".repeat(60));
    console.log("✅ Tüm örnekler tamamlandı!");
}

main().catch(console.error);

