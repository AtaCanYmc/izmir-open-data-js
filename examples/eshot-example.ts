import { IzmirAPI } from "../src";

const api = new IzmirAPI();

async function main() {
    console.log("Eshot verileri çekiliyor...\n");

    try {
        // En yakın durakları listele
        // Konak Meydanı koordinatları (örnek)
        const enlem = 38.4192;
        const boylam = 27.1287;
        
        console.log(`Konum: ${enlem}, ${boylam} için en yakın duraklar aranıyor...`);
        const yakinDuraklar = await api.eshot.getYakinDurakList(enlem, boylam);
        
        if (yakinDuraklar && yakinDuraklar.onemliyer && yakinDuraklar.onemliyer.length > 0) {
            console.log(`Bulunan en yakın durak: ${yakinDuraklar.onemliyer[0].ADI}\n`);
        }

        // Tüm hatları çek ve ilk 5 tanesini göster
        console.log("Tüm ESHOT hatları listeleniyor...");
        const hatlar = await api.eshot.getHatlar();
        console.log(`Toplam ${hatlar.length} hat bulundu.`);
        
        hatlar.slice(0, 5).forEach((hat) => {
            console.log(`- Hat ${hat.HAT_NO}: ${hat.HAT_ADI} (${hat.HAT_BASLANGIC} - ${hat.HAT_BITIS})`);
        });

    } catch (error) {
        console.error("Hata oluştu:", error);
    }
}

main();
