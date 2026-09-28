"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

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

export function FavoriteBar({ dishes }) {
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const syncFavorites = () => {
      setFavoriteIds(readFavorites());
    };

    syncFavorites();
    window.addEventListener("favorites:changed", syncFavorites);

    return () => {
      window.removeEventListener("favorites:changed", syncFavorites);
    };
  }, []);

  const favorites = useMemo(
    () => dishes.filter((dish) => favoriteIds.includes(dish.id)),
    [dishes, favoriteIds],
  );

  if (favorites.length === 0) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">Favorites</p>
          <h2 className="mt-1 text-xl font-black text-slate-900">Your saved picks</h2>
        </div>
        <span className="rounded-full bg-white px-2.5 py-1 text-sm font-semibold text-red-600 shadow-sm">
          {favorites.length}
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        {favorites.map((dish) => (
          <Link
            key={dish.id}
            href={`/menu/${dish.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:text-orange-600"
          >
            <span aria-hidden="true" className="text-red-500">♥</span>
            {dish.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
