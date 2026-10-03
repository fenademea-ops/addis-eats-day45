"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
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

type Props = {
  page: number;
};

export default function DishList({ page }: Props) {
  const router = useRouter();

  const key = `/api/dishes?page=${page}`;

  const { data, error, isLoading } =
    useSWR<DishResponse>(
      key,
      fetcher,
      {
        keepPreviousData: true,
      }
    );

  function changePage(newPage: number) {
    router.push(`/menu?page=${newPage}`);
  }

  if (error) {
    return (
      <p className="text-red-600">
        Failed to load dishes.
      </p>
    );
  }

  if (isLoading && !data) {
    return <p>Loading dishes...</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">
        Dishes
      </h2>

      <div className="space-y-3">
        {data?.dishes.map((dish) => (
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

            <p>Br {dish.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={() =>
            changePage(page - 1)
          }
          disabled={page <= 1}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {data?.totalPages || 1}
        </span>

        <button
          onClick={() =>
            changePage(page + 1)
          }
          disabled={
            page >= (data?.totalPages || 1)
          }
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}