import { useEffect } from "react";
import DishCard from "../components/DishCard";
import { useMenuStore } from "../stores/menuStore";
import DishCardSkeleton from "../components/DishCardSkeleton";

function Menu() {
  const dishes = useMenuStore((state) => state.dishes);
  const loading = useMenuStore((state) => state.loading);
  const error = useMenuStore((state) => state.error);
  const loadDishes = useMenuStore((state) => state.loadDishes);

  useEffect(() => {
    loadDishes();
  }, [loadDishes]);

  if (loading) {
  return (
    <main className="menu-page">
      <div className="menu-container">
        <h1 className="menu-title">Addis Eats Menu</h1>

        <p className="menu-subtitle">
          Loading delicious food for you...
        </p>

        <div className="food-grid">
          {Array.from({ length: 6 }).map((_, index) => (
            <DishCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </main>
  );
}

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <main className="menu-page">
      <div className="menu-container">
        <h1 className="menu-title">Addis Eats Menu</h1>

        <p className="menu-subtitle">
          Delicious food delivered across Addis Ababa
        </p>

        <div className="food-grid">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Menu;