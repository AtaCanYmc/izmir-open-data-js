import { IzmirClient } from "../client.js";
import { OnemliYerWrapper, DefaultOnemliYer } from "../common/types/onemliYer.js";

export interface AfetToplanmaAlanlari extends DefaultOnemliYer {}

export function afetler(client: IzmirClient) {
    return {
        /**
         * Afet ve acil durum toplanma alanlarına ait ilçe, mahalle ve konum bilgilerini içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/afet-ve-acil-durum-toplanma-alanlari
         */
        getAcilDurumToplanmaAlanlari() {
            return client.get<OnemliYerWrapper<AfetToplanmaAlanlari>>("ibb/cbs/afetaciltoplanmaalani");
        },
    };
}
