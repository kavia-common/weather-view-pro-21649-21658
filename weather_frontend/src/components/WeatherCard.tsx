"use client";

import React from "react";
import type { CurrentWeather } from "@/lib/api";
import { Droplets, Sun, Wind, Clock } from "lucide-react";

type Props = {
  data: CurrentWeather;
};

export default function WeatherCard({ data }: Props) {
  const {
    location,
    description,
    tempC,
    feelsLikeC,
    humidity,
    windKph,
    windDir,
    sunrise,
    sunset,
    updatedAt,
  } = data;

  return (
    <section className="card-surface p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="badge mb-2">
            <Sun className="size-4" />
            Now
          </div>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">{location}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="text-right">
          <div className="text-4xl md:text-5xl font-bold text-blue-700">{Math.round(tempC)}°C</div>
          {typeof feelsLikeC === "number" && (
            <div className="text-sm text-gray-500">Feels like {Math.round(feelsLikeC)}°C</div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="rounded-lg border border-black/10 p-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Droplets className="size-4 text-blue-600" />
            <span className="text-sm">Humidity</span>
          </div>
          <div className="mt-2 text-lg font-semibold">{humidity ?? "--"}%</div>
        </div>
        <div className="rounded-lg border border-black/10 p-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Wind className="size-4 text-blue-600" />
            <span className="text-sm">Wind</span>
          </div>
          <div className="mt-2 text-lg font-semibold">
            {windKph ?? "--"} kph {windDir ? `• ${windDir}` : ""}
          </div>
        </div>
        <div className="rounded-lg border border-black/10 p-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Sun className="size-4 text-amber-500" />
            <span className="text-sm">Sunrise</span>
          </div>
          <div className="mt-2 text-lg font-semibold">{sunrise ?? "--"}</div>
        </div>
        <div className="rounded-lg border border-black/10 p-3">
          <div className="flex items-center gap-2 text-gray-700">
            <Sun className="size-4 text-amber-700 rotate-180" />
            <span className="text-sm">Sunset</span>
          </div>
          <div className="mt-2 text-lg font-semibold">{sunset ?? "--"}</div>
        </div>
      </div>

      {updatedAt && (
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <Clock className="size-4" />
          Updated {new Date(updatedAt).toLocaleString()}
        </div>
      )}
    </section>
  );
}
