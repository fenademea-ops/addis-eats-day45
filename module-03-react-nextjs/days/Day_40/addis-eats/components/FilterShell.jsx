"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { DishList } from "@/components/DishList";

export function FilterShell({ dishes }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "All";
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory = category === "All" || dish.category === category;
    const searchableText = [dish.name, dish.description, ...(dish.ingredients || [])]
      .join(" ")
      .toLocaleLowerCase();

    return matchesCategory && searchableText.includes(normalizedSearch);
  });

  return (
    <div className="space-y-5">
      <label className="block">
        <span className="sr-only">Search dishes</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search dishes or ingredients"
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
        />
      </label>
      <DishList
        dishes={filteredDishes}
        emptyMessage={normalizedSearch ? "No dishes match your search." : "No dishes are available in this category."}
      />
    </div>
  );
}
