import { IzmirClient } from "./client.js";
import { eczaneler } from "./endpoints/eczaneler.js";
import { muhtarliklar } from "./endpoints/muhtarliklar";
import { wizmirnet } from "./endpoints/wizmirnet";
import { izsu } from "./endpoints/izsu";
import { afetler } from "./endpoints/afetler";
import { pazarlar } from "./endpoints/pazarlar";
import { taksi } from "./endpoints/taksi";
import { etkinlikler } from "./endpoints/etkinlikler";
import { iklim } from "./endpoints/iklim";
import { eshot } from "./endpoints/eshot";
import { bisim } from "./endpoints/bisim";
import { tramvay } from "./endpoints/tramvay";
import { metro } from "./endpoints/metro";
import { izban } from "./endpoints/izban";
import { otopark } from "./endpoints/otopark";
import { hizmet } from "./endpoints/hizmet";
import { vapur } from "./endpoints/vapur";
// Yeni endpoint'ler
import { egitim } from "./endpoints/egitim";
import { saglik } from "./endpoints/saglik";
import { kutuphane } from "./endpoints/kutuphane";
import { tarihi } from "./endpoints/tarihi";
import { plaj } from "./endpoints/plaj";
import { tren } from "./endpoints/tren";
import { kamu } from "./endpoints/kamu";
import { sosyal } from "./endpoints/sosyal";
import { spor } from "./endpoints/spor";
import { cografi } from "./endpoints/cografi";
import { iztek } from "./endpoints/iztek";
import { trafik } from "./endpoints/trafik";
import { izmirimkart } from "./endpoints/izmirimkart";

export class IzmirAPI {
    private readonly client: IzmirClient;

    eczaneler;
    muhtarliklar;
    wizmirnet;
    izsu;
    afetler;
    pazarlar;
    taksi;
    etkinlikler;
    iklim;
    eshot;
    bisim;
    tramvay;
    metro;
    izban;
    otopark;
    hizmet;
    vapur;
    // Yeni endpoint'ler
    egitim;
    saglik;
    kutuphane;
    tarihi;
    plaj;
    tren;
    kamu;
    sosyal;
    spor;
    cografi;
    iztek;
    trafik;
    izmirimkart;

    constructor(baseUrl?: string) {
        this.client = new IzmirClient(baseUrl);
        this.eczaneler = eczaneler(this.client);
        this.muhtarliklar = muhtarliklar(this.client);
        this.wizmirnet = wizmirnet(this.client);
        this.izsu = izsu(this.client);
        this.afetler = afetler(this.client);
        this.pazarlar = pazarlar(this.client);
        this.taksi = taksi(this.client);
        this.etkinlikler = etkinlikler(this.client);
        this.iklim = iklim(this.client);
        this.eshot = eshot(this.client);
        this.bisim = bisim(this.client);
        this.tramvay = tramvay(this.client);
        this.metro = metro(this.client);
        this.izban = izban(this.client);
        this.otopark = otopark(this.client);
        this.hizmet = hizmet(this.client);
        this.vapur = vapur(this.client);
        // Yeni endpoint'ler
        this.egitim = egitim(this.client);
        this.saglik = saglik(this.client);
        this.kutuphane = kutuphane(this.client);
        this.tarihi = tarihi(this.client);
        this.plaj = plaj(this.client);
        this.tren = tren(this.client);
        this.kamu = kamu(this.client);
        this.sosyal = sosyal(this.client);
        this.spor = spor(this.client);
        this.cografi = cografi(this.client);
        this.iztek = iztek(this.client);
        this.trafik = trafik(this.client);
        this.izmirimkart = izmirimkart(this.client);
    }
}

export * from "./endpoints/eshot";
