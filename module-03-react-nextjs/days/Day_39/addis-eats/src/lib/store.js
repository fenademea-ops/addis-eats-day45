import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const dataDirectory = path.join(process.cwd(), "data");
const ordersFile = path.join(dataDirectory, "orders.json");

async function readOrders() {
  try {
    return JSON.parse(await readFile(ordersFile, "utf8"));
  } catch {
    return [];
  }
}

async function writeOrders(orders) {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(ordersFile, JSON.stringify(orders, null, 2));
}

export async function createOrder(order, userId) {
  const orders = await readOrders();
  const savedOrder = {
    ...order,
    id: randomUUID(),
    userId,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  await writeOrders([savedOrder, ...orders]);
  return savedOrder;
}

export async function findOrder(orderId) {
  const orders = await readOrders();
  return orders.find((order) => order.id === orderId);
}

export async function listOrdersForUser(userId) {
  const orders = await readOrders();
  return orders.filter((order) => order.userId === userId);
}

export async function cancelStoredOrder(orderId) {
  const orders = await readOrders();
  const updatedOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status: "cancelled" } : order,
  );

  await writeOrders(updatedOrders);
  return updatedOrders.find((order) => order.id === orderId);
}
