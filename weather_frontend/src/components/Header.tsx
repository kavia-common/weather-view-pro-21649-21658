"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, User } from "lucide-react";

type Props = {
  onSearch?: (query: string) => void;
  onAddLocation?: (name: string) => void;
};

/**
 * PUBLIC_INTERFACE
 * Header
 * Reusable app header with logo, search, save action, and navigation links.
 * Accepts optional onSearch and onAddLocation for contexts that need search.
 */
export default function Header({ onSearch, onAddLocation }: Props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSearch) return;
    const trimmed = query.trim();
    if (trimmed.length) {
      onSearch(trimmed);
    }
  };

  const addLocationClicked = () => {
    if (!onAddLocation) return;
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
            <Link href="/" className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-50">
              <span className="text-white font-bold">WV</span>
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">WeatherView Pro</h1>
              <p className="text-xs text-gray-500">Real-time and forecast insights</p>
            </div>
          </div>

          {/* Desktop search and actions (optional) */}
          <div className="flex-1 max-w-2xl hidden md:flex items-center gap-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-3 flex-1">
              <div className="relative flex-1">
                <Search className="size-5 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  className="input w-full pl-10"
                  placeholder="Search city or place (e.g., London, New York)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search location"
                  disabled={!onSearch}
                />
              </div>
              <button type="submit" className="btn btn-primary px-4 py-2" disabled={!onSearch}>
                Search
              </button>
              <button type="button" onClick={addLocationClicked} className="btn btn-secondary px-4 py-2" disabled={!onAddLocation}>
                Save
              </button>
            </form>

            {/* Nav links */}
            <nav aria-label="Main navigation" className="ml-3">
              <ul className="flex items-center gap-2">
                <li>
                  <Link
                    href="/profile"
                    className="btn btn-ghost px-3 py-2 border border-black/10 hover:border-blue-400 hover:bg-blue-50/60"
                    aria-label="Go to Profile"
                  >
                    <User className="size-4 text-blue-600" />
                    <span className="hidden lg:inline">Profile</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Mobile compact: search if available + profile icon */}
          <div className="md:hidden flex items-center gap-2">
            {onSearch && (
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  className="input w-36"
                  placeholder="Search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search location"
                />
                <button type="submit" className="btn btn-primary px-3 py-2">Go</button>
              </form>
            )}
            <Link
              href="/profile"
              className="btn btn-ghost px-2 py-2 border border-black/10 hover:border-blue-400 hover:bg-blue-50/60"
              aria-label="Go to Profile"
            >
              <User className="size-5 text-blue-600" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
