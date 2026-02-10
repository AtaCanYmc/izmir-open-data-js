import {IzmirClient} from "../client";
import {DefaultOnemliYer, OnemliYerWrapper} from "../common/types/onemliYer";

export interface Muhtarlik extends DefaultOnemliYer {}

export function muhtarliklar(client: IzmirClient) {
    return {
        /**
         * Muhtarlıklar hakkında bilgi ve coğrafi konumlarını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/muhtarliklar
         */
        getList() {
            return client.get("ibb/cbs/muhtarliklar") as Promise<OnemliYerWrapper<Muhtarlik>>;
        }
    };
}
