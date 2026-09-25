import { findDish } from "../../../../lib/dishes";

export async function GET(request, { params }) {
  const { id } = await params;
  const dish = findDish(id);

  if (!dish) {
    return Response.json({ error: "Dish not found" }, { status: 404 });
  }

  return Response.json(dish);
}
