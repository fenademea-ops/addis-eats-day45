export async function fetchDishes() {
  const response = await fetch("/menu-data.json");

  if (!response.ok) {
    throw new Error("Failed to load menu data");
  }

  const dishes = await response.json();

  return dishes;
}