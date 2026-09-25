"use client";

import { useCart } from "../../../context/CartContext";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();

  return (
    <button type="button" className="button" onClick={() => addToCart(dish)}>
      Add to cart
    </button>
  );
}
