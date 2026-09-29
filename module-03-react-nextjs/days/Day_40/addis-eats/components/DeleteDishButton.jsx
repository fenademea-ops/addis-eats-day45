"use client";

import { deleteDish } from "@/app/actions";

export function DeleteDishButton({ dishId, dishName }) {
  return (
    <form action={deleteDish} className="inline-block">
      <input type="hidden" name="dishId" value={dishId} />
      <button
        type="submit"
        onClick={(event) => {
          const confirmed = window.confirm(`Are you sure you want to delete ${dishName}?`);
          if (!confirmed) {
            event.preventDefault();
          }
        }}
        className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
      >
        Delete
      </button>
    </form>
  );
}
