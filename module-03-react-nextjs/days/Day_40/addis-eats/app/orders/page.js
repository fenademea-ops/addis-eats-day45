import Link from "next/link";
import { cookies } from "next/headers";

import { getOrdersForOwner } from "@/lib/orders";
import { DEMO_SESSION_COOKIE } from "@/lib/session";

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const ownerId = cookieStore.get(DEMO_SESSION_COOKIE)?.value;
  const orders = ownerId ? getOrdersForOwner(ownerId) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Order history</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Your recent orders</h1>
        </div>

        <Link href="/menu" className="rounded-full bg-orange-600 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700">
          Order again
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600">No orders yet</p>
          <h2 className="mt-3 text-2xl font-black text-slate-900">Your order history is empty.</h2>
          <p className="mt-3 text-slate-600">Place an order from the menu to see it here.</p>
          <Link href="/menu" className="mt-6 inline-block rounded-full bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-700">
            Browse menu
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article key={order.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Order #{order.id.slice(0, 8)}</p>
                  <h2 className="mt-2 text-xl font-black text-slate-900">{order.name}</h2>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleString()}</p>
                  <p className="mt-1 text-2xl font-black text-orange-600">{order.total} ETB</p>
                </div>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
                <div>
                  <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-slate-500">Items</p>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={`${order.id}-${item.id}`} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-semibold text-slate-900">{item.subtotal} ETB</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-orange-50 p-4">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">Summary</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <div className="flex justify-between">
                      <span>Location</span>
                      <span className="font-semibold text-slate-900">{order.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone</span>
                      <span className="font-semibold text-slate-900">{order.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment</span>
                      <span className="font-semibold text-slate-900">{order.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
