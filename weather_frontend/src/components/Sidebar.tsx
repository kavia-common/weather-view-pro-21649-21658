"use client";

import React from "react";
import { MapPin, X, Plus } from "lucide-react";
import type { LocationItem } from "@/lib/api";

type Props = {
  locations: LocationItem[];
  current?: string;
  onSelect: (name: string) => void;
  onRemove: (id: string) => void;
  onQuickAdd: () => void;
};

export default function Sidebar({ locations, current, onSelect, onRemove, onQuickAdd }: Props) {
  return (
    <aside className="card-surface p-4 h-max sticky top-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-gray-700">Saved Locations</h2>
        <button onClick={onQuickAdd} className="btn btn-ghost px-2 py-1 text-sm">
          <Plus className="size-4" /> Add
        </button>
      </div>
      <ul className="space-y-2">
        {locations.map((loc) => {
          const active = current && current.toLowerCase() === loc.name.toLowerCase();
          return (
            <li key={loc.id}>
              <div
                className={`group flex items-center gap-2 p-2 rounded-lg border transition cursor-pointer ${
                  active
                    ? "border-blue-500 bg-blue-50"
                    : "border-black/10 hover:border-blue-400 hover:bg-blue-50/60"
                }`}
                onClick={() => onSelect(loc.name)}
                role="button"
                aria-pressed={!!active}
              >
                <MapPin className={`size-4 ${active ? "text-blue-600" : "text-gray-500"}`} />
                <span className={`text-sm ${active ? "text-blue-700 font-semibold" : "text-gray-700"}`}>
                  {loc.name}
                </span>
                <button
                  className="ml-auto opacity-0 group-hover:opacity-100 transition text-gray-500 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(loc.id);
                  }}
                  aria-label={`Remove ${loc.name}`}
                >
                  <X className="size-4" />
                </button>
              </div>
            </li>
          );
        })}
        {locations.length === 0 && (
          <li className="text-sm text-gray-500">No saved locations yet.</li>
        )}
      </ul>
    </aside>
  );
}
