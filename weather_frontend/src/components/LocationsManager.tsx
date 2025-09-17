"use client";

import React, { useState } from "react";
import { addLocation } from "@/lib/api";

type Props = {
  onAdded?: () => void;
};

export default function LocationsManager({ onAdded }: Props) {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const name = value.trim();
    if (!name) return;
    setBusy(true);
    setError(null);
    try {
      await addLocation({ name });
      setValue("");
      onAdded?.();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add location";
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="card-surface p-4">
      <form onSubmit={submit} className="flex items-center gap-2">
        <input
          className="input flex-1"
          placeholder="Add a new location"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button disabled={busy} className="btn btn-primary px-4 py-2" type="submit">
          {busy ? "Adding..." : "Add"}
        </button>
      </form>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}
