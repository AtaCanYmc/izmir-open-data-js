/**
 * Kültür ve Etkinlik Endpoint Örnekleri
 */
import { IzmirAPI } from "../src";

const api = new IzmirAPI();

async function main() {
    console.log("🎭 Kültür ve Etkinlik Örnekleri\n");

    const etkinlikler = await api.etkinlikler.getList();
    console.log(`🎪 Güncel Etkinlikler: ${etkinlikler.length} adet\n`);
    etkinlikler.slice(0, 3).forEach((e) => {
        console.log(`🎭 ${e.Adi}`);
        console.log(`   📍 ${e.EtkinlikMerkezi}`);
        console.log(`   💰 ${e.UcretsizMi ? "Ücretsiz" : "Ücretli"}\n`);
    });

    const kutuphaneler = await api.kutuphane.getKutuphanelerList();
    console.log(`📚 Kütüphaneler: ${kutuphaneler.onemliyer?.length || 0} adet`);

    const muzeler = await api.kutuphane.getMuzelerList();
    console.log(`🏛️ Müzeler: ${muzeler.onemliyer?.length || 0} adet`);

    const tiyatrolar = await api.kutuphane.getTiyatrolarList();
    console.log(`🎭 Tiyatrolar: ${tiyatrolar.onemliyer?.length || 0} adet`);

    const sinemalar = await api.kutuphane.getSinemalarList();
    console.log(`🎬 Sinemalar: ${sinemalar.onemliyer?.length || 0} adet`);
}

main().catch(console.error);
