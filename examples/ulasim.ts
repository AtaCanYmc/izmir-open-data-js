/**
 * Ulaşım Endpoint Örnekleri
 *
 * ESHOT, Metro, Tramvay, İZBAN, Vapur, BİSİM endpoint'lerini gösterir.
 */

import { IzmirAPI } from "../src";

const api = new IzmirAPI();

async function main() {
    console.log("🚌 Ulaşım Örnekleri\n");
    console.log("=".repeat(50));

    // ─────────────────────────────────────────────────────────────────
    // ESHOT - Yakın Duraklar
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n🚏 ESHOT - Konuma Yakın Duraklar:");
        // Konak Meydanı koordinatları
        const enlem = 38.4192;
        const boylam = 27.1287;

        const yakinDuraklar = await api.eshot.getYakinDurakList(enlem, boylam);

        console.log(`Konak Meydanı'na yakın ${yakinDuraklar.onemliyer?.length || 0} durak bulundu.\n`);

        yakinDuraklar.onemliyer?.slice(0, 3).forEach((durak, i) => {
            console.log(`${i + 1}. ${durak.ADI}`);
            console.log(`   📍 İlçe: ${durak.ILCE}`);
        });
    } catch (error) {
        console.error("Yakın duraklar alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // ESHOT - Durağa Yaklaşan Otobüsler
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n\n🚌 ESHOT - Durağa Yaklaşan Otobüsler:");
        const durakId = 21050; // Örnek durak ID

        const yaklasanlar = await api.eshot.getDuragaYaklasanOtobusList(durakId);

        console.log(`Durak ${durakId}'e yaklaşan ${yaklasanlar.length} otobüs var.\n`);

        yaklasanlar.slice(0, 5).forEach((otobus) => {
            console.log(`🚌 Hat ${otobus.HatNumarasi} - ${otobus.HatAdi}`);
            console.log(`   📍 Kalan durak: ${otobus.KalanDurakSayisi}`);
            console.log(`   ♿ Engelli erişimi: ${otobus.EngelliMi ? "Evet" : "Hayır"}`);
            console.log(`   🚲 Bisiklet aparatı: ${otobus.BisikletAparatliMi ? "Evet" : "Hayır"}`);
            console.log();
        });
    } catch (error) {
        console.error("Yaklaşan otobüsler alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // ESHOT - Hat Otobüs Konumları
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n🗺️ ESHOT - Hat Otobüs Konumları:");
        const hatId = 446; // Örnek hat

        const konumlar = await api.eshot.getHatOtobusKonumlari(hatId);

        console.log(`Hat ${hatId} üzerinde ${konumlar.HatOtobusKonumlari?.length || 0} otobüs aktif.\n`);

        konumlar.HatOtobusKonumlari?.slice(0, 3).forEach((otobus) => {
            console.log(`🚌 Otobüs #${otobus.OtobusId}`);
            console.log(`   📍 Konum: ${otobus.KoorX}, ${otobus.KoorY}`);
        });
    } catch (error) {
        console.error("Hat konumları alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // Metro
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n\n🚇 Metro İstasyonları:");
        const istasyonlar = await api.metro.getIstasyonList();

        console.log(`Toplam ${istasyonlar.length} metro istasyonu.\n`);

        istasyonlar.slice(0, 5).forEach((istasyon) => {
            console.log(`${istasyon.Sira}. ${istasyon.Adi}`);
            console.log(`   📍 Konum: ${istasyon.Enlem}, ${istasyon.Boylam}`);
            console.log(`   ✅ Aktif: ${istasyon.AktifMi ? "Evet" : "Hayır"}`);
        });
    } catch (error) {
        console.error("Metro istasyonları alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // Tramvay
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n\n🚃 Tramvay Hatları:");
        const hatlar = await api.tramvay.getHatList();

        console.log(`Toplam ${hatlar.length} tramvay hattı.\n`);

        hatlar.forEach((hat) => {
            console.log(`📍 ${hat.Adi}`);
            console.log(`   ${hat.HatBaslangic} ↔️ ${hat.HatBitis}`);
            console.log(`   Açıklama: ${hat.Aciklama}`);
            console.log();
        });

        // İlk hattın istasyonları
        if (hatlar.length > 0) {
            const ilkHat = hatlar[0];
            console.log(`\n🚏 "${ilkHat.Adi}" hattının istasyonları:`);

            const istasyonlar = await api.tramvay.getIstasyonList(ilkHat.HatId);
            istasyonlar.slice(0, 5).forEach((ist, i) => {
                console.log(`   ${i + 1}. ${ist.Adi}`);
            });
            if (istasyonlar.length > 5) {
                console.log(`   ... ve ${istasyonlar.length - 5} istasyon daha`);
            }
        }
    } catch (error) {
        console.error("Tramvay bilgileri alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // İZBAN
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n\n🚆 İZBAN İstasyonları:");
        const istasyonlar = await api.izban.getIstasyonList();

        console.log("İZBAN istasyon bilgileri alındı.\n");

        // Ücret hesaplama örneği
        console.log("💰 Örnek Ücret Hesaplama (Aliağa → Cumaovası):");
        const tarife = await api.izban.getTarife(1, 24, 0, 0);

        console.log(`   Tam bilet: ${tarife.TamUcret} TL`);
        console.log(`   Öğrenci: ${tarife.OgrenciUcret} TL`);
        console.log(`   60+ Yaş: ${tarife.Yas60Ucret} TL`);
        console.log(`   Toplam KM: ${tarife.ToplamKm} km`);
    } catch (error) {
        console.error("İZBAN bilgileri alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // Vapur
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n\n⛴️ Vapur İskeleleri:");
        const iskeleler = await api.vapur.getIskeleList();

        console.log(`Toplam ${iskeleler.length} iskele.\n`);

        iskeleler.slice(0, 5).forEach((iskele) => {
            console.log(`⚓ ${iskele.Adi}`);
            console.log(`   📍 Konum: ${iskele.Enlem}, ${iskele.Boylam}`);
            console.log(`   🚗 Arabalı vapur: ${iskele.ArabaliVapurIskelesiMi ? "Evet" : "Hayır"}`);
        });

        // Çalışma günleri
        console.log("\n📅 Vapur Çalışma Günleri:");
        const gunler = await api.vapur.getCalismaGunleri();
        console.log(`   Gün bilgileri alındı.`);
    } catch (error) {
        console.error("Vapur bilgileri alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // Otopark
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n\n🅿️ Otoparklar:");
        const otoparklar = await api.otopark.getList();

        console.log(`Toplam ${otoparklar.length} otopark.\n`);

        otoparklar.slice(0, 3).forEach((otopark) => {
            console.log(`🚗 ${otopark.name}`);
            console.log(`   📍 Durum: ${otopark.status === "Opened" ? "Açık" : "Kapalı"}`);
            console.log(`   🆓 Boş: ${otopark.occupancy.total.free} / Dolu: ${otopark.occupancy.total.occupied}`);
            console.log(`   💳 Ücretli: ${otopark.isPaid ? "Evet" : "Hayır"}`);
            console.log();
        });
    } catch (error) {
        console.error("Otopark bilgileri alınamadı:", error);
    }

    // ─────────────────────────────────────────────────────────────────
    // Diğer Ulaşım
    // ─────────────────────────────────────────────────────────────────
    try {
        console.log("\n✈️ Havaalanı:");
        const havaalanlari = await api.tren.getHavaalaniList();
        havaalanlari.onemliyer?.forEach((h) => {
            console.log(`   ${h.ADI} - ${h.ILCE}`);
        });

        console.log("\n🚂 Tren Garları:");
        const garlar = await api.tren.getTrenGarlariList();
        garlar.onemliyer?.forEach((g) => {
            console.log(`   ${g.ADI} - ${g.ILCE}`);
        });

        console.log("\n🚌 Otobüs Terminalleri:");
        const terminaller = await api.tren.getOtobusTerminalleriList();
        terminaller.onemliyer?.slice(0, 3).forEach((t) => {
            console.log(`   ${t.ADI} - ${t.ILCE}`);
        });
    } catch (error) {
        console.error("Diğer ulaşım bilgileri alınamadı:", error);
    }
}

main().catch(console.error);

