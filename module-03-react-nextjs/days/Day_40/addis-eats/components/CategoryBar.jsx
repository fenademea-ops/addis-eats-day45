"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function CategoryBar({ categories }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  return (
    <nav aria-label="Dish categories" className="flex flex-col gap-2">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const href = category === "All" ? "/menu" : `/menu?category=${encodeURIComponent(category)}`;

        return (
          <Link
            key={category}
            href={href}
            className={[
              "rounded-xl px-3 py-2 text-left text-sm font-medium transition",
              isActive ? "bg-orange-600 text-white shadow-sm" : "bg-slate-100 text-slate-700 hover:bg-slate-200",
            ].join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {category}
          </Link>
        );
      })}
    </nav>
  );
}
