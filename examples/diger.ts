/**
 * Diğer Endpoint Örnekleri
 */
import { IzmirAPI } from "../src";

const api = new IzmirAPI();

async function main() {
    console.log("📌 Diğer Endpoint Örnekleri\n");

    const wifi = await api.wizmirnet.getList();
    console.log(`📶 WiFi Noktaları: ${wifi.onemliyer?.length || 0} adet`);

    const muhtarliklar = await api.muhtarliklar.getList();
    console.log(`🏘️ Muhtarlıklar: ${muhtarliklar.onemliyer?.length || 0} adet`);

    const pazarlar = await api.pazarlar.getList();
    console.log(`🛒 Semt Pazarları: ${pazarlar.onemliyer?.length || 0} adet`);

    const taksi = await api.taksi.getDurakList();
    console.log(`🚕 Taksi Durakları: ${taksi.onemliyer?.length || 0} adet`);

    const afet = await api.afetler.getAcilDurumToplanmaAlanlari();
    console.log(`⚠️ Afet Toplanma Alanları: ${afet.onemliyer?.length || 0} adet`);

    const hizmet = await api.hizmet.getHizmetNoktaList();
    console.log(`🏢 İBB Hizmet Noktaları: ${hizmet.onemliyer?.length || 0} adet`);

    console.log("\n👨‍👩‍👧‍👦 Sosyal Hizmetler:");
    const huzurevleri = await api.sosyal.getHuzurevleriList();
    console.log(`   🏠 Huzurevleri: ${huzurevleri.onemliyer?.length || 0} adet`);

    console.log("\n🏖️ Plaj ve Turizm:");
    const plajlar = await api.plaj.getPlajlarList();
    console.log(`   🏖️ Plajlar: ${plajlar.onemliyer?.length || 0} adet`);

    const hamamlar = await api.plaj.getHamamlarList();
    console.log(`   🛁 Hamamlar: ${hamamlar.onemliyer?.length || 0} adet`);
}

main().catch(console.error);
