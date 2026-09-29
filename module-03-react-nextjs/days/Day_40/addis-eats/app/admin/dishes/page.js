import { AdminDishForm } from "@/components/AdminDishForm";
import { AdminDishTable } from "@/components/AdminDishTable";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { getDishes } from "@/lib/dishes";

export default async function AdminDishesPage({ searchParams }) {
  const session = await getAdminSession();
  if (!session.isAdmin) redirect("/admin/login");

  const { edit } = await searchParams;
  const dishes = getDishes();

  const dishToEdit = dishes.find((dish) => dish.id === edit) ?? null;

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">Dish management</h2>
        <p className="mt-2 text-slate-600">Add a new menu item or update an existing one.</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">{dishToEdit ? "Edit dish" : "Add new dish"}</h3>
            <div className="mt-4">
              <AdminDishForm mode={dishToEdit ? "edit" : "add"} dish={dishToEdit} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-xl font-bold text-slate-900">Current menu</h3>
            <AdminDishTable dishes={dishes} />
          </div>
        </div>
      </section>
    </div>
  );
}
