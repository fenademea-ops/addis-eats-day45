import { Suspense } from "react";

import { CategoryBar } from "@/components/CategoryBar";
import { getMenuCategories } from "@/lib/dishes";

export default function MenuLayout({ children }) {
  const categories = getMenuCategories();

  return (
    <section className="grid gap-8 md:grid-cols-[240px_1fr]">
      <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Categories</h2>
        <Suspense fallback={<div className="text-sm text-slate-500">Loading categories...</div>}>
          <CategoryBar categories={categories} />
        </Suspense>
      </aside>

      <div>{children}</div>
    </section>
  );
}
