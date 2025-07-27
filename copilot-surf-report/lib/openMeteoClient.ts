// Open Meteo API client for location search
// Docs: https://open-meteo.com/en/docs/geocoding-api

export interface Location {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export async function searchLocations(query: string): Promise<Location[]> {
  if (!query) return [];
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch locations");
  const data = await res.json();
  if (!data.results) return [];
  return data.results.map((loc: any) => ({
    id: loc.id || loc.latitude + loc.longitude,
    name: loc.name,
    country: loc.country,
    admin1: loc.admin1,
    latitude: loc.latitude,
    longitude: loc.longitude,
  }));
}
