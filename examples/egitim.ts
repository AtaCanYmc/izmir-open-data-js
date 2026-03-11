/**
 * Eğitim Endpoint Örnekleri
 */
import { IzmirAPI } from "../src";

const api = new IzmirAPI();

async function main() {
    console.log("📚 Eğitim Örnekleri\n");

    const uni = await api.egitim.getUniversitelerList();
    console.log(`🎓 Üniversiteler: ${uni.onemliyer?.length || 0} adet`);
    uni.onemliyer?.forEach((u) => console.log(`   ${u.ADI}`));

    const lise = await api.egitim.getLiselerList();
    console.log(`\n🏫 Liseler: ${lise.onemliyer?.length || 0} adet`);

    const orta = await api.egitim.getOrtaokullarList();
    console.log(`📖 Ortaokullar: ${orta.onemliyer?.length || 0} adet`);

    const ilk = await api.egitim.getIlkokullarList();
    console.log(`✏️ İlkokullar: ${ilk.onemliyer?.length || 0} adet`);

    const ana = await api.egitim.getAnaokullarList();
    console.log(`👶 Anaokulları: ${ana.onemliyer?.length || 0} adet`);

    const halk = await api.egitim.getHalkEgitimList();
    console.log(`📝 Halk Eğitim: ${halk.onemliyer?.length || 0} adet`);
}

main().catch(console.error);
