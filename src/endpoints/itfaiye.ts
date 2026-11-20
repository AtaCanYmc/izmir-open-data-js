import { IzmirClient } from "../client.js";
import { DefaultOnemliYer, OnemliYerWrapper } from "../common/types/onemliYer.js";
import { CKANDatastoreSearchOptions, CKANDatastoreSearchResult } from "./ckan.js";

export interface ItfaiyeGrubu extends DefaultOnemliYer {}

export interface ItfaiyeAcilMudahale {
    _id: number;
    YIL: number;
    AY: number;
    KATEGORI: string;
    MUDAHALE_TIPI: string;
    MUDAHALE_YERI: string;
    ILCE: string;
    MAHALLE: string;
    MUDAHALE_ADEDI: number;
}

export interface ItfaiyeEgitimHizmeti {
    _id: number;
    YIL: number;
    AY: number;
    ILCE: string;
    UCRETLENDIRME: string;
    EGITIM_SURESI: number;
    TALEP_EDEN: string;
    TALEP_ADEDI: number;
}

export const ITFAIYE_RESOURCES = {
    ACIL_MUDAHALE: "4b7a8da1-94ed-487f-8b7a-e13d40a5cd33",
    EGITIM_HIZMETLERI: "db592f6e-4694-470f-be03-64444fc0bb88",
} as const;

export function itfaiye(client: IzmirClient) {
    return {
        /**
         * İzmir genelindeki İtfaiye Grupları ve İstasyonlarının konum bilgilerini listeler (CBS).
         *
         * Kaynak: https://openapi.izmir.bel.tr/api/ibb/cbs/itfaiyegruplari
         */
        getGruplar(): Promise<OnemliYerWrapper<ItfaiyeGrubu>> {
            return client.get<OnemliYerWrapper<ItfaiyeGrubu>>("ibb/cbs/itfaiyegruplari");
        },

        /**
         * İzmir İtfaiyesi acil müdahale sayılarını (yangın, kurtarma vb. olaylar) sorgular.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/itfaiye-acil-mudahale-sayilari
         * @param options Yıl, ay, ilçe veya kategori filtreleme seçenekleri
         */
        getAcilMudahaleIstatistigi(
            options?: Omit<CKANDatastoreSearchOptions, "resource_id">,
        ): Promise<CKANDatastoreSearchResult<ItfaiyeAcilMudahale>> {
            const params: Record<string, any> = {
                resource_id: ITFAIYE_RESOURCES.ACIL_MUDAHALE,
                ...options,
            };
            return client.getCKAN<CKANDatastoreSearchResult<ItfaiyeAcilMudahale>>("datastore_search", params);
        },

        /**
         * İtfaiye Dairesi Başkanlığı eğitim hizmetleri istatistiklerini sorgular.
         *
         * Kaynak: https://acikveri.bizizmir.com/dataset/itfaiye-egitim-hizmetleri
         * @param options Filtreleme ve arama seçenekleri
         */
        getEgitimHizmetleri(
            options?: Omit<CKANDatastoreSearchOptions, "resource_id">,
        ): Promise<CKANDatastoreSearchResult<ItfaiyeEgitimHizmeti>> {
            const params: Record<string, any> = {
                resource_id: ITFAIYE_RESOURCES.EGITIM_HIZMETLERI,
                ...options,
            };
            return client.getCKAN<CKANDatastoreSearchResult<ItfaiyeEgitimHizmeti>>("datastore_search", params);
        },

        /**
         * Acil müdahale istatistiklerini toplu dump formatında çeker.
         */
        dumpAcilMudahale<T = any>(): Promise<T> {
            return client.getCKANDump<T>(ITFAIYE_RESOURCES.ACIL_MUDAHALE);
        },

        /**
         * İtfaiye eğitim hizmetleri verilerini toplu dump formatında çeker.
         */
        dumpEgitimHizmetleri<T = any>(): Promise<T> {
            return client.getCKANDump<T>(ITFAIYE_RESOURCES.EGITIM_HIZMETLERI);
        },
    };
}
