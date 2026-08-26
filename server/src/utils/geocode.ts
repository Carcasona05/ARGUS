const NOMINATIM_ENDPOINT = "https://nominatim.openstreetmap.org/reverse";

type NominatimAddress = {
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  village?: string;
  town?: string;
  city?: string;
  county?: string;
  state?: string;
  region?: string;
  country?: string;
  display_name?: string;
};

type NominatimResponse = {
  address?: NominatimAddress;
  display_name?: string;
  error?: string;
};

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<string | null> {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return null;

  try {
    const url = `${NOMINATIM_ENDPOINT}?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const res = await fetch(url, {
      headers: {
        "Accept-Language": "en",
        "User-Agent": "ARGUS-App/1.0",
      },
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) return null;

    const data = (await res.json()) as NominatimResponse;
    const addr = data.address;

    if (addr) {
      const parts = [
        [addr.road, addr.neighbourhood].filter(Boolean)[0],
        addr.suburb || addr.village || addr.town,
        addr.city || addr.county || addr.state || addr.region,
        addr.country,
      ].filter(Boolean);

      if (parts.length) return parts.join(", ");
    }

    if (data.display_name) {
      return data.display_name.split(",").slice(0, 4).join(",").trim();
    }

    return null;
  } catch {
    return null;
  }
}
