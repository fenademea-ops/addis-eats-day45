import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/AddToCartButton";
import { FavoriteButton } from "@/components/FavoriteButton";

export function DishCard({ dish }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative">
        <Link href={`/menu/${dish.id}`} className="block">
          <div className="relative h-48 overflow-hidden bg-orange-100">
            <Image
              src={dish.image || "/images/hero.png"}
              alt={dish.name}
              fill
              sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
              loading="eager"
              priority={dish.name === "Kitfo"}
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-orange-700">{dish.category}</span>
              {dish.available === false && (
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">Sold out</span>
              )}
              <span className="text-lg font-bold text-orange-600">{dish.price} ETB</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{dish.name}</h2>
            <p className="mt-2 text-sm text-slate-600">{dish.description}</p>
          </div>
        </Link>
        <FavoriteButton dishId={dish.id} label={dish.name} />
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 p-4">
        <Link href={`/menu/${dish.id}`} className="text-sm font-semibold text-slate-700 hover:text-orange-700">View Details</Link>
        <AddToCartButton dish={dish} />
      </div>
    </article>
  );
}