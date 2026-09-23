import Link from "next/link";

export const dishes = [
  { id: "doro-wot", name: "Doro Wot", category: "Classics", description: "Slow-cooked chicken stew with berbere, eggs, and fragrant spices.", price: 18 },
  { id: "misir-wot", name: "Misir Wot", category: "Vegetarian", description: "Velvety red lentils simmered with berbere and clarified butter.", price: 13 },
  { id: "kitfo", name: "Kitfo", category: "Classics", description: "Ethiopian-style seasoned beef served with ayib and greens.", price: 21 },
  { id: "shiro", name: "Shiro", category: "Vegetarian", description: "Silky chickpea stew with garlic, ginger, and mild spices.", price: 14 },
];

export function CategoryBar() {
  return (
    <div className="mb-8 flex flex-wrap gap-3">
      <span className="rounded-full bg-emerald-900 px-4 py-2 text-sm font-semibold text-white">All dishes</span>
      <span className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-600">Classics</span>
      <span className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-600">Vegetarian</span>
    </div>
  );
}

export function DishList() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {dishes.map((dish) => (
        <Link
          key={dish.id}
          href={`/menu/${dish.id}`}
          className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-orange-300 hover:shadow-md"
        >
          <div className="mb-8 flex items-start justify-between gap-4">
            <span className="text-4xl" aria-hidden="true">{dish.id === "kitfo" ? "🥩" : dish.id === "shiro" ? "🍲" : dish.id === "misir-wot" ? "🫘" : "🍗"}</span>
            <span className="font-bold text-orange-700">ETB {dish.price}</span>
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-stone-500">{dish.category}</p>
          <h2 className="text-2xl font-bold text-emerald-950 group-hover:text-orange-700">{dish.name}</h2>
          <p className="mt-2 leading-6 text-stone-600">{dish.description}</p>
        </Link>
      ))}
    </div>
  );
}