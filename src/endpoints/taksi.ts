import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer";
import { IzmirClient } from "../client";

export interface TaksiDurak extends DefaultOnemliYer {}

export function taksi(client: IzmirClient) {
    return {
        /**
         * Taksi durak bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/taksi-durak-bilgileri
         */
        getDurakList() {
            return client.get<OnemliYerWrapper<TaksiDurak>>("ibb/cbs/taksiduraklari");
        },
    };
}
