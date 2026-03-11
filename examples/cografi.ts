/**
 * Coğrafi ve Tarihi Yerler Endpoint Örnekleri
 */
import { IzmirAPI } from "../src";

const api = new IzmirAPI();

async function main() {
    console.log("🗺️ Coğrafi ve Tarihi Yerler Örnekleri\n");

    const daglar = await api.cografi.getDagTepeList();
    console.log(`⛰️ Dağ ve Tepeler: ${daglar.onemliyer?.length || 0} adet`);

    const goller = await api.cografi.getGollerList();
    console.log(`💧 Göller: ${goller.onemliyer?.length || 0} adet`);

    const ormanlar = await api.cografi.getOrmanlarList();
    console.log(`🌲 Ormanlar: ${ormanlar.onemliyer?.length || 0} adet`);

    const koylar = await api.cografi.getKorfezKoylarList();
    console.log(`🌊 Körfez ve Koylar: ${koylar.onemliyer?.length || 0} adet`);

    const meydanlar = await api.cografi.getMeydanlarList();
    console.log(`🏛️ Meydanlar: ${meydanlar.onemliyer?.length || 0} adet`);

    console.log("\n📜 Tarihi Yerler:\n");

    const antik = await api.tarihi.getAntikKentlerList();
    console.log(`🏛️ Antik Kentler: ${antik.onemliyer?.length || 0} adet`);
    antik.onemliyer?.forEach((a) => console.log(`   ${a.ADI}`));

    const yapilar = await api.tarihi.getTarihiYapilarList();
    console.log(`\n🏰 Tarihi Yapılar: ${yapilar.onemliyer?.length || 0} adet`);

    const anitlar = await api.tarihi.getKuleAnitHeykellerList();
    console.log(`🗽 Anıtlar: ${anitlar.onemliyer?.length || 0} adet`);
}

main().catch(console.error);
