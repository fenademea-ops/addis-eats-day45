"use client";

import { useActionState, useEffect, useRef } from "react";

import { placeOrder } from "@/app/actions";
import { CancelOrderButton } from "@/components/CancelOrderButton";
import { useCart } from "@/lib/cart-store";

const initialState = { success: false, message: "", fieldErrors: {} };

export default function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const [state, formAction, isPending] = useActionState(placeOrder, initialState);
  const clearedOrderId = useRef(null);

  useEffect(() => {
    if (state.order?.id && clearedOrderId.current !== state.order.id) {
      clearCart();
      clearedOrderId.current = state.order.id;
    }
  }, [state.order?.id, clearCart]);

  const orderItems = items.map(({ id, quantity }) => ({ id, quantity }));

  return (
    <section className="mx-auto max-w-5xl">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-black text-slate-900">Checkout</h1>
          <form key={JSON.stringify(state.values ?? {})} action={formAction} noValidate className="mt-6 space-y-5">
            <input type="hidden" name="items" value={JSON.stringify(orderItems)} />
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-700">Customer name</label>
              <input id="name" name="name" autoComplete="name" defaultValue={state.values?.name ?? ""} aria-invalid={Boolean(state.fieldErrors?.name)} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500" placeholder="Almaz Bekele" />
              {state.fieldErrors?.name && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.name[0]}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-slate-700">Phone</label>
              <input id="phone" name="phone" type="tel" autoComplete="tel" defaultValue={state.values?.phone ?? ""} aria-invalid={Boolean(state.fieldErrors?.phone)} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500" placeholder="0912345678" />
              {state.fieldErrors?.phone && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.phone[0]}</p>}
            </div>

            <div>
              <label htmlFor="location" className="mb-1 block text-sm font-semibold text-slate-700">Delivery location</label>
              <input id="location" name="location" autoComplete="street-address" defaultValue={state.values?.location ?? ""} aria-invalid={Boolean(state.fieldErrors?.location)} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500" placeholder="Bole, Addis Ababa" />
              {state.fieldErrors?.location && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.location[0]}</p>}
            </div>

            <div>
              <label htmlFor="paymentMethod" className="mb-1 block text-sm font-semibold text-slate-700">Payment method</label>
              <select id="paymentMethod" name="paymentMethod" defaultValue={state.values?.paymentMethod ?? ""} aria-invalid={Boolean(state.fieldErrors?.paymentMethod)} className="w-full rounded-xl border border-slate-300 px-3 py-2.5 outline-none focus:border-orange-500">
                <option value="">Select payment</option>
                <option value="cash">Cash on Delivery</option>
                <option value="telebirr">Telebirr</option>
                <option value="bank-transfer">Bank Transfer</option>
              </select>
              {state.fieldErrors?.paymentMethod && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.paymentMethod[0]}</p>}
            </div>

            {state.fieldErrors?.items && <p className="text-sm text-red-600">{state.fieldErrors.items[0]}</p>}
            {state.message && <p role="status" className={`rounded-xl border px-3 py-2 text-sm ${state.success ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-red-200 bg-red-50 text-red-700"}`}>{state.message}</p>}

            <button type="submit" disabled={isPending || items.length === 0} className="w-full rounded-full bg-orange-600 px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300">
              {isPending ? "Placing order..." : "Place order"}
            </button>
          </form>

          {state.success && state.order && (
            <div className="mt-5 border-t border-slate-200 pt-4">
              <p className="text-sm text-slate-600">Order reference: {state.order.id}</p>
              <CancelOrderButton orderId={state.order.id} />
            </div>
          )}
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.length === 0 ? (
              <p className="text-slate-600">Your cart is empty.</p>
            ) : items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm text-slate-700">
                <span>{item.name} × {item.quantity}</span>
                <span>ETB {item.quantity * item.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between text-lg font-bold text-slate-900">
              <span>Total</span>
              <span>ETB {total}</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}