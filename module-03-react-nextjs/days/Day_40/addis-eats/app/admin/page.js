import Link from "next/link";
import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/admin-auth";
import { getDishes } from "@/lib/dishes";
import { getOrders } from "@/lib/orders";

function formatCurrency(value) {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session.isAdmin) redirect("/admin/login");

  const dishes = getDishes();
  const orders = getOrders();

  const pendingCount = orders.filter((order) => order.status === "Pending").length;
  const today = new Date().toDateString();
  const ordersToday = orders.filter((order) => new Date(order.createdAt).toDateString() === today).length;
  const activeOrderValue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const availableDishCount = dishes.filter((dish) => dish.available !== false).length;
  const activeOrders = orders.filter((order) => order.status !== "Cancelled");

  const recentOrders = orders.slice(0, 5);
  const popularDishes = dishes
    .map((dish) => ({
      ...dish,
      sold: activeOrders.reduce(
        (count, order) =>
          count + (order.items || []).filter((item) => item.id === dish.id).reduce((itemTotal, item) => itemTotal + (Number(item.quantity) || 0), 0),
        0,
      ),
    }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 4);

  const summaryCards = [
    { label: "Menu Items", value: dishes.length },
    { label: "Available Now", value: `${availableDishCount} / ${dishes.length}` },
    { label: "Orders Today", value: ordersToday },
    { label: "Pending Orders", value: pendingCount },
    { label: "Active Order Value", value: formatCurrency(activeOrderValue) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
        {summaryCards.map((card) => (
          <div key={card.label} className="min-w-0 border-l-4 border-orange-500 bg-white px-5 py-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{card.label}</p>
            <p className="mt-2 break-words text-2xl font-black text-slate-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm font-semibold text-orange-600 hover:text-orange-700">
              View all
            </Link>
          </div>

          {recentOrders.length ? (
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                  <div>
                    <p className="font-semibold text-slate-900">{order.name}</p>
                    <p className="text-xs text-slate-500">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-orange-700">{formatCurrency(order.total)}</p>
                    <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-700">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-600">No customer orders yet.</p>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-slate-900">Popular dishes</h2>

          <div className="mt-4 space-y-3">
            {popularDishes.length ? (
              popularDishes.map((dish) => (
                <div key={dish.id} className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-3">
                  <div>
                    <p className="font-semibold text-slate-900">{dish.name}</p>
                    <p className="text-xs text-slate-500">{dish.category}</p>
                  </div>
                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-bold text-orange-700">{dish.sold} sold</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">No sales data yet.</p>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Quick actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/admin/dishes" className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700">
            Add New Dish
          </Link>
          <Link href="/admin/orders" className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400">
            View Orders
          </Link>
        </div>
      </section>
    </div>
  );
}
