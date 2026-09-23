import { Suspense } from "react";
import { dishes } from "../data/dishes";
import DishList from "./DishList";

export const revalidate = 60;

function DishListFallback() {
  return <div className="dish-grid" aria-label="Loading dishes"><div className="dish-skeleton" /><div className="dish-skeleton" /><div className="dish-skeleton" /><div className="dish-skeleton" /></div>;
}

async function StreamedDishList() {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return <DishList dishes={dishes} />;
}

export default function MenuPage() {
  return (
    <div>
      <div className="menu-heading"><div><p className="eyebrow">A table full of welcome</p><h2>Choose your plate</h2></div><span className="menu-count">{dishes.length} favorites</span></div>
      <Suspense fallback={<DishListFallback />}><StreamedDishList /></Suspense>
    </div>
  );
}