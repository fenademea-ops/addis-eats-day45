"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "addis-eats-favorites";

function readFavorites() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function FavoriteButton({ dishId, label }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const syncFavorite = () => {
      setIsFavorite(readFavorites().includes(dishId));
    };

    syncFavorite();
    window.addEventListener("favorites:changed", syncFavorite);

    return () => {
      window.removeEventListener("favorites:changed", syncFavorite);
    };
  }, [dishId]);

  const toggleFavorite = () => {
    if (typeof window === "undefined") {
      return;
    }

    const current = readFavorites();
    const next = current.includes(dishId)
      ? current.filter((id) => id !== dishId)
      : [...current, dishId];

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setIsFavorite(next.includes(dishId));
    window.dispatchEvent(new Event("favorites:changed"));
  };

  return (
    <button
      type="button"
      onClick={toggleFavorite}
      aria-label={isFavorite ? `Remove ${label} from favorites` : `Add ${label} to favorites`}
      className={`absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition ${
        isFavorite
          ? "border-red-200 bg-red-500 text-white shadow-lg"
          : "border-white/70 bg-white/80 text-slate-700 hover:bg-white"
      }`}
      title={isFavorite ? `Remove ${label} from favorites` : `Add ${label} to favorites`}
    >
      <span aria-hidden="true" className="text-lg leading-none">♥</span>
    </button>
  );
}
