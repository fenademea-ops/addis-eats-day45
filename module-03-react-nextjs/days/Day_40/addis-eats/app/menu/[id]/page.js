import Image from "next/image";
import { notFound } from "next/navigation";

import { AddToCartButton } from "@/components/AddToCartButton";
import { getDishById, getDishes } from "@/lib/dishes";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishDetailPage({ params }) {
  const { id } = await params;
  const dish = getDishById(id);

  if (!dish) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative h-[420px] overflow-hidden rounded-2xl">
          <Image
            src={dish.image || "/images/hero.png"}
            alt={dish.name}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            loading="eager"
            priority={dish.name === "Kitfo"}
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center">
          <span className="mb-3 inline-flex w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-700">
            {dish.category}
          </span>
          <h1 className="text-4xl font-black text-slate-900">{dish.name}</h1>
          <p className="mt-4 text-lg text-slate-600">{dish.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-3xl font-black text-orange-600">{dish.price} ETB</span>
            <AddToCartButton dish={dish} />
          </div>

          <div className="mt-8">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Ingredients</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {(dish.ingredients || []).map((ingredient) => (
                <li key={ingredient} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
