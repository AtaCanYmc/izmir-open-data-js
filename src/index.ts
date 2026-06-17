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

    public readonly eczaneler;
    public readonly muhtarliklar;
    public readonly wizmirnet;
    public readonly izsu;
    public readonly afetler;
    public readonly pazarlar;
    public readonly taksi;
    public readonly etkinlikler;
    public readonly iklim;
    public readonly eshot;
    public readonly bisim;
    public readonly tramvay;
    public readonly metro;
    public readonly izban;
    public readonly otopark;
    public readonly hizmet;
    public readonly vapur;

    // Yeni endpoint'ler
    public readonly egitim;
    public readonly saglik;
    public readonly kutuphane;
    public readonly tarihi;
    public readonly plaj;
    public readonly tren;
    public readonly kamu;
    public readonly sosyal;
    public readonly spor;
    public readonly cografi;
    public readonly iztek;
    public readonly trafik;
    public readonly izmirimkart;

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
