import { randomUUID } from "node:crypto";

const getOrderStore = () => {
  globalThis.__addisEatsOrders ??= [];
  return globalThis.__addisEatsOrders;
};

export function getOrders() {
  return getOrderStore().slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function getOrderById(orderId) {
  return getOrderStore().find((order) => order.id === orderId) ?? null;
}

export function createOrder({ customer, items, ownerId, status = "Pending" }) {
  const order = {
    id: randomUUID(),
    ...customer,
    items,
    total: items.reduce((sum, item) => sum + item.subtotal, 0),
    status,
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
    status: order.status,
    createdAt: order.createdAt,
  };
}

export function updateOrderStatus(orderId, status) {
  const order = getOrderById(orderId);

  if (!order) {
    return null;
  }

  order.status = status;
  return {
    ...order,
    status,
  };
}

export function deleteOrder(orderId) {
  const orderStore = getOrderStore();
  const index = orderStore.findIndex((order) => order.id === orderId);

  if (index === -1) {
    return false;
  }

  orderStore.splice(index, 1);
  return true;
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