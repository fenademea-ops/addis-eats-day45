"use client";

import { useState } from "react";

import { useCart } from "@/lib/cart-store";

export function AddToCartButton({ dish }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (dish.available === false) {
    return (
      <button
        type="button"
        disabled
        className="cursor-not-allowed rounded-full border border-slate-200 bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-500"
      >
        Sold Out
      </button>
    );
  }

  return (
    <>
    <button
      type="button"
      onClick={() => {
        addItem(dish);
        setAdded(true);
      }}
      className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700"
    >
      {added ? "Added to cart" : "Add to Order"}
    </button>
    {added && <span role="status" className="sr-only">Added to cart</span>}
    </>
  );
}
