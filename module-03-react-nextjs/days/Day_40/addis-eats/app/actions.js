"use server";

import { cookies, headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  ADMIN_ROLE_COOKIE,
  createAdminSessionToken,
  getAdminCredentials,
  getAdminSession,
} from "@/lib/admin-auth";
import {
  createDish as createDishInStore,
  deleteDish as deleteDishFromStore,
  getDishById,
  toggleDishAvailability,
  updateDish as updateDishInStore,
} from "@/lib/dishes";
import {
  cancelOrderForOwner,
  createOrder,
  getOrderById,
  updateOrderStatus as updateOrderStatusInStore,
} from "@/lib/orders";
import { DEMO_SESSION_COOKIE, getOrCreateDemoSession } from "@/lib/session";
import { adminLoginSchema, dishSchema, orderSchema, orderStatusSchema } from "@/lib/schema";

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

export async function loginAdmin(_previousState, formData) {
  const values = {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  };
  const parsed = adminLoginSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the highlighted fields.",
      fieldErrors: getFieldErrors(parsed.error),
      values: { email: values.email },
    };
  }

  const credentials = getAdminCredentials();
  if (
    parsed.data.email.toLowerCase() !== credentials.email.trim().toLowerCase()
    || parsed.data.password !== credentials.password
  ) {
    return {
      success: false,
      message: "Invalid email or password.",
      fieldErrors: {},
      values: { email: parsed.data.email },
    };
  }

  const rememberMe = formData.get("rememberMe") === "on";
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 12;
  const expiresAt = Date.now() + maxAge * 1000;
  const requestHeaders = await headers();
  const forwardedProto = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim().toLowerCase();
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_ROLE_COOKIE, createAdminSessionToken(expiresAt), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" && forwardedProto === "https",
    path: "/",
    maxAge,
  });

  redirect("/admin");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_ROLE_COOKIE);
  redirect("/admin/login");
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

    if (dish.available === false) {
      return {
        success: false,
        message: `${dish.name} is currently sold out.`,
        fieldErrors: { items: [`${dish.name} is currently sold out.`] },
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
  revalidatePath("/admin");
  revalidatePath("/admin/orders");
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
    revalidatePath("/admin");
    revalidatePath("/admin/orders");
  }

  return result;
}

export async function addDish(_previousState, formData) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return {
      success: false,
      message: "Unauthorized admin action. Please sign in as an admin to change dishes.",
      fieldErrors: {},
      values: {},
    };
  }

  const values = {
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || ""),
    description: String(formData.get("description") || ""),
    price: String(formData.get("price") || ""),
    image: String(formData.get("image") || "/images/hero.png"),
    available: formData.get("available") === "true",
  };

  const parsed = dishSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the dish form.",
      fieldErrors: getFieldErrors(parsed.error),
      values,
    };
  }

  const dish = createDishInStore(parsed.data);
  revalidatePath("/menu");
  revalidatePath("/admin");
  revalidatePath("/admin/dishes");

  return {
    success: true,
    message: `${dish.name} has been added to the menu.`,
    fieldErrors: {},
    values,
    dish,
  };
}

export async function updateDish(_previousState, formData) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return {
      success: false,
      message: "Unauthorized admin action. Please sign in as an admin to edit dishes.",
      fieldErrors: {},
      values: {},
    };
  }

  const dishId = String(formData.get("dishId") || "");
  const values = {
    name: String(formData.get("name") || ""),
    category: String(formData.get("category") || ""),
    description: String(formData.get("description") || ""),
    price: String(formData.get("price") || ""),
    image: String(formData.get("image") || "/images/hero.png"),
    available: formData.get("available") === "true",
  };

  const parsed = dishSchema.safeParse(values);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please correct the edited dish information.",
      fieldErrors: getFieldErrors(parsed.error),
      values,
    };
  }

  const existingDish = getDishById(dishId);
  if (!existingDish) {
    return {
      success: false,
      message: "The dish could not be found.",
      fieldErrors: {},
      values,
    };
  }

  const updated = updateDishInStore(dishId, parsed.data);
  revalidatePath("/menu");
  revalidatePath("/admin");
  revalidatePath("/admin/dishes");
  revalidatePath(`/menu/${existingDish.id}`);

  return {
    success: true,
    message: `${updated.name} was updated successfully.`,
    fieldErrors: {},
    values,
    dish: updated,
  };
}

export async function deleteDish(_previousState, formData) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return {
      success: false,
      message: "Unauthorized admin action. Please sign in as an admin to delete dishes.",
    };
  }

  const dishId = String(formData.get("dishId") || "");
  if (!dishId) {
    return {
      success: false,
      message: "No dish ID was provided.",
    };
  }

  const dish = getDishById(dishId);
  if (!dish) {
    return {
      success: false,
      message: "Dish not found.",
    };
  }

  const deleted = deleteDishFromStore(dishId);
  if (!deleted) {
    return {
      success: false,
      message: "The dish could not be deleted.",
    };
  }

  revalidatePath("/menu");
  revalidatePath("/admin");
  revalidatePath("/admin/dishes");

  return {
    success: true,
    message: `${dish.name} was deleted successfully.`,
  };
}

export async function updateOrderStatusAction(_previousState, formData) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return {
      success: false,
      message: "Unauthorized admin action. Please sign in as an admin to update orders.",
    };
  }

  const orderId = String(formData.get("orderId") || "");
  const status = String(formData.get("status") || "");

  const parsed = orderStatusSchema.safeParse(status);
  if (!parsed.success) {
    return {
      success: false,
      message: "The selected order status is invalid.",
    };
  }

  const order = getOrderById(orderId);
  if (!order) {
    return {
      success: false,
      message: "Order not found.",
    };
  }

  const updated = updateOrderStatusInStore(orderId, parsed.data);
  revalidatePath("/admin");
  revalidatePath("/admin/orders");

  return {
    success: true,
    message: `Order ${order.id.slice(0, 8)} updated to ${updated.status}.`,
    order: updated,
  };
}

export async function updateOrderStatus(formData) {
  return updateOrderStatusAction(null, formData);
}

export async function toggleDishAvailabilityAction(formData) {
  const session = await getAdminSession();
  if (!session.isAdmin) {
    return { success: false, message: "Unauthorized admin action." };
  }

  const dishId = String(formData.get("dishId") || "");
  const dish = getDishById(dishId);
  if (!dish) {
    return { success: false, message: "Dish not found." };
  }

  const updated = toggleDishAvailability(dishId);
  revalidatePath("/menu");
  revalidatePath(`/menu/${dish.id}`);
  revalidatePath("/admin");
  revalidatePath("/admin/dishes");

  return {
    success: true,
    message: `${dish.name} is now ${updated.available ? "available" : "sold out"}.`,
  };
}
