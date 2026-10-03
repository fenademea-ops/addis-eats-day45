import "server-only";

import { randomUUID } from "node:crypto";

export type OrderStatus =
  | "Pending"
  | "Preparing"
  | "Ready"
  | "Delivered"
  | "Cancelled";

export type Order = {
  id: string;
  userId: string;
  customerName: string;
  items: string[];
  total: number;
  status: OrderStatus;
  createdAt: string;
};

const initialOrders: Order[] = [
  {
    id: "order-a-1",
    userId: "customer-a",
    customerName: "Customer A",
    items: ["Doro wat", "Injera"],
    total: 420,
    status: "Preparing",
    createdAt: "2026-10-02T09:00:00.000Z",
  },
  {
    id: "order-b-1",
    userId: "customer-b",
    customerName: "Customer B",
    items: ["Shiro", "Injera"],
    total: 280,
    status: "Pending",
    createdAt: "2026-10-02T09:15:00.000Z",
  },
];

declare global {
  var __addisEatsDay42Orders: Order[] | undefined;
}

function getOrderStore(): Order[] {
  globalThis.__addisEatsDay42Orders ??= initialOrders.map((order) => ({
    ...order,
    items: [...order.items],
  }));
  return globalThis.__addisEatsDay42Orders;
}

function publicOrder(order: Order): Order {
  return { ...order, items: [...order.items] };
}

export function getOrdersForUser(userId: string): Order[] {
  return getOrderStore()
    .filter((order) => order.userId === userId)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(publicOrder);
}

export function getOrderForUser(
  orderId: string,
  userId: string,
): Order | null {
  const order = getOrderStore().find(
    (candidate) => candidate.id === orderId && candidate.userId === userId,
  );
  return order ? publicOrder(order) : null;
}

export function createOrderForUser(
  userId: string,
  customerName: string,
  meal: string,
): Order {
  const menu: Record<string, number> = {
    "Doro wat": 420,
    Shiro: 280,
    Tibs: 500,
  };
  const price = menu[meal];
  if (!price) {
    throw new Error("The selected meal is not available.");
  }

  const order: Order = {
    id: randomUUID(),
    userId,
    customerName,
    items: [meal],
    total: price,
    status: "Pending",
    createdAt: new Date().toISOString(),
  };
  getOrderStore().push(order);
  return publicOrder(order);
}

export function cancelOrderForUser(
  orderId: string,
  userId: string,
): boolean {
  const order = getOrderStore().find(
    (candidate) => candidate.id === orderId && candidate.userId === userId,
  );
  if (!order || order.status === "Delivered" || order.status === "Cancelled") {
    return false;
  }

  order.status = "Cancelled";
  return true;
}

export function getAllOrdersForStaff(): Order[] {
  return getOrderStore()
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map(publicOrder);
}

export function updateOrderStatusAsStaff(
  orderId: string,
  status: OrderStatus,
): Order | null {
  const order = getOrderStore().find((candidate) => candidate.id === orderId);
  if (!order) {
    return null;
  }

  order.status = status;
  return publicOrder(order);
}
