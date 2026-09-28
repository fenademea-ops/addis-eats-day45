"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "addis-eats-favorites";
const AUTH_KEY = "addis-eats-auth";

function readFavoritesCount() {
  if (typeof window === "undefined") {
    return 0;
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed.length : 0;
  } catch {
    return 0;
  }
}

export function SiteHeader() {
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    const syncCount = () => setFavoriteCount(readFavoritesCount());
    syncCount();
    window.addEventListener("favorites:changed", syncCount);

    return () => {
      window.removeEventListener("favorites:changed", syncCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-orange-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-2xl font-black tracking-tight text-orange-600">
          Addis Eats
        </Link>

        <nav className="flex items-center gap-3 text-sm font-semibold text-slate-700 sm:gap-6">
          <Link href="/" className="transition hover:text-orange-600">
            Home
          </Link>
          <Link href="/menu" className="transition hover:text-orange-600">
            Menu
          </Link>
          <Link href="/login?redirect=/favorites" className="inline-flex items-center gap-2 transition hover:text-orange-600">
            <span>Favorites</span>
            <span className="inline-flex min-w-5 items-center justify-center rounded-full border border-red-200 bg-red-50 px-1.5 py-0.5 text-xs text-red-600">
              {favoriteCount}
            </span>
          </Link>
          <Link href="/login?redirect=/cart" className="transition hover:text-orange-600">
            Cart
          </Link>
          <Link href="/login?redirect=/orders" className="transition hover:text-orange-600">
            Orders
          </Link>
          <Link href="/checkout" className="transition hover:text-orange-600">
            Checkout
          </Link>
        </nav>
      </div>
    </header>
  );
}
