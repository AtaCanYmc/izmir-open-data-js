import { IzmirClient } from "./client.js";
import { eczaneler } from "./endpoints/eczaneler.js";
import {muhtarliklar} from "./endpoints/muhtarliklar";
import {wizmirnet} from "./endpoints/wizmirnet";
import {izsu} from "./endpoints/izsu";
import {afetler} from "./endpoints/afetler";
import {pazarlar} from "./endpoints/pazarlar";
import {taksi} from "./endpoints/taksi";
import {etkinlikler} from "./endpoints/etkinlikler";
import {iklim} from "./endpoints/iklim";
import {eshot} from "./endpoints/eshot";
import {bisim} from "./endpoints/bisim";
import {tramvay} from "./endpoints/tramvay";
import {metro} from "./endpoints/metro";
import {izban} from "./endpoints/izban";
import {otopark} from "./endpoints/otopark";

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
    }
}
