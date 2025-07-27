
"use client";
import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { searchLocations, Location } from "@/lib/openMeteoClient";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setError(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setLoading(true);
    timeoutRef.current = setTimeout(async () => {
      try {
        const locs = await searchLocations(e.target.value);
        setResults(locs);
      } catch (err: any) {
        setError("Failed to fetch locations");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start py-16 px-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Search Locations</CardTitle>
          <CardDescription>
            Find locations using the Open Meteo API geocoding service.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Type a city, region, or country..."
            value={query}
            onChange={handleInput}
            className="mb-6"
            autoFocus
          />
          {loading ? (
            <div className="flex flex-col gap-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : error ? (
            <div className="text-destructive">{error}</div>
          ) : results.length === 0 && query ? (
            <div className="text-muted-foreground">No locations found.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {results.map((loc) => (
                <Card key={loc.id} className="border bg-background">
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
        </CardContent>
      </Card>
    </main>
  );
}
