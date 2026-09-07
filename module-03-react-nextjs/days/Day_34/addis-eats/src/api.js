/**
 * Fetches dishes from the static JSON file and simulates filtering by category.
 * Passes along an AbortSignal to handle request cancellation.
 */
export async function fetchDishes(category = "all", signal) {
  const response = await fetch("/dishes.json", { signal });

  if (!response.ok) {
    throw new Error("We couldn't load the menu right now. Please try again later.");
  }

  const data = await response.json();

  if (category && category !== "all") {
    return data.filter((dish) => dish.category === category);
  }

  return data;
}