import Link from "next/link";
import Header from "../components/Header";

export default function CartPage() {
	return (
		<main className="min-h-screen bg-amber-50 px-6 py-10 text-stone-900">
			<Header />
			<div className="mx-auto max-w-3xl">
				<div className="mt-12">
				<Link href="/menu" className="font-semibold text-emerald-900 hover:text-orange-700">&larr; Continue shopping</Link>
				<h1 className="mt-16 text-5xl font-black text-emerald-950">Your cart</h1>
				<div className="mt-8 rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
					<p className="text-lg text-stone-600">Your cart is ready for something delicious.</p>
					<Link href="/checkout" className="mt-6 inline-block rounded-full bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700">Continue to checkout</Link>
				</div>
				</div>
			</div>
		</main>
	);
}
