import { IzmirAPI } from "../src/index.js";

const api = new IzmirAPI();

async function main() {
    console.log("BİSİM verileri çekiliyor...\n");

    try {
        const istasyonlar = await api.bisim.getIstasyonList();
        
        if (!istasyonlar || istasyonlar.length === 0) {
            console.log("BİSİM istasyonu bulunamadı.");
            return;
        }

        console.log(`Toplam ${istasyonlar.length} BİSİM istasyonu bulundu.\n`);

        console.log("Örnek 5 İstasyon:");
        istasyonlar.slice(0, 5).forEach(istasyon => {
            const dolu = istasyon.bisikletSayisi;
            const bos = istasyon.bosParkYeri;
            const toplam = dolu + bos;
            console.log(`- ${istasyon.adi}`);
            console.log(`  🚲 Dolu: ${dolu} | 🅿️ Boş: ${bos} | Toplam Kapasite: ${toplam}`);
            console.log(`  📍 Durum: ${istasyon.aktif === 1 ? "Aktif" : "Pasif"}\n`);
        });

    } catch (error) {
        console.error("Hata oluştu:", error);
    }
}

main();
