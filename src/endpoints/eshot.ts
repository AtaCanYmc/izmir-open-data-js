import {IzmirClient} from "../client";
import {DefaultOnemliYer, OnemliYerWrapper} from "../common/types/onemliYer";

export interface Muhtarlik extends DefaultOnemliYer {}

export function eshot(client: IzmirClient) {
    return {
        /**
         * Muhtarlıklar hakkında bilgi ve coğrafi konumlarını içeren web servisi.
         * Kaynak: https://acikveri.bizizmir.com/dataset/noktaya-yakin-duraklar
         */
        getYakinDurakList(enlem: number, boylam: number) {
            return client.get(`ibb/cbs/noktayayakinduraklar?x=${enlem}&y=${boylam}`);
        }
    };
}
