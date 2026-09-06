import React from "react";
import { useCartStore } from "./cart/cartStore";

export default function CartBadge({ onOpen }) {
  // Narrow selector: primitive length value
  const itemCount = useCartStore((state) => state.items.length);

  return (
    <button type="button" className="cart-badge-btn" onClick={onOpen}>
      🛒 Cart ({itemCount})
    </button>
  );
}