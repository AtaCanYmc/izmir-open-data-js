import {IzmirClient} from "../client";
import {DefaultOnemliYer, OnemliYerWrapper} from "../common/types/onemliYer";

export interface EshotDurak extends DefaultOnemliYer {}

export function eshot(client: IzmirClient) {
    return {
        /**
         * ESHOT duraklarının konum, isim ve diğer bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/eshot-duraklari
         */
        getYakinDurakList(enlem: number, boylam: number) {
            return client.get(`ibb/cbs/noktayayakinduraklar?x=${enlem}&y=${boylam}`) as Promise<OnemliYerWrapper<EshotDurak>>;
        }
    };
}
