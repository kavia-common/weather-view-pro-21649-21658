"use client";

import React from "react";
import Link from "next/link";
import Header from "@/components/Header";
import { User, Mail, Shield, Bell, Globe2, ChevronRight } from "lucide-react";

/**
 * PUBLIC_INTERFACE
 * ProfilePage
 * A modern, minimalistic user profile page for WeatherView Pro.
 * - Shows a user avatar (placeholder), display name/username.
 * - Provides accessible sections for user settings (placeholders).
 * - Styled with Ocean Professional theme and responsive layout.
 */
export default function ProfilePage() {
  // Placeholder user data; in a real app this could be fetched from /api/users/me
  const user = {
    displayName: "Alex Johnson",
    username: "@alexj",
    email: "alex@example.com",
  };

  return (
    <>
      {/* Reuse the existing Header for consistent nav and theme */}
      <Header />
      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 mt-6">
        {/* Hero/Profile Card */}
        <section className="card-surface p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Avatar */}
            <div className="relative h-24 w-24 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shadow-sm shrink-0">
              <User className="size-12 text-blue-600" aria-hidden />
              <span className="sr-only">User avatar</span>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                    {user.displayName}
                  </h1>
                  <p className="text-gray-600">{user.username}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/"
                    className="btn btn-ghost px-4 py-2 border border-black/10 hover:border-blue-400 hover:bg-blue-50/60"
                    aria-label="Back to dashboard"
                  >
                    Back to Weather
                  </Link>
                  <button
                    className="btn btn-primary px-4 py-2"
                    type="button"
                    aria-label="Edit profile"
                    onClick={() => {
                      // Placeholder: open a modal or navigate to edit when implemented
                    }}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Quick meta */}
              <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3 py-1.5">
                  <Mail className="size-4 text-blue-600" />
                  {user.email}
                </span>
                <span className="inline-flex items-center gap-2 rounded-lg border border-black/10 px-3 py-1.5">
                  <Globe2 className="size-4 text-amber-500" />
                  Preferred Units: Metric (°C)
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Settings Grid */}
        <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account settings card */}
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="size-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Account</h2>
            </div>
            <ul className="divide-y divide-black/5">
              <li>
                <button
                  className="w-full text-left py-3 flex items-center justify-between text-gray-700 hover:text-blue-700"
                  aria-label="Change password"
                >
                  Change password
                  <ChevronRight className="size-4 text-gray-400" />
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left py-3 flex items-center justify-between text-gray-700 hover:text-blue-700"
                  aria-label="Two-factor authentication"
                >
                  Two-factor authentication
                  <ChevronRight className="size-4 text-gray-400" />
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left py-3 flex items-center justify-between text-gray-700 hover:text-blue-700"
                  aria-label="Connected apps"
                >
                  Connected apps
                  <ChevronRight className="size-4 text-gray-400" />
                </button>
              </li>
            </ul>
          </div>

          {/* Notifications settings card */}
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="size-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-gray-800">Notifications</h2>
            </div>
            <form className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="checkbox" className="size-4 accent-blue-600" defaultChecked />
                <span className="text-gray-700">Daily forecast summary</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="size-4 accent-blue-600" />
                <span className="text-gray-700">Severe weather alerts</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="size-4 accent-blue-600" defaultChecked />
                <span className="text-gray-700">Location change suggestions</span>
              </label>
              <div className="pt-2">
                <button type="button" className="btn btn-secondary px-4 py-2">
                  Save Preferences
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
