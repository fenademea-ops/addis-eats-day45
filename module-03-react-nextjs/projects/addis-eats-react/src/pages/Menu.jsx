import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import DishCard from "../components/DishCard";
import DishCardSkeleton from "../components/DishCardSkeleton";
import { useMenuStore } from "../stores/menuStore";
import { useCartStore } from "../stores/cartStore";

function Menu() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = searchParams.get("category") || "All";

  const dishes = useMenuStore((state) => state.dishes);
  const loading = useMenuStore((state) => state.loading);
  const error = useMenuStore((state) => state.error);
  const loadDishes = useMenuStore((state) => state.loadDishes);
  const syncCartWithMenu = useCartStore((state) => state.syncCartWithMenu);

  useEffect(() => {
    loadDishes();
  }, [loadDishes]);

  useEffect(() => {
    if (!loading && dishes.length > 0) {
      syncCartWithMenu(dishes);
    }
  }, [dishes, loading, syncCartWithMenu]);

  const categories = [
    "All",
    "Ethiopian",
    "Pizza",
    "Burgers",
    "Drinks",
  ];

  // First filter by category
  const categoryFilteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  // Then filter by search
  const filteredDishes = categoryFilteredDishes.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleCategoryChange(category) {
    if (category === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  }

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
    return (
      <main className="menu-page">
        <div className="menu-container">
          <h2>{error}</h2>
        </div>
      </main>
    );
  }

  return (
    <main className="menu-page">
      <div className="menu-container">
        <section className="menu-hero">
          <div className="menu-hero-copy">
            <span className="menu-kicker">Freshly made</span>
            <h1 className="menu-title">Addis Eats Menu</h1>
            <p className="menu-subtitle">
              Delicious food delivered across Addis Ababa.
            </p>
          </div>

          <div className="menu-hero-meta">
            <div className="menu-stat">
              <span className="menu-stat-label">Dishes</span>
              <strong>{dishes.length}</strong>
            </div>
            <div className="menu-stat">
              <span className="menu-stat-label">Popular</span>
              <strong>Doro Wat</strong>
            </div>
          </div>
        </section>

        <div className="menu-toolbar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search dishes..."
              className="search-input"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
        </div>

        <div className="category-container">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-results-bar">
          <span>{filteredDishes.length} items</span>
          <span>
            {selectedCategory === "All" ? "All categories" : selectedCategory}
          </span>
        </div>

        {filteredDishes.length === 0 ? (
          <div className="no-results">
            <h3>No dishes found</h3>
            <p>
              No dishes found
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>
        ) : (
          <div className="food-grid">
            {filteredDishes.map((dish) => (
              <DishCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

export default Menu;