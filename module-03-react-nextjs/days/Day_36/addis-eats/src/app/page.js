import Link from "next/link";
import Header from "./components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-amber-50 text-stone-900">
      <Header />
      <div className="mx-auto max-w-5xl px-6">
        <section className="grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:py-24">
          <div>
            <p className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-700">
              <span className="h-px w-8 bg-orange-600" aria-hidden="true" /> Taste the highlands
            </p>
            <h1 className="max-w-2xl text-6xl font-black leading-[0.95] tracking-tight text-emerald-950 sm:text-8xl">
              Comfort food, served Addis-style.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-stone-700">
              Fragrant spices, generous plates, and the warm hospitality of Ethiopia delivered to your table.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link
                href="/menu"
                className="rounded-full bg-orange-600 px-7 py-4 font-bold text-white shadow-lg shadow-orange-600/20 transition hover:-translate-y-0.5 hover:bg-orange-700"
              >
                Explore the menu <span className="ml-2" aria-hidden="true">&#8594;</span>
              </Link>
              <span className="text-sm font-semibold text-stone-500">Open today · 11:00–22:00</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-5 top-8 h-24 w-24 rounded-full border-2 border-orange-200" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[2rem] bg-emerald-950 p-8 text-amber-50 shadow-2xl shadow-emerald-950/20 sm:p-10">
              <div className="flex items-start justify-between">
                <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">Today&apos;s favorite</span>
                <span className="text-3xl" aria-hidden="true">✦</span>
              </div>
              <div className="my-12 text-center" aria-hidden="true">
                <span className="text-8xl drop-shadow-lg">🍛</span>
              </div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-300">Classic plate</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <h2 className="text-3xl font-black">Doro Wot</h2>
                <span className="text-xl font-bold text-orange-300">ETB 18</span>
              </div>
              <p className="mt-4 leading-6 text-emerald-100/75">Tender chicken, berbere, and a boiled egg over warm injera.</p>
            </div>
          </div>
        </section>

        <section className="grid border-t border-emerald-950/10 py-8 sm:grid-cols-3" aria-label="Addis Eats service highlights">
          <div className="border-b border-emerald-950/10 pb-5 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-8"><p className="font-bold text-emerald-950">Made to order</p><p className="mt-1 text-sm text-stone-600">Fresh spices in every plate</p></div>
          <div className="border-b border-emerald-950/10 py-5 sm:border-b-0 sm:border-r sm:px-8 sm:py-0"><p className="font-bold text-emerald-950">Shared with love</p><p className="mt-1 text-sm text-stone-600">Generous portions for the table</p></div>
          <div className="pt-5 sm:pl-8 sm:pt-0"><p className="font-bold text-emerald-950">Delivered warm</p><p className="mt-1 text-sm text-stone-600">From our kitchen to your door</p></div>
        </section>
      </div>
    </main>
  );
}