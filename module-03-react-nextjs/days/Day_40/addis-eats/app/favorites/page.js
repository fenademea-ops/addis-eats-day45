"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AuthGate } from "@/components/AuthGate";
import { DishCard } from "@/components/DishCard";

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

export default function FavoritesPage() {
  return (
    <AuthGate redirectTo="/favorites">
      <FavoritesPageContent />
    </AuthGate>
  );
}

function FavoritesPageContent() {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const response = await fetch("/api/dishes");
        const data = await response.json();
        const allDishes = Array.isArray(data.dishes) ? data.dishes : [];
        const ids = readFavorites();
        setFavorites(allDishes.filter((dish) => ids.includes(dish.id)));
      } catch {
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
    const onChange = () => loadFavorites();
    window.addEventListener("favorites:changed", onChange);

    return () => {
      window.removeEventListener("favorites:changed", onChange);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-slate-600 shadow-sm">
        Loading favorites...
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">Favorites</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">No saved dishes yet</h1>
        <p className="mt-3 text-slate-600">Tap the heart on any dish to keep it here.</p>
        <Link href="/menu" className="mt-6 inline-block rounded-full bg-orange-600 px-5 py-3 font-semibold text-white hover:bg-orange-700">
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Favorites</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Your saved dishes</h1>
        </div>
        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
          {favorites.length} saved
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {favorites.map((dish) => (
          <DishCard key={dish.id} dish={dish} />
        ))}
      </div>
    </div>
  );
}
