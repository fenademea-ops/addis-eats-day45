import Image from "next/image";
import Link from "next/link";

import { toggleDishAvailabilityAction } from "@/app/actions";
import { DeleteDishButton } from "@/components/DeleteDishButton";

export function AdminDishTable({ dishes = [] }) {
  if (!dishes.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-600">
        No dishes found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm text-slate-700">
          <thead className="bg-slate-100 text-xs uppercase tracking-[0.12em] text-slate-600">
            <tr>
              <th className="px-4 py-3">Image</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Availability</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish) => (
              <tr key={dish.id} className="border-t border-slate-200 align-top">
                <td className="px-4 py-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-slate-100">
                    <Image src={dish.image || "/images/hero.png"} alt={dish.name} fill className="object-cover" sizes="64px" />
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold text-slate-900">{dish.name}</td>
                <td className="px-4 py-3">{dish.category}</td>
                <td className="px-4 py-3 font-semibold text-orange-700">{dish.price} ETB</td>
                <td className="px-4 py-3">
                  <form action={toggleDishAvailabilityAction}>
                    <input type="hidden" name="dishId" value={dish.id} />
                    <button
                      type="submit"
                      className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold ${dish.available === false ? "bg-amber-100 text-amber-800 hover:bg-amber-200" : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"}`}
                    >
                      {dish.available === false ? "Mark available" : "Mark sold out"}
                    </button>
                  </form>
                </td>
                <td className="max-w-xs px-4 py-3 text-slate-600">{dish.description}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/admin/dishes?edit=${dish.id}`}
                      className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-slate-700"
                    >
                      Edit
                    </Link>
                    <DeleteDishButton dishId={dish.id} dishName={dish.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
