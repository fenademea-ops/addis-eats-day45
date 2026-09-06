import { useSearchParams, Link } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { CartProvider, useCart } from "./context/CartContext";

const CATEGORIES = ["all", "starters", "mains", "desserts", "drinks", "specials"];

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();

  const currentCategory = searchParams.get("category") || "all";
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  const handleCategoryChange = (category) => {
    if (category === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category });
    }
  };

  const filteredDishes = dishes
    ? currentCategory === "all"
      ? dishes
      : dishes.filter((dish) => dish.category === currentCategory)
    : [];

  return (
    <section className="menu-section">
      <h2>Our Menu</h2>
      <nav className="category-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={currentCategory === cat ? "active" : ""}
            onClick={() => handleCategoryChange(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </nav>

      {loading && <p className="loading-state">Loading fresh menu items...</p>}
      {error && <p className="error-state">Error loading menu: {error}</p>}

      {!loading && !error && (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <article key={dish.id} className="dish-card">
              {dish.image && (
                <img src={dish.image} alt={dish.name} className="dish-image" />
              )}
              <div className="dish-details">
                <h3>
                  <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
                </h3>
                <p className="price">{dish.price.toFixed(2)} ETB</p>
                <button className="add-btn" onClick={() => addItem(dish)}>
                  Add to Order
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}