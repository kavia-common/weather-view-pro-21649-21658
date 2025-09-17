"use client";

import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import WeatherCard from "@/components/WeatherCard";
import ForecastChart from "@/components/ForecastChart";
import LocationsManager from "@/components/LocationsManager";
import {
  fetchWeather,
  fetchLocations,
  addLocation,
  removeLocation,
  type WeatherResponse,
  type LocationItem,
} from "@/lib/api";
import { AlertTriangle, CloudRain, Loader2 } from "lucide-react";

export default function Home() {
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingLocs, setLoadingLocs] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load saved locations initially
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingLocs(true);
        const list = await fetchLocations().catch(() => []);
        if (!mounted) return;
        setLocations(list);
        if (list.length) {
          setSelected(list[0].name);
        }
      } finally {
        setLoadingLocs(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Fetch weather when selection changes
  useEffect(() => {
    if (!selected) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(selected, 5);
        if (!cancelled) setWeather(data);
      } catch (err) {
        if (!cancelled) {
          const msg = err instanceof Error ? err.message : "Failed to fetch weather";
          setError(msg);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selected]);

  const handleSearch = async (query: string) => {
    setSelected(query);
  };

  const handleAddLocation = async (name: string) => {
    // Optimistic add
    const localId = `local-${Date.now()}`;
    const optimistic: LocationItem = { id: localId, name };
    setLocations((prev) => [optimistic, ...prev]);
    try {
      const created = await addLocation({ name });
      setLocations((prev) => [created, ...prev.filter((l) => l.id !== localId)]);
    } catch {
      // Revert on error
      setLocations((prev) => prev.filter((l) => l.id !== localId));
    }
  };

  const handleRemoveLocation = async (id: string) => {
    const backup = locations;
    setLocations((prev) => prev.filter((l) => l.id !== id));
    try {
      await removeLocation(id);
    } catch {
      setLocations(backup);
    }
  };

  const hourly = useMemo(() => weather?.hourly || [], [weather]);

  return (
    <>
      <Header onSearch={handleSearch} onAddLocation={handleAddLocation} />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            {loadingLocs ? (
              <div className="card-surface p-6 flex items-center gap-3">
                <Loader2 className="size-5 animate-spin text-blue-600" />
                <span className="text-sm text-gray-600">Loading locations...</span>
              </div>
            ) : (
              <Sidebar
                locations={locations}
                current={selected}
                onSelect={setSelected}
                onRemove={handleRemoveLocation}
                onQuickAdd={() => selected && handleAddLocation(selected)}
              />
            )}
            <div className="mt-6">
              <LocationsManager onAdded={async () => setLocations(await fetchLocations())} />
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-9 space-y-6">
            {!selected && (
              <section className="card-surface p-6">
                <div className="flex items-center gap-3">
                  <CloudRain className="size-6 text-blue-600" />
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">Get started</h2>
                    <p className="text-sm text-gray-600">
                      Search a city above to view current conditions and forecast. Save your favorite
                      locations to access them quickly.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {error && (
              <section className="card-surface p-4 border border-red-200">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="size-5" />
                  <span className="font-semibold">Error</span>
                </div>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </section>
            )}

            {loading && (
              <section className="card-surface p-6 flex items-center gap-3">
                <Loader2 className="size-6 animate-spin text-blue-600" />
                <span className="text-sm text-gray-700">Fetching latest weather for {selected}...</span>
              </section>
            )}

            {!loading && weather && (
              <>
                <WeatherCard data={weather.current} />
                <ForecastChart title="Hourly Forecast (Temp °C)" points={hourly} />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
