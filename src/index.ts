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
    }
}
