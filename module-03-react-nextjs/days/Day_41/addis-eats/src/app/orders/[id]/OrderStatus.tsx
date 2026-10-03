"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

type Order = {
  id: string;
  status: string;
  total: number;
};

type Props = {
  id: string;
  initialOrder: Order;
};

export default function OrderStatus({
  id,
  initialOrder,
}: Props) {
  const {
    data: order,
    error,
  } = useSWR<Order>(
    `/api/orders/${id}`,
    fetcher,
    {
      fallbackData: initialOrder,
      refreshInterval: 5000,
    }
  );

  if (error) {
    return (
      <p className="text-red-600">
        Failed to load order.
      </p>
    );
  }

  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">
        Order #{order?.id}
      </h2>

      <p className="mb-2">
        <strong>Status:</strong>{" "}
        {order?.status}
      </p>

      <p className="mb-4">
        <strong>Total:</strong> Br{" "}
        {order?.total}
      </p>

      <p className="text-sm text-gray-500">
        Status automatically updates every 5 seconds.
      </p>
    </div>
  );
}