import Image from "next/image";
import Link from "next/link";

const specials = [
  {
    name: "Kitfo",
    price: 450,
    description: "Freshly minced beef with mitmita and spiced butter.",
    image: "/images/kitfo.jpg",
  },
  {
    name: "Doro Wat",
    price: 350,
    description: "Traditional chicken stew simmered with berbere and onions.",
    image: "/images/doro_wat.jpg",
  },
  {
    name: "Pizza",
    price: 400,
    description: "Freshly baked pizza with tomato sauce, mozzarella and a satisfying crust.",
    image: "/images/pizza.jpg",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white shadow-xl sm:p-12">
        <div className="max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-orange-100">
            Welcome to Addis Eats
          </p>
          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Delicious food, ready when you are.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-orange-50">
            Explore Ethiopian classics, comforting meals, and everyday favorites served with a warm Addis Ababa touch.
          </p>
          <Link
            href="/menu"
            className="mt-8 inline-block rounded-full bg-white px-6 py-3 font-semibold text-orange-600 shadow-sm transition hover:bg-orange-50"
          >
            Explore Menu
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Today&apos;s Specials</p>
          <h2 className="mt-2 text-3xl font-black text-slate-900">Popular dishes</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {specials.map((dish) => (
            <article key={dish.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="relative mb-5 h-40 overflow-hidden rounded-2xl bg-orange-100">
                <Image
                  src={dish.image || "/images/hero.png"}
                  alt={dish.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  loading="eager"
                  priority={dish.name === "Kitfo"}
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{dish.name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{dish.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <span className="text-lg font-bold text-orange-600">{dish.price} ETB</span>
                <Link href="/menu" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">
                  View Menu
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
