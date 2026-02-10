import {IzmirClient} from "../client";
import {DefaultOnemliYer, OnemliYerWrapper} from "../common/types/onemliYer";

export interface BisimIstasyon extends DefaultOnemliYer {}

export function bisim(client: IzmirClient) {
    return {
        /**
         * İstasyonların konum, kapasite ve bisiklet sayılarını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/bisim-istasyonlari
         */
        getIstasyonList() {
            return client.get('izulas/bisim/istasyonlar') as Promise<OnemliYerWrapper<BisimIstasyon>>;
        }
    };
}
