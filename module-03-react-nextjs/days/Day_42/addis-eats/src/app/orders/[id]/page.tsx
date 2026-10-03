import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getOrderForUser } from "@/lib/orders";
import { getSession } from "@/lib/session";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function OrderDetailPage({ params }: Props) {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=/orders");
  }

  const { id } = await params;
  const order = getOrderForUser(id, session.userId);
  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-3xl p-6">
      <Link className="text-sm font-semibold text-orange-700" href="/orders">
        ← My orders
      </Link>
      <h1 className="mt-4 text-3xl font-bold">Order details</h1>
      <section className="mt-6 space-y-3 rounded-xl border p-5">
        <p><strong>Order:</strong> {order.id}</p>
        <p><strong>Items:</strong> {order.items.join(", ")}</p>
        <p><strong>Total:</strong> ETB {order.total}</p>
        <p><strong>Status:</strong> {order.status}</p>
      </section>
    </main>
  );
}
