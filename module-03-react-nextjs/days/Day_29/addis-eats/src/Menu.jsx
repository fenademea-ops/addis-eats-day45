import { useState, useEffect, useRef } from "react";
import { fetchDishes } from "./api";
import DishList from "./DishList";

const CATEGORIES = ["all", "starters", "mains", "desserts", "drinks", "specials"];

export default function Menu() {
  const [dishes, setDishes] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchInputRef = useRef(null);

  // Focus the search input on mount
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  // Fetch dishes on category change with AbortController cancellation
  useEffect(() => {
    const controller = new AbortController();

    async function loadMenu() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchDishes(category, controller.signal);
        setDishes(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadMenu();

    return () => {
      controller.abort();
    };
  }, [category]);

  return (
    <main className="menu-container">
      <header>
        <h1>Our Menu</h1>
        <input
          ref={searchInputRef}
          type="search"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.value ?? e.target.value)}
          className="search-input"
        />
      </header>

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

      {/* Early returns / State feedback */}
      {loading && <div className="loading-spinner">Loading the menu...</div>}

      {!loading && error && <div className="error-banner">{error}</div>}

      {!loading && !error && <DishList dishes={dishes} search={search} />}
    </main>
  );
}