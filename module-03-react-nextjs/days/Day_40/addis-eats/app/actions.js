"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { getDishById } from "@/lib/dishes";
import { cancelOrderForOwner, createOrder } from "@/lib/orders";
import { DEMO_SESSION_COOKIE, getOrCreateDemoSession } from "@/lib/session";
import { orderSchema } from "@/lib/schema";

function getFieldErrors(error) {
  return error.issues.reduce((fieldErrors, issue) => {
    const field = issue.path[0] || "form";
    fieldErrors[field] ??= [];
    fieldErrors[field].push(issue.message);
    return fieldErrors;
  }, {});
}

function getSubmittedItems(formData) {
  try {
    return JSON.parse(String(formData.get("items") || "[]"));
  } catch {
    return null;
  }
}

export async function placeOrder(_previousState, formData) {
  const values = Object.fromEntries(
    ["name", "phone", "location", "paymentMethod"].map((field) => {
      const value = formData.get(field);
      return [field, typeof value === "string" ? value : ""];
    }),
  );
  const parsed = orderSchema.safeParse({
    ...values,
    items: getSubmittedItems(formData),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: getFieldErrors(parsed.error),
      values,
    };
  }

  const orderItems = [];
  for (const item of parsed.data.items) {
    const dish = getDishById(item.id);
    if (!dish) {
      return {
        success: false,
        message: "One or more selected dishes are no longer available.",
        fieldErrors: { items: ["Refresh the menu and try again."] },
        values,
      };
    }

    orderItems.push({
      id: dish.id,
      name: dish.name,
      unitPrice: dish.price,
      quantity: item.quantity,
      subtotal: dish.price * item.quantity,
    });
  }

  const ownerId = await getOrCreateDemoSession();
  const order = createOrder({
    customer: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      location: parsed.data.location,
      paymentMethod: parsed.data.paymentMethod,
    },
    items: orderItems,
    ownerId,
  });

  revalidatePath("/checkout");
  return {
    success: true,
    message: "Order placed successfully.",
    fieldErrors: {},
    order,
  };
}

export async function cancelOrder(_previousState, formData) {
  const orderId = String(formData.get("orderId") || "");
  const cookieStore = await cookies();
  const ownerId = cookieStore.get(DEMO_SESSION_COOKIE)?.value;
  const result = cancelOrderForOwner(orderId, ownerId);

  if (result.success) {
    revalidatePath("/checkout");
  }

  return result;
}
