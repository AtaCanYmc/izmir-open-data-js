import {IzmirClient} from "../client";
import {OnemliYerWrapper, DefaultOnemliYer} from "../common/types/onemliYer";

export interface WizmirNetKonum extends DefaultOnemliYer {}

export function wizmirnet(client: IzmirClient) {
    return {
        /**
         * Ücretsiz-kablosuz internet hizmet noktaları ve lokasyon bilgilerini içeren web servisi.
         * Kaynak: https://acikveri.bizizmir.com/dataset/kablosuz-internet-baglanti-noktalari
         */
        getList() {
            return client.get("ibb/cbs/wizmirnetnoktalari") as Promise<OnemliYerWrapper<WizmirNetKonum>>;
        }
    };
}