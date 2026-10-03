"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

type Dish = {
  id: number;
  name: string;
  category: string;
  price: number;
};

type DishResponse = {
  dishes: Dish[];
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
};

export default function SearchBox() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(input.trim());
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const key = search
    ? `/api/dishes?search=${encodeURIComponent(search)}`
    : null;

  const {
    data,
    error,
    isLoading,
    isValidating,
  } = useSWR<DishResponse>(
    key,
    fetcher,
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <input
        value={input}
        onChange={(event) =>
          setInput(event.target.value)
        }
        placeholder="Search dishes..."
        className="w-full rounded-lg border px-4 py-3"
      />

      {!search && (
        <p className="mt-3 text-sm text-gray-500">
          Start typing to search for dishes.
        </p>
      )}

      {error && (
        <p className="mt-4 text-red-600">
          Failed to load dishes.
        </p>
      )}

      {isLoading && !data && (
        <p className="mt-4">
          Loading...
        </p>
      )}

      {data && (
        <div className="mt-4 space-y-3">
          {data.dishes.map((dish) => (
            <div
              key={dish.id}
              className="rounded-lg border p-4"
            >
              <h3 className="font-semibold">
                {dish.name}
              </h3>

              <p className="text-sm text-gray-500">
                {dish.category}
              </p>

              <p className="mt-1">
                Br {dish.price}
              </p>
            </div>
          ))}
        </div>
      )}

      {isValidating && data && (
        <p className="mt-3 text-sm text-gray-500">
          Updating results...
        </p>
      )}
    </div>
  );
}