import Link from "next/link";
import Header from "../components/Header";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-amber-50 px-6 py-10 text-stone-900">
      <Header />
      <div className="mx-auto max-w-3xl">
        <div className="mt-12">
        <Link href="/cart" className="font-semibold text-emerald-900 hover:text-orange-700">&larr; Back to cart</Link>
        <h1 className="mt-16 text-5xl font-black text-emerald-950">Checkout</h1>
        <form className="mt-8 space-y-5 rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <label className="block font-semibold">Name<input className="mt-2 block w-full rounded-lg border border-stone-300 p-3 font-normal" type="text" placeholder="Your name" /></label>
          <label className="block font-semibold">Delivery address<input className="mt-2 block w-full rounded-lg border border-stone-300 p-3 font-normal" type="text" placeholder="Where should we deliver?" /></label>
          <button type="submit" className="w-full rounded-full bg-emerald-900 px-6 py-3 font-bold text-white hover:bg-emerald-800">Place order</button>
        </form>
        </div>
      </div>
    </main>
  );
}