import { NextResponse } from "next/server";

import { getDishById } from "@/lib/dishes";
import { createOrder } from "@/lib/orders";
import { getOrCreateDemoSession } from "@/lib/session";
import { orderSchema } from "@/lib/schema";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = orderSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = {};
    parsed.error.issues.forEach((issue) => {
      const field = issue.path[0] || "form";
      fieldErrors[field] ??= [];
      fieldErrors[field].push(issue.message);
    });

    return NextResponse.json({ error: "Validation failed", fieldErrors }, { status: 422 });
  }

  const items = [];
  for (const item of parsed.data.items) {
    const dish = getDishById(item.id);
    if (!dish) {
      return NextResponse.json(
        { error: "Validation failed", fieldErrors: { items: ["One or more dishes are unavailable."] } },
        { status: 422 },
      );
    }

    items.push({
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
    items,
    ownerId,
  });

  return NextResponse.json({ success: true, message: "Order received", order }, { status: 201 });
}
