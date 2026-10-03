import OrderStatus from "./OrderStatus";
import { notFound } from "next/navigation";
import { getOrder } from "@/lib/orders";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await getOrder(id);
  if (!order) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">
        Order Status
      </h1>

      <OrderStatus
        id={id}
        initialOrder={order}
      />
    </main>
  );
}