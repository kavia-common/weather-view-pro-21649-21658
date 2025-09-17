"use client";

import React, { useMemo } from "react";
import type { ForecastPoint } from "@/lib/api";

type Props = {
  title?: string;
  points: ForecastPoint[];
};

export default function ForecastChart({ title = "Forecast (Temp °C)", points }: Props) {
  // Compute SVG path for temperatures
  const { pathD, min, max } = useMemo(() => {
    if (!points?.length) return { pathD: "", min: 0, max: 0 };
    const temps = points.map((p) => p.tempC);
    const min = Math.min(...temps);
    const max = Math.max(...temps);
    const pad = 6;
    const width = 640;
    const height = 220;
    const innerW = width - pad * 2;
    const innerH = height - pad * 2;

    const normY = (t: number) => {
      if (max === min) return height / 2;
      const ratio = (t - min) / (max - min);
      return height - pad - ratio * innerH;
    };
    const stepX = innerW / Math.max(1, points.length - 1);

    let d = "";
    points.forEach((p, i) => {
      const x = pad + i * stepX;
      const y = normY(p.tempC);
      d += i === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
    });

    return { pathD: d, min, max };
  }, [points]);

  return (
    <section className="card-surface p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">{title}</h3>
      {points?.length ? (
        <div className="w-full overflow-x-auto">
          <svg viewBox="0 0 640 240" className="w-full h-56">
            <defs>
              <linearGradient id="tempFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(37,99,235,0.35)" />
                <stop offset="100%" stopColor="rgba(37,99,235,0.02)" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="640" height="240" fill="transparent" />
            {/* Baseline grid */}
            <g stroke="rgba(0,0,0,0.06)">
              {[1, 2, 3, 4].map((i) => (
                <line key={i} x1="0" x2="640" y1={i * 48} y2={i * 48} />
              ))}
            </g>
            {/* Path */}
            <path d={pathD} stroke="#2563EB" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />
            {/* Fill under path (approx by cloning and closing to bottom) */}
            {pathD && (
              <path
                d={`${pathD} L 640,240 L 0,240 Z`}
                fill="url(#tempFill)"
                opacity="0.4"
              />
            )}
          </svg>
          <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
            <span>Min: {Math.round(min)}°C</span>
            <span>Max: {Math.round(max)}°C</span>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No forecast data available.</p>
      )}
    </section>
  );
}
