import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { updateOrderStatus } from "@/app/actions";
import { getAllOrdersForStaff, type OrderStatus } from "@/lib/orders";
import { getSession } from "@/lib/session";

const statuses: OrderStatus[] = [
  "Pending",
  "Preparing",
  "Ready",
  "Delivered",
  "Cancelled",
];

export default async function KitchenPage() {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=/kitchen");
  }
  if (session.role !== "staff") {
    notFound();
  }

  const orders = getAllOrdersForStaff();

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl p-6">
      <Link className="text-sm font-semibold text-orange-700" href="/">
        Addis Eats
      </Link>
      <h1 className="mt-2 text-3xl font-bold">Kitchen orders</h1>
      <p className="mt-2 text-gray-600">
        Staff-only view. Every status change is checked again on the server.
      </p>

      {orders.length === 0 ? (
        <p className="mt-8 rounded-xl border p-5">There are no orders yet.</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((order) => (
            <li className="rounded-xl border p-5" key={order.id}>
              <h2 className="font-semibold">{order.items.join(", ")}</h2>
              <p className="mt-1 text-sm text-gray-600">
                Order {order.id} · {order.customerName} · ETB {order.total}
              </p>
              <p className="mt-2">Status: {order.status}</p>
              <form action={updateOrderStatus} className="mt-4 flex flex-wrap items-center gap-3">
                <input name="orderId" type="hidden" value={order.id} />
                <label className="sr-only" htmlFor={`status-${order.id}`}>
                  New status for order {order.id}
                </label>
                <select
                  className="rounded-lg border px-3 py-2"
                  defaultValue={order.status}
                  id={`status-${order.id}`}
                  name="status"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
                <button className="rounded-lg bg-orange-700 px-4 py-2 font-semibold text-white" type="submit">
                  Update status
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
