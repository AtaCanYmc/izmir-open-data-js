import {IzmirClient} from "../client";
import {DefaultOnemliYer, OnemliYerWrapper} from "../common/types/onemliYer";

export interface HizmetNoktasi extends DefaultOnemliYer {}

export function hizmet(client: IzmirClient) {
    return {
        /**
         * İzBB bünyesindeki hizmet noktalarını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izbb-hizmet-noktalari
         */
        getHizmetNoktaList() {
            return client.get("ibb/cbs/izbbhizmetnoktalari") as Promise<OnemliYerWrapper<HizmetNoktasi>>;
        }
    };
}
