import { NextResponse } from "next/server";

const dishes = [
  { id: 1, name: "Kitfo", category: "Traditional", price: 450 },
  { id: 2, name: "Doro Wat", category: "Traditional", price: 500 },
  { id: 3, name: "Tibs", category: "Meat", price: 550 },
  { id: 4, name: "Shiro", category: "Vegetarian", price: 300 },
  { id: 5, name: "Firfir", category: "Breakfast", price: 280 },
  { id: 6, name: "Pasta", category: "Italian", price: 350 },
  { id: 7, name: "Pizza", category: "Italian", price: 600 },
  { id: 8, name: "Beyaynet", category: "Vegetarian", price: 400 },
  { id: 9, name: "Dulet", category: "Traditional", price: 450 },
  { id: 10, name: "Chechebsa", category: "Breakfast", price: 300 },
  { id: 11, name: "Awaze Tibs", category: "Meat", price: 600 },
  { id: 12, name: "Gored Gored", category: "Traditional", price: 550 },
];

export async function GET(
  request: Request
) {
  const { searchParams } = new URL(request.url);

  const search = searchParams
    .get("search")
    ?.toLowerCase()
    .trim() || "";

  const page = Number(
    searchParams.get("page") || "1"
  );

  const pageSize = 4;

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search)
  );

  const totalPages = Math.ceil(
    filteredDishes.length / pageSize
  );

  const start = (page - 1) * pageSize;

  const results = filteredDishes.slice(
    start,
    start + pageSize
  );

  return NextResponse.json({
    dishes: results,
    page,
    pageSize,
    totalPages,
    total: filteredDishes.length,
  });
}