// Unified API client for Open Meteo location search and marine weather
// Docs: https://open-meteo.com/en/docs/geocoding-api, https://open-meteo.com/en/docs/marine-api

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

export interface MarineWeather {
  latitude: number;
  longitude: number;
  time: string;
  wave_height: number;
  sea_surface_temperature: number;
  units: {
    wave_height: string;
    sea_surface_temperature: string;
  };
}

export async function getMarineWeather(latitude: number, longitude: number): Promise<MarineWeather | null> {
  const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${latitude}&longitude=${longitude}&current=wave_height,sea_surface_temperature`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  if (!data.current) return null;
  return {
    latitude: data.latitude,
    longitude: data.longitude,
    time: data.current.time,
    wave_height: data.current.wave_height,
    sea_surface_temperature: data.current.sea_surface_temperature,
    units: {
      wave_height: data.current_units.wave_height,
      sea_surface_temperature: data.current_units.sea_surface_temperature,
    },
  };
}
