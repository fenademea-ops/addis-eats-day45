"use server";

import { revalidatePath } from "next/cache";
import { orderSchema } from "../lib/schema";
import { getOrCreateSession, getSession } from "../lib/session";
import {
  cancelStoredOrder,
  createOrder,
  findOrder,
} from "../lib/store";

function validationResult(result) {
  return {
    success: false,
    fieldErrors: result.error.flatten().fieldErrors,
  };
}

export async function placeOrder(previousState, formData) {
  let items;

  try {
    items = JSON.parse(formData.get("items") || "[]");
  } catch {
    return {
      success: false,
      fieldErrors: { items: ["Order items are invalid"] },
    };
  }

  const rawOrder = {
    customerName: formData.get("customerName"),
    phone: formData.get("phone"),
    deliveryLocation: formData.get("deliveryLocation"),
    paymentMethod: formData.get("paymentMethod"),
    notes: formData.get("notes") || "",
    items,
    total: Number(formData.get("total")),
  };
  const result = orderSchema.safeParse(rawOrder);

  if (!result.success) {
    return validationResult(result);
  }

  try {
    const session = await getOrCreateSession();
    const order = await createOrder(result.data, session.user.id);

    // Refresh cached order data after creating a new order.
    revalidatePath("/orders");
    return { success: true, order, fieldErrors: {} };
  } catch {
    return {
      success: false,
      error: "We could not place your order. Please try again.",
      fieldErrors: {},
    };
  }
}

export async function cancelOrder(orderId) {
  const session = await getSession();

  if (!session) {
    return { success: false, error: "Unauthorized" };
  }

  const order = await findOrder(orderId);

  if (!order || order.userId !== session.user.id) {
    return { success: false, error: "Forbidden" };
  }

  const cancelledOrder = await cancelStoredOrder(orderId);
  // Refresh the orders page after changing the order status.
  revalidatePath("/orders");
  return { success: true, order: cancelledOrder };
}
