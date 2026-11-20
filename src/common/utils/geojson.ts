export type GeoJSONPosition = [longitude: number, latitude: number];

export interface GeoJSONPoint {
    type: "Point";
    coordinates: GeoJSONPosition;
}

export interface GeoJSONFeature<P = Record<string, any>> {
    type: "Feature";
    geometry: GeoJSONPoint;
    properties: P;
    id?: string | number;
}

export interface GeoJSONFeatureCollection<P = Record<string, any>> {
    type: "FeatureCollection";
    features: GeoJSONFeature<P>[];
}

/**
 * Verilen metin veya sayısal koordinat değerini geçerli bir float sayıya dönüştürür.
 */
function parseCoordinate(val: any): number | null {
    if (val === null || val === undefined) return null;
    if (typeof val === "number") {
        return Number.isFinite(val) ? val : null;
    }
    if (typeof val === "string") {
        const cleaned = val.trim().replace(",", ".");
        const parsed = parseFloat(cleaned);
        return Number.isFinite(parsed) ? parsed : null;
    }
    return null;
}

/**
 * Çeşitli belediye veri formatlarındaki (CBS, İZBAN, ESHOT, Eczaneler vb.) enlem ve boylam
 * alanlarını tespit ederek standart WGS84 GeoJSON [longitude, latitude] dizisine dönüştürür.
 */
export function extractCoordinates(item: any): GeoJSONPosition | null {
    if (!item || typeof item !== "object") {
        return null;
    }

    let lat: number | null = null;
    let lon: number | null = null;

    // 1. CBS ve Genel Standart (BOYLAM / ENLEM)
    if ("BOYLAM" in item && "ENLEM" in item) {
        lon = parseCoordinate(item.BOYLAM);
        lat = parseCoordinate(item.ENLEM);
    } else if ("boylam" in item && "enlem" in item) {
        lon = parseCoordinate(item.boylam);
        lat = parseCoordinate(item.enlem);
    } else if ("Boylam" in item && "Enlem" in item) {
        lon = parseCoordinate(item.Boylam);
        lat = parseCoordinate(item.Enlem);
    }
    // 2. Yazılım Şube ve Eczaneler (LokasyonX: Enlem, LokasyonY: Boylam)
    else if ("LokasyonX" in item && "LokasyonY" in item) {
        lat = parseCoordinate(item.LokasyonX);
        lon = parseCoordinate(item.LokasyonY);
    } else if ("KoordinatX" in item && "KoordinatY" in item) {
        lat = parseCoordinate(item.KoordinatX);
        lon = parseCoordinate(item.KoordinatY);
    }
    // 3. Standart İngilizce Eksenler (latitude / longitude)
    else if ("latitude" in item && "longitude" in item) {
        lat = parseCoordinate(item.latitude);
        lon = parseCoordinate(item.longitude);
    } else if ("lat" in item && ("lng" in item || "lon" in item)) {
        lat = parseCoordinate(item.lat);
        lon = parseCoordinate(item.lng ?? item.lon);
    }

    // Koordinat geçerlilik kontrolü (İzmir ve küresel WGS84 sınırları)
    if (lon !== null && lat !== null && lon >= -180 && lon <= 180 && lat >= -90 && lat <= 90) {
        return [lon, lat];
    }

    return null;
}

/**
 * Tek bir belediye POI veya mekan kaydını GeoJSON Feature nesnesine dönüştürür.
 */
export function toGeoJSONFeature<P = Record<string, any>>(item: any): GeoJSONFeature<P> | null {
    const coords = extractCoordinates(item);
    if (!coords) {
        return null;
    }

    const properties: any = { ...item };
    const id = item.Id ?? item.ID ?? item.id ?? item._id ?? item.IstasyonId ?? item.EczaneId;

    return {
        type: "Feature",
        geometry: {
            type: "Point",
            coordinates: coords,
        },
        properties: properties as P,
        ...(id !== undefined ? { id } : {}),
    };
}

/**
 * Dizi veya OnemliYerWrapper formatındaki belediye mekansal verilerini standart
 * RFC 7946 GeoJSON FeatureCollection nesnesine dönüştürür.
 *
 * @param data Veri listesi veya { onemliyer: [...] } sarmalayıcısı
 */
export function toGeoJSON<P = Record<string, any>>(data: any): GeoJSONFeatureCollection<P> {
    let items: any[] = [];

    if (Array.isArray(data)) {
        items = data;
    } else if (data && typeof data === "object") {
        if (Array.isArray(data.onemliyer)) {
            items = data.onemliyer;
        } else if (Array.isArray(data.records)) {
            items = data.records;
        } else if (Array.isArray(data.kayitlar)) {
            items = data.kayitlar;
        }
    }

    const features: GeoJSONFeature<P>[] = [];
    for (const item of items) {
        const feature = toGeoJSONFeature<P>(item);
        if (feature) {
            features.push(feature);
        }
    }

    return {
        type: "FeatureCollection",
        features,
    };
}
