import { DishCard } from "@/components/DishCard";

export function DishList({ dishes, emptyMessage = "No dishes are available in this category." }) {
  if (dishes.length === 0) {
    return <p className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {dishes.map((dish) => <DishCard key={dish.id} dish={dish} />)}
    </div>
  );
}
