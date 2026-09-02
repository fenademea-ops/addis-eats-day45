import { useState, useRef, useEffect, useMemo } from "react";
import { useFetch } from "./hooks/useFetch";
import DishList from "./components/DishList";

const CATEGORIES = ["all", "starters", "mains", "desserts", "drinks", "specials"];

export default function Menu() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const { data: rawDishes, loading, error } = useFetch("/dishes.json");

  const categoryFilteredDishes = useMemo(() => {
    if (!rawDishes) return [];
    if (category === "all") return rawDishes;
    return rawDishes.filter((dish) => dish.category === category);
  }, [rawDishes, category]);

  return (
    <section className="menu-section">
      <div className="controls">
        <input
          ref={searchRef}
          type="search"
          placeholder="Search Ethiopian dishes (e.g., Tibs, Doro Wat)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        <nav className="category-filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={category === cat ? "active" : ""}
              onClick={() => setCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {loading && <div className="loading-spinner">Loading fresh menu items...</div>}

      {!loading && error && <div className="error-banner">{error}</div>}

      {!loading && !error && (
        <DishList dishes={categoryFilteredDishes} search={search} />
      )}
    </section>
  );
}