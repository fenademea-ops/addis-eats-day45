"use client";

import Link from "next/link";
import { useCart } from "../../context/CartContext";

export default function CartClient() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="shell simple-page">
        <div className="empty-state">
          <p className="eyebrow">Nothing yet</p>
          <h1>Your cart is empty</h1>
          <p>Add a few Ethiopian favorites and they’ll appear here.</p>
          <Link href="/menu" className="button">
            Browse menu
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="shell simple-page">
      <p className="eyebrow">Ready to check out</p>
      <h1>Your cart</h1>
      <div className="checkout-form">
        {cart.map((item) => (
          <div key={item.id}>
            <p className="zone-note">
              <strong>{item.name}</strong> × {item.quantity} — ETB {item.price * item.quantity}
            </p>
            <button type="button" className="button" onClick={() => removeFromCart(item.id)}>
              Remove
            </button>
          </div>
        ))}
        <div className="detail-footer">
          <strong>Total: ETB {total}</strong>
          <button type="button" className="button" onClick={clearCart}>
            Clear cart
          </button>
        </div>
      </div>
    </main>
  );
}
