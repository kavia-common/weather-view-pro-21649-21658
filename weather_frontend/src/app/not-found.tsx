"use client";
import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <section className="card-surface p-8 text-center" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-bold text-gray-900">404 – Page Not Found</h1>
        <p className="text-gray-600 mt-2">
          The page you’re looking for doesn’t exist or may have been moved.
        </p>
        <div className="mt-6">
          <Link href="/" className="btn btn-primary px-4 py-2 inline-flex">
            Go back home
          </Link>
        </div>
      </section>
    </main>
  );
}
