import Link from "next/link";
import { redirect } from "next/navigation";
import { cancelOrder, signOut } from "@/app/actions";
import { getOrdersForUser } from "@/lib/orders";
import { getSession } from "@/lib/session";

type Props = {
  searchParams: Promise<{ error?: string }>;
};

export default async function OrdersPage({ searchParams }: Props) {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=/orders");
  }

  const orders = getOrdersForUser(session.userId);
  const params = await searchParams;

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link className="text-sm font-semibold text-orange-700" href="/">
            Addis Eats
          </Link>
          <h1 className="mt-2 text-3xl font-bold">My orders</h1>
        </div>
        <form action={signOut}>
          <button className="rounded-lg border px-4 py-2 font-semibold" type="submit">
            Sign out
          </button>
        </form>
      </div>

      {params.error === "cancel" && (
        <p className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-red-800" role="alert">
          That order could not be cancelled.
        </p>
      )}

      {orders.length === 0 ? (
        <section className="mt-8 rounded-xl border p-6">
          <p>You do not have any orders yet.</p>
          <Link className="mt-4 inline-block font-semibold text-orange-700" href="/checkout">
            Start an order
          </Link>
        </section>
      ) : (
        <ul className="mt-8 space-y-4">
          {orders.map((order) => (
            <li className="rounded-xl border p-5" key={order.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold">Order {order.id}</h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {order.items.join(", ")} · ETB {order.total}
                  </p>
                </div>
                <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-orange-800">
                  {order.status}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Link
                  className="text-sm font-semibold text-orange-700 underline"
                  href={`/orders/${encodeURIComponent(order.id)}`}
                >
                  Order details
                </Link>
                {!["Delivered", "Cancelled"].includes(order.status) && (
                  <form action={cancelOrder}>
                    <input name="orderId" type="hidden" value={order.id} />
                    <button className="text-sm font-semibold text-red-700 underline" type="submit">
                      Cancel order
                    </button>
                  </form>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
