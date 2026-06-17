import { IzmirClient } from "../client.js";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer.js";

export interface HizmetNoktasi extends DefaultOnemliYer {}

export function hizmet(client: IzmirClient) {
    return {
        /**
         * İzBB bünyesindeki hizmet noktalarını içeren web servisi.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/izbb-hizmet-noktalari
         */
        getHizmetNoktaList() {
            return client.get<OnemliYerWrapper<HizmetNoktasi>>("ibb/cbs/izbbhizmetnoktalari");
        },
    };
}
