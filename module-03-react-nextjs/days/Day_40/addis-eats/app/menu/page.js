import { CategoryBar } from "@/components/CategoryBar";
import { FilterShell } from "@/components/FilterShell";
import { getDishes, getMenuCategories } from "@/lib/dishes";

export const revalidate = 3600;

export default async function MenuPage() {
  const dishes = await getDishes();
  const categories = getMenuCategories();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Menu</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Fresh favorites</h1>
        </div>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">Freshly prepared</span>
      </div>

      <div className="space-y-4">
        <CategoryBar categories={categories} />
        <FilterShell dishes={dishes} />
      </div>
    </div>
  );
}
