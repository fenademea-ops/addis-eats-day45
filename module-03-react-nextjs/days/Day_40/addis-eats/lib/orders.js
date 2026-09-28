import { randomUUID } from "node:crypto";

const getOrderStore = () => {
  globalThis.__addisEatsOrders ??= [];
  return globalThis.__addisEatsOrders;
};

export function createOrder({ customer, items, ownerId }) {
  const order = {
    id: randomUUID(),
    ...customer,
    items,
    total: items.reduce((sum, item) => sum + item.subtotal, 0),
    createdAt: new Date().toISOString(),
    ownerId,
  };

  getOrderStore().push(order);
  return {
    id: order.id,
    name: order.name,
    phone: order.phone,
    location: order.location,
    paymentMethod: order.paymentMethod,
    items: order.items,
    total: order.total,
    createdAt: order.createdAt,
  };
}

export function cancelOrderForOwner(orderId, ownerId) {
  const orderStore = getOrderStore();
  const orderIndex = orderStore.findIndex((item) => item.id === orderId);

  if (orderIndex === -1) {
    return { success: false, message: "Order not found." };
  }

  if (!ownerId || orderStore[orderIndex].ownerId !== ownerId) {
    return { success: false, message: "You are not authorized to cancel this order." };
  }

  orderStore.splice(orderIndex, 1);
  return { success: true, message: "Order cancelled." };
}

export function getOrdersForOwner(ownerId) {
  if (!ownerId) {
    return [];
  }

  const orderStore = getOrderStore();
  return orderStore
    .filter((order) => order.ownerId === ownerId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}