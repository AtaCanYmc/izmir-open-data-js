/**
 * Kamu Kurumları Endpoint Örnekleri
 */
import { IzmirAPI } from "../src";

const api = new IzmirAPI();

async function main() {
    console.log("🏛️ Kamu Kurumları Örnekleri\n");

    const bankalar = await api.kamu.getBankalarList();
    console.log(`🏦 Bankalar: ${bankalar.onemliyer?.length || 0} şube`);

    const belediyeler = await api.kamu.getBelediyelerList();
    console.log(`🏢 Belediyeler: ${belediyeler.onemliyer?.length || 0} adet`);

    const ptt = await api.kamu.getPttList();
    console.log(`📮 PTT: ${ptt.onemliyer?.length || 0} adet`);

    const noterler = await api.kamu.getNoterlerList();
    console.log(`📝 Noterler: ${noterler.onemliyer?.length || 0} adet`);

    const vergi = await api.kamu.getVergiDaireleriList();
    console.log(`💰 Vergi Daireleri: ${vergi.onemliyer?.length || 0} adet`);

    const itfaiye = await api.kamu.getItfaiyeGruplariList();
    console.log(`🚒 İtfaiye: ${itfaiye.onemliyer?.length || 0} adet`);

    const konsolosluk = await api.kamu.getKonsolosluklarList();
    console.log(`🏳️ Konsolosluklar: ${konsolosluk.onemliyer?.length || 0} adet`);
}

main().catch(console.error);
