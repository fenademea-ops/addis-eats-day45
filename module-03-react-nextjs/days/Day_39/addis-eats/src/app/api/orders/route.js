import { orderSchema } from "../../../lib/schema";
import { getOrCreateSession } from "../../../lib/session";
import { createOrder } from "../../../lib/store";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { fieldErrors: { form: ["Request body must be valid JSON"] } },
      { status: 422 },
    );
  }

  const result = orderSchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      { fieldErrors: result.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  try {
    const session = await getOrCreateSession();
    const order = await createOrder(result.data, session.user.id);
    return Response.json({ success: true, order }, { status: 201 });
  } catch {
    return Response.json({ error: "Unable to create order" }, { status: 500 });
  }
}
