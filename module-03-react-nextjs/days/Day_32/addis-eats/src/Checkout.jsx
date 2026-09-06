import React from "react";
import { useCartStore } from "./cart/cartStore";

export default function Checkout() {
  // Narrow selectors
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);

  const total = items.reduce(
    (sum, item) => sum + (Number(item?.price) || 0),
    0
  );

  if (items.length === 0) {
    return (
      <div className="main-content">
        <h2>Your Cart is Empty</h2>
        <p>Please add dishes from the menu to build your order.</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <h2>Order Summary</h2>
      <ul>
        {items.map((item, index) => (
          <li key={item?.id || index}>
            {item?.name} - {Number(item?.price || 0).toFixed(2)} ETB
          </li>
        ))}
      </ul>
      <h3>Total: {total.toFixed(2)} ETB</h3>

      <button
        type="button"
        className="add-btn"
        onClick={() => {
          alert("Order placed successfully!");
          clear();
        }}
      >
        Place Order
      </button>
    </div>
  );
}