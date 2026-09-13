import { useEffect } from "react";
import { Link } from "react-router-dom";

import DishCard from "../components/DishCard";
import { useMenuStore } from "../stores/menuStore";

function Home() {
  const loadDishes = useMenuStore((state) => state.loadDishes);
  const dishes = useMenuStore((state) => state.dishes);

  useEffect(() => {
    loadDishes();
  }, [loadDishes]);

  const featuredDishes = dishes.filter((dish) => dish.featured);
  const homeCards = featuredDishes.length >= 3 ? featuredDishes.slice(0, 3) : dishes.slice(0, 3);
  const specialDish = featuredDishes[0] || dishes[0];

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">Addis Eats</p>

          <h1>Fresh food, delivered fast.</h1>

          <Link to="/menu" className="hero-button">
            Explore Menu
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Explore Menu</h2>
          <p>Find something delicious to eat.</p>
        </div>

        <div className="home-menu-card-grid">
          {homeCards.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-header">
          <h2>Today's Specials</h2>
          <p>Some of our popular choices.</p>
        </div>

        {specialDish ? (
          <div className="specials-grid">
            <DishCard dish={specialDish} />
          </div>
        ) : (
          <div className="specials-placeholder">
            <p>Our special dishes will appear here.</p>
            <Link to="/menu" className="hero-button">
              View Full Menu
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;