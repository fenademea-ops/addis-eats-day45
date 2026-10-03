"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cancelOrderForUser, createOrderForUser, updateOrderStatusAsStaff, type OrderStatus } from "@/lib/orders";
import { getSafeNext } from "@/lib/redirects";
import { createSession, destroySession, getSession } from "@/lib/session";
import { authenticateAccount } from "@/lib/users";

function getText(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function signIn(formData: FormData): Promise<void> {
  const next = getSafeNext(getText(formData, "next"));
  const account = await authenticateAccount(
    getText(formData, "email"),
    getText(formData, "password"),
  );

  if (!account) {
    const signInUrl = new URL("/signin", "http://addis-eats.local");
    signInUrl.searchParams.set("error", "invalid");
    if (next !== "/") {
      signInUrl.searchParams.set("next", next);
    }
    redirect(`${signInUrl.pathname}${signInUrl.search}`);
  }

  await createSession({ userId: account.id });
  redirect(next);
}

export async function signOut(): Promise<void> {
  await destroySession();
  redirect("/signin?signedOut=1");
}

export async function placeOrder(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=/checkout");
  }

  const meal = getText(formData, "meal");
  if (!["Doro wat", "Shiro", "Tibs"].includes(meal)) {
    redirect("/checkout?error=meal");
  }

  createOrderForUser(session.userId, session.name, meal);
  revalidatePath("/orders");
  redirect("/orders");
}

export async function cancelOrder(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=/orders");
  }

  const orderId = getText(formData, "orderId");
  if (!orderId || !cancelOrderForUser(orderId, session.userId)) {
    redirect("/orders?error=cancel");
  }

  revalidatePath("/orders");
  redirect("/orders");
}

const orderStatuses: OrderStatus[] = [
  "Pending",
  "Preparing",
  "Ready",
  "Delivered",
  "Cancelled",
];

export async function updateOrderStatus(formData: FormData): Promise<void> {
  const session = await getSession();
  if (!session) {
    redirect("/signin?next=/kitchen");
  }
  if (session.role !== "staff") {
    redirect("/");
  }

  const orderId = getText(formData, "orderId");
  const status = getText(formData, "status");
  if (
    !orderId ||
    !orderStatuses.includes(status as OrderStatus) ||
    !updateOrderStatusAsStaff(orderId, status as OrderStatus)
  ) {
    redirect("/kitchen?error=order");
  }

  revalidatePath("/kitchen");
  revalidatePath("/orders");
  redirect("/kitchen");
}
