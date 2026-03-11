/**
 * Sağlık Endpoint Örnekleri
 */
import { IzmirAPI } from "../src";

const api = new IzmirAPI();

async function main() {
    console.log("🏥 Sağlık Örnekleri\n");

    const hastaneler = await api.saglik.getHastanelerList();
    console.log(`🏥 Hastaneler: ${hastaneler.onemliyer?.length || 0} adet`);
    hastaneler.onemliyer?.slice(0, 3).forEach((h) => {
        console.log(`   ${h.ADI} - ${h.ILCE}`);
    });

    const acil = await api.saglik.getAcilYardimIstasyonlariList();
    console.log(`\n🚑 Acil Yardım: ${acil.onemliyer?.length || 0} istasyon`);

    const asm = await api.saglik.getAileSagligiMerkezleriList();
    console.log(`\n👨‍👩‍👧 ASM: ${asm.onemliyer?.length || 0} merkez`);

    const kan = await api.saglik.getKanMerkezleriList();
    console.log(`\n🩸 Kan Merkezleri:`);
    kan.onemliyer?.forEach((m) => console.log(`   ${m.ADI}`));

    const vet = await api.saglik.getVeterinerliklerList();
    console.log(`\n🐾 Veterinerlikler: ${vet.onemliyer?.length || 0} adet`);
}

main().catch(console.error);

