import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">404</p>
      <h1 className="mt-4 text-4xl font-black text-slate-900">Dish not found</h1>
      <p className="mt-4 text-slate-600">
        The item you are looking for is not on the menu anymore or may have a different name.
      </p>
      <Link
        href="/menu"
        className="mt-8 inline-block rounded-full bg-orange-600 px-6 py-3 font-semibold text-white transition hover:bg-orange-700"
      >
        Back to menu
      </Link>
    </section>
  );
}
