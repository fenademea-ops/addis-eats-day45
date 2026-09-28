"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function CategoryBar({ categories }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "All";

  return (
    <nav aria-label="Dish categories" className="flex w-full items-center gap-2 overflow-x-auto rounded-xl border border-slate-300 bg-white p-2 shadow-sm scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300">
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const href = category === "All" ? "/menu" : `/menu?category=${encodeURIComponent(category)}`;

        return (
          <Link
            key={category}
            href={href}
            className={[
              "shrink-0 rounded-full border px-3 py-2 text-sm font-medium transition-colors duration-150",
              isActive
                ? "border-orange-500 bg-orange-600 text-white shadow-sm"
                : "border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100",
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
