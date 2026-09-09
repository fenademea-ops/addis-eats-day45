import { useEffect, useState } from "react";
import { fetchDishes } from "../api/dishes";
import DishCard from "../components/DishCard";

function Menu() {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDishes() {
      try {
        const data = await fetchDishes();
        setDishes(data);
      } catch (err) {
        setError("Failed to load menu.");
      } finally {
        setLoading(false);
      }
    }

    loadDishes();
  }, []);

  if (loading) {
    return <h2>Loading menu...</h2>;
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