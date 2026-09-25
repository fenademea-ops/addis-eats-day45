import { dishes } from "../data/dishes";
import DishList from "./DishList";
import FilterShell from "./FilterShell";

async function getDishes() {
  return dishes;
}

export default async function MenuPage({ searchParams }) {
  const menuDishes = await getDishes();
  const activeCategory = searchParams?.category || "All dishes";
  const filteredDishes =
    activeCategory === "All dishes"
      ? menuDishes
      : menuDishes.filter((dish) => dish.category === activeCategory);

  return (
    <FilterShell activeCategory={activeCategory}>
      <div>
        <div className="menu-heading">
          <div>
            <p className="eyebrow">A table full of welcome</p>
            <h2>Choose your plate</h2>
          </div>
          <span className="menu-count">{filteredDishes.length} favorites</span>
        </div>
        <DishList dishes={filteredDishes} />
      </div>
    </FilterShell>
  );
}
