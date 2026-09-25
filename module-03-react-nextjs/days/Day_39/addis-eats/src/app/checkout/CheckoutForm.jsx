"use client";

import { useActionState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { placeOrder } from "../actions";

const initialState = { success: false, fieldErrors: {} };

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, initialState);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (state.success) clearCart();
  }, [state.success, clearCart]);

  if (cart.length === 0 || state.success) {
    return (
      <div className="panel">
        <h2>{state.success ? "Order placed" : "Your cart is empty"}</h2>
        <p>{state.success ? "Thank you. We are preparing your Addis Eats order." : "Add dishes from the menu before checkout."}</p>
      </div>
    );
  }

  const errors = state.fieldErrors || {};
  const errorFor = (field) => errors[field]?.[0];

  return (
    <form action={formAction} className="checkout-form">
      <input type="hidden" name="items" value={JSON.stringify(cart)} />
      <input type="hidden" name="total" value={total} />
      <label>Full name<input name="customerName" autoComplete="name" />{errorFor("customerName") && <span className="field-error">{errorFor("customerName")}</span>}</label>
      <label>Phone<input name="phone" placeholder="0911223344" autoComplete="tel" />{errorFor("phone") && <span className="field-error">{errorFor("phone")}</span>}</label>
      <label>Delivery location<input name="deliveryLocation" placeholder="Bole, Addis Ababa" />{errorFor("deliveryLocation") && <span className="field-error">{errorFor("deliveryLocation")}</span>}</label>
      <label>Payment method<select name="paymentMethod" defaultValue="Cash on Delivery"><option>Cash on Delivery</option><option>Mobile Money</option><option>Card</option></select></label>
      <label>Notes<textarea name="notes" placeholder="Optional delivery notes" /></label>
      {state.error && <p className="field-error" role="alert">{state.error}</p>}
      <button className="button" type="submit" disabled={pending}>{pending ? "Placing order..." : `Place order - ETB ${total}`}</button>
    </form>
  );
}
