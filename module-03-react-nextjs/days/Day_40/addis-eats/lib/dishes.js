import { readFileSync } from "node:fs";
import path from "node:path";

export function getDishes() {
  const filePath = path.join(process.cwd(), "public", "menu-data.json");
  const raw = readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

export function getDishById(id) {
  return getDishes().find((dish) => String(dish.id).toLowerCase() === String(id).toLowerCase());
}

export function getMenuCategories() {
  const categories = [...new Set(getDishes().map((dish) => dish.category))];
  return ["All", ...categories];
}
