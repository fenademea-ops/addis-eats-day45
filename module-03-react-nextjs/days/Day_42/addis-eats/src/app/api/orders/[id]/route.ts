import { NextResponse } from "next/server";
import { cancelOrderForUser, getOrderForUser } from "@/lib/orders";
import { getSession } from "@/lib/session";

type Context = {
  params: Promise<{ id: string }>;
};

function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  return origin !== null && origin === new URL(request.url).origin;
}

export async function GET(_request: Request, { params }: Context) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }

  const { id } = await params;
  const order = getOrderForUser(id, session.userId);
  if (!order) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return NextResponse.json(order, {
    headers: { "Cache-Control": "private, no-store" },
  });
}

export async function DELETE(request: Request, { params }: Context) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { error: "Authentication required." },
      { status: 401 },
    );
  }
  if (!isSameOriginRequest(request)) {
    return NextResponse.json(
      { error: "Invalid request origin." },
      { status: 403 },
    );
  }

  const { id } = await params;
  if (!cancelOrderForUser(id, session.userId)) {
    return NextResponse.json({ error: "Order not found." }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}
