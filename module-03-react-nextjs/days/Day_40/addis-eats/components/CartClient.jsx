"use client";

import Link from "next/link";

import { useCart } from "@/lib/cart-store";

export function CartClient() {
  const { items, itemCount, total, increaseQuantity, decreaseQuantity, removeItem, clearCart } = useCart();

  return (
    <section className="mx-auto max-w-5xl space-y-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-black text-slate-900">Your cart</h1>
        {items.length > 0 && (
          <button type="button" onClick={clearCart} className="rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100">
            Clear cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="mx-auto max-w-xl text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-3xl shadow-inner">
              🛒
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-orange-600">Your cart</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">Your cart is empty.</h2>
            <p className="mt-3 text-base text-slate-600">
              Add a few favorites from our menu and we&apos;ll prepare everything for checkout.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">Kitfo</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">Doro Wat</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">Baklava</span>
            </div>

            <Link href="/menu" className="mt-8 inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-orange-700">
              Browse menu
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{item.name}</h2>
                  <p className="text-sm text-slate-600">{item.price} ETB each</p>
                </div>

                <div className="flex items-center gap-3">
                  <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => decreaseQuantity(item.id)} className="h-9 w-9 rounded-full bg-slate-100 font-bold text-slate-700">-</button>
                  <span className="min-w-10 text-center font-semibold">{item.quantity}</span>
                  <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => increaseQuantity(item.id)} className="h-9 w-9 rounded-full bg-slate-100 font-bold text-slate-700">+</button>
                  <button type="button" onClick={() => removeItem(item.id)} className="ml-2 text-sm font-semibold text-red-600">Remove</button>
                </div>

                <p className="text-lg font-black text-orange-600">{item.quantity * item.price} ETB</p>
              </div>
            ))}
          </div>

          <div className="rounded-3xl border border-orange-200 bg-gradient-to-r from-orange-50 via-white to-amber-50 p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4 border-b border-orange-100 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-700">Order summary</p>
                <p className="mt-1 text-sm text-slate-600">Ready for checkout</p>
              </div>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
                {itemCount} item{itemCount === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-800">{total} ETB</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-slate-800">Free</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-orange-100 pt-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Total</p>
                <p className="mt-1 text-3xl font-black text-slate-900">{total} ETB</p>
              </div>

              <Link href="/checkout" className="inline-flex items-center justify-center rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700">
                Proceed to checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
