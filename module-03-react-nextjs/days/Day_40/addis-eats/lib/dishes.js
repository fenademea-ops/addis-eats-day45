import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const MENU_DATA_PATH = path.join(process.cwd(), "public", "menu-data.json");

function readMenuData() {
  const raw = readFileSync(MENU_DATA_PATH, "utf8");
  return JSON.parse(raw);
}

function writeMenuData(dishes) {
  writeFileSync(MENU_DATA_PATH, `${JSON.stringify(dishes, null, 2)}\n`, "utf8");
}

function slugifyDishName(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "dish";
}

export function getDishes() {
  return readMenuData();
}

export function getDishById(id) {
  return getDishes().find((dish) => String(dish.id).toLowerCase() === String(id).toLowerCase());
}

export function getMenuCategories() {
  const categories = [...new Set(getDishes().map((dish) => dish.category))];
  return ["All", ...categories];
}

export function createDish(data) {
  const dishes = getDishes();
  const name = String(data.name || "").trim();
  const baseId = slugifyDishName(data.id || name);
  const uniqueId = `${baseId}-${dishes.filter((dish) => dish.id.startsWith(baseId)).length + 1}`;

  const newDish = {
    id: uniqueId,
    name,
    category: String(data.category || "").trim(),
    description: String(data.description || "").trim(),
    price: Number(data.price),
    image: String(data.image || "/images/hero.png").trim(),
    available: data.available !== undefined ? Boolean(data.available) : true,
  };

  dishes.push(newDish);
  writeMenuData(dishes);
  return newDish;
}

export function updateDish(id, data) {
  const dishes = getDishes();
  const index = dishes.findIndex((dish) => String(dish.id).toLowerCase() === String(id).toLowerCase());

  if (index === -1) {
    return null;
  }

  dishes[index] = {
    ...dishes[index],
    name: String(data.name || dishes[index].name).trim(),
    category: String(data.category || dishes[index].category).trim(),
    description: String(data.description || dishes[index].description).trim(),
    price: Number(data.price ?? dishes[index].price),
    image: String(data.image || dishes[index].image || "/images/hero.png").trim(),
    available: data.available !== undefined ? Boolean(data.available) : Boolean(dishes[index].available !== false),
  };

  writeMenuData(dishes);
  return dishes[index];
}

export function toggleDishAvailability(id) {
  const dishes = getDishes();
  const index = dishes.findIndex((dish) => String(dish.id).toLowerCase() === String(id).toLowerCase());

  if (index === -1) {
    return null;
  }

  dishes[index] = {
    ...dishes[index],
    available: dishes[index].available === false,
  };

  writeMenuData(dishes);
  return dishes[index];
}

export function deleteDish(id) {
  const dishes = getDishes();
  const nextDishes = dishes.filter((dish) => String(dish.id).toLowerCase() !== String(id).toLowerCase());

  if (nextDishes.length === dishes.length) {
    return false;
  }

  writeMenuData(nextDishes);
  return true;
}
