import Link from "next/link";
import { notFound } from "next/navigation";
import { dishes } from "../components";

export default async function DishPage({ params }) {
	const { id } = await params;
	const dish = dishes.find((item) => item.id === id);

	if (!dish) notFound();

	return (
		<main className="min-h-screen bg-amber-50 px-6 py-10 text-stone-900">
			<div className="mx-auto max-w-3xl">
				<Link href="/menu" className="font-semibold text-emerald-900 hover:text-orange-700">&larr; Back to menu</Link>
				<article className="mt-16 rounded-3xl bg-white p-8 shadow-sm sm:p-12">
					<span className="text-7xl" aria-hidden="true">{dish.id === "kitfo" ? "🥩" : dish.id === "shiro" ? "🍲" : dish.id === "misir-wot" ? "🫘" : "🍗"}</span>
					<p className="mt-10 text-sm font-bold uppercase tracking-widest text-orange-700">{dish.category}</p>
					<h1 className="mt-3 text-5xl font-black text-emerald-950">{dish.name}</h1>
					<p className="mt-6 text-lg leading-8 text-stone-600">{dish.description}</p>
					<div className="mt-10 flex items-center justify-between border-t border-stone-200 pt-6">
						<span className="text-2xl font-bold text-orange-700">ETB {dish.price}</span>
						<Link href="/cart" className="rounded-full bg-orange-600 px-6 py-3 font-bold text-white hover:bg-orange-700">Add to cart</Link>
					</div>
				</article>
			</div>
		</main>
	);
}
