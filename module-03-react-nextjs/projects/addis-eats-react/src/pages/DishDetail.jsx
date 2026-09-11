import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useMenuStore } from "../stores/menuStore";
import { useFavoritesStore } from "../stores/favoritesStore";
import { useCartStore } from "../stores/cartStore";

function DishDetail() {
  const { dishId } = useParams();
  const [added, setAdded] = useState(false);

  const dishes = useMenuStore((state) => state.dishes);
  const loading = useMenuStore((state) => state.loading);
  const error = useMenuStore((state) => state.error);
  const loadDishes = useMenuStore((state) => state.loadDishes);

  const favoriteIds = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addDish = useCartStore((state) => state.addDish);

  const dish = dishes.find((item) => String(item.id) === String(dishId));
  const isFavorite = favoriteIds.includes(Number(dishId));

  useEffect(() => {
    if (dishes.length === 0 && !loading) {
      loadDishes();
    }
  }, [dishes.length, loadDishes, loading]);

  function handleAddToCart() {
    if (!dish.available) {
      return;
    }

    addDish(dish);
    setAdded(true);

    window.setTimeout(() => setAdded(false), 900);
  }

  if (loading) {
    return (
      <main className="dish-detail-page">
        <div className="dish-detail-container loading-shell">
          <div className="dish-detail-skeleton-image" />
          <div className="dish-detail-info">
            <div className="dish-detail-skeleton-line short" />
            <div className="dish-detail-skeleton-line" />
            <div className="dish-detail-skeleton-line" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dish-detail-page">
        <div className="dish-detail-container">
          <p className="detail-error">{error}</p>
        </div>
      </main>
    );
  }

  if (!dish) {
    return (
      <main className="dish-detail-page">
        <div className="dish-detail-container">
          <div className="dish-detail-not-found">
            <span className="page-kicker">Addis Eats</span>
            <h1 className="page-title">Dish not found</h1>
            <Link className="back-button" to="/menu">
              Back to Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="dish-detail-page">
      <div className="dish-detail-container">
        <Link className="back-button back-button-top" to="/menu">
          ← Back to Menu
        </Link>

        <section className="dish-detail-card">
          <div className="dish-detail-image-wrap">
            <img className="dish-detail-image" src={dish.image} alt={dish.name} />
          </div>

          <article className="dish-detail-content">
            <div className="dish-detail-heading-row">
              <span className="dish-detail-category">{dish.category}</span>

              <button
                className={`detail-favorite-button ${isFavorite ? "favorite-button-active" : ""}`}
                aria-label={isFavorite ? `Remove ${dish.name} from favorites` : `Favorite ${dish.name}`}
                onClick={() => toggleFavorite(dish.id)}
              >
                {isFavorite ? "♥" : "♡"}
              </button>
            </div>

            <h1 className="dish-detail-title">{dish.name}</h1>

            <p className="dish-detail-description">{dish.description}</p>

            <section className="dish-detail-story">
              <span className="meta-label">Card Detail</span>
              <p className="dish-detail-story-copy">
                {dish.details || dish.description}
              </p>
            </section>

            <div className="dish-detail-meta">
              <div>
                <span className="meta-label">Price</span>
                <span className="meta-value">{dish.price} ETB</span>
              </div>

              <div>
                <span className="meta-label">Availability</span>
                <span className={`meta-value ${dish.available ? "available" : "unavailable"}`}> 
                  {dish.available ? "Available" : "Unavailable"}
                </span>
              </div>
            </div>

            <div className="dish-detail-ingredients">
              <span className="meta-label">Ingredients</span>
              <div className="ingredient-list">
                {dish.ingredients?.map((ingredient) => (
                  <span className="ingredient-chip" key={ingredient}>
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            <div className="dish-detail-actions">
              <button
                className={`add-button detail-add-button ${added ? "add-button-added" : ""} ${!dish.available ? "add-button-disabled" : ""}`}
                disabled={!dish.available}
                onClick={handleAddToCart}
              >
                {dish.available ? (added ? "Added ✓" : "Add to Cart") : "Sold Out"}
              </button>
              <Link className="back-button" to="/checkout">
                Continue to Checkout
              </Link>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default DishDetail;
