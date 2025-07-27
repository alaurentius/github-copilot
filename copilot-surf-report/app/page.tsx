

"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getMarineWeather, searchLocations, MarineWeather, Location } from "@/lib/api";


export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [marineWeather, setMarineWeather] = useState<MarineWeather | null>(null);
  const [marineLoading, setMarineLoading] = useState(false);
  const [marineError, setMarineError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setLocations([]);
    setSelectedLocation(null);
    setMarineWeather(null);
    setMarineError(null);
    try {
      const locs = await searchLocations(searchTerm);
      setLocations(locs);
      if (locs.length === 0) setError("No locations found.");
    } catch (err: any) {
      setError("Failed to fetch locations");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectLocation = async (loc: Location) => {
    setSelectedLocation(loc);
    setMarineWeather(null);
    setMarineError(null);
    setMarineLoading(true);
    try {
      const weather = await getMarineWeather(loc.latitude, loc.longitude);
      if (!weather) throw new Error("No marine weather data found");
      setMarineWeather(weather);
    } catch (err: any) {
      setMarineError("Failed to fetch marine weather");
    } finally {
      setMarineLoading(false);
    }
  };

  const handleBack = () => {
    setSelectedLocation(null);
    setMarineWeather(null);
    setMarineError(null);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-16 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Marine Weather Search</CardTitle>
          <CardDescription>
            Search for a location and view current marine weather data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!selectedLocation ? (
            <>
              <form onSubmit={handleSearch} className="flex gap-2 mb-6">
                <Input
                  placeholder="Search for a location (e.g. Malibu)"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium hover:bg-primary/90 transition-colors"
                  disabled={loading}
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </form>
              {loading && (
                <div className="flex flex-col gap-4">
                  {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-12 w-full" />
                  ))}
                </div>
              )}
              {error && <div className="text-destructive mb-4">{error}</div>}
              {locations.length > 0 && (
                <div className="flex flex-col gap-4">
                  {locations.map(loc => (
                    <Card
                      key={loc.id}
                      className="border bg-background cursor-pointer hover:bg-accent transition-colors"
                      onClick={() => handleSelectLocation(loc)}
                    >
                      <CardHeader>
                        <CardTitle>{loc.name}, {loc.country}</CardTitle>
                        {loc.admin1 && <CardDescription>{loc.admin1}</CardDescription>}
                      </CardHeader>
                      <CardContent>
                        <div className="text-xs text-muted-foreground">
                          Lat: {loc.latitude}, Lon: {loc.longitude}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleBack}
                className="mb-4 bg-muted text-foreground rounded-md px-4 py-2 font-medium hover:bg-accent transition-colors"
              >
                Back to search results
              </button>
              <Card className="border bg-background">
                <CardHeader>
                  <CardTitle>{selectedLocation.name}, {selectedLocation.country}</CardTitle>
                  {selectedLocation.admin1 && <CardDescription>{selectedLocation.admin1}</CardDescription>}
                </CardHeader>
                <CardContent>
                  {marineLoading ? (
                    <div className="flex flex-col gap-4">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  ) : marineError ? (
                    <div className="text-destructive">{marineError}</div>
                  ) : marineWeather ? (
                    <>
                      {(
                        marineWeather.wave_height == null ||
                        marineWeather.sea_surface_temperature == null
                      ) ? (
                        <div className="text-muted-foreground mb-2">
                          No wave height or sea temperature data available for this location.
                        </div>
                      ) : null}
                      <div className="flex flex-col gap-2">
                        <div>
                          <span className="font-medium">Wave Height:</span> {marineWeather.wave_height} {marineWeather.units.wave_height}
                        </div>
                        <div>
                          <span className="font-medium">Sea Surface Temperature:</span> {marineWeather.sea_surface_temperature} {marineWeather.units.sea_surface_temperature}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Time: {marineWeather.time}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-muted-foreground">No marine weather data found.</div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
