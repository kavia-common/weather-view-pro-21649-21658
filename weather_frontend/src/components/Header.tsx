"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

type Props = {
  onSearch: (query: string) => void;
  onAddLocation: (name: string) => void;
};

export default function Header({ onSearch, onAddLocation }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed.length) {
      onSearch(trimmed);
    }
  };

  const addLocationClicked = () => {
    const trimmed = query.trim();
    if (trimmed.length) {
      onAddLocation(trimmed);
      setQuery("");
    }
  };

  return (
    <header className="ocean-gradient border-b border-black/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
              <span className="text-white font-bold">WV</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">WeatherView Pro</h1>
              <p className="text-xs text-gray-500">Real-time and forecast insights</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 max-w-2xl hidden md:flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="size-5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                className="input w-full pl-10"
                placeholder="Search city or place (e.g., London, New York)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search location"
              />
            </div>
            <button type="submit" className="btn btn-primary px-4 py-2">
              Search
            </button>
            <button type="button" onClick={addLocationClicked} className="btn btn-secondary px-4 py-2">
              Save
            </button>
          </form>

          <div className="md:hidden">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <input
                className="input w-44"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search location"
              />
              <button type="submit" className="btn btn-primary px-3 py-2">Go</button>
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}
