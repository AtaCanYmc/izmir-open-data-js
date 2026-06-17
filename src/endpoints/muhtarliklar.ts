import { IzmirClient } from "../client.js";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer.js";

export interface Muhtarlik extends DefaultOnemliYer {}

export function muhtarliklar(client: IzmirClient) {
    return {
        /**
         * Muhtarlıklar hakkında bilgi ve coğrafi konumlarını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/muhtarliklar
         */
        getList() {
            return client.get<OnemliYerWrapper<Muhtarlik>>("ibb/cbs/muhtarliklar");
        },
    };
}
