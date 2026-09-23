import Link from "next/link";

export default function NotFound() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-amber-50 px-6 text-center text-stone-900">
			<div>
				<p className="text-7xl font-black text-orange-600">404</p>
				<h1 className="mt-4 text-4xl font-black text-emerald-950">That dish is off the menu.</h1>
				<p className="mt-4 text-stone-600">Try one of our other Ethiopian favorites.</p>
				<Link href="/menu" className="mt-8 inline-block rounded-full bg-emerald-900 px-6 py-3 font-bold text-white hover:bg-emerald-800">Browse the menu</Link>
			</div>
		</main>
	);
}
