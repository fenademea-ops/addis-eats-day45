import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin-auth";
import { getOrders } from "@/lib/orders";
import { AdminOrderTable } from "@/components/AdminOrderTable";

export default async function AdminOrdersPage() {
  const session = await getAdminSession();
  if (!session.isAdmin) redirect("/admin/login");

  const orders = getOrders();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-black text-slate-900">Order management</h2>
        <p className="mt-2 text-slate-600">Update order progress and monitor delivery activity.</p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <AdminOrderTable orders={orders} />
      </section>
    </div>
  );
}
