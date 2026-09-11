import { useState } from "react";
import { Link } from "react-router-dom";

import { useFavoritesStore } from "../stores/favoritesStore";
import { useCartStore } from "../stores/cartStore";

function DishCard({ dish }) {
  const [added, setAdded] = useState(false);

  const favoriteIds = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addDish = useCartStore((state) => state.addDish);

  const isFavorite = favoriteIds.includes(dish.id);
  const isPopular = ["Doro Wat", "Kitfo"].includes(dish.name);

  function handleAddToCart() {
    if (!dish.available) {
      return;
    }

    addDish(dish);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 900);
  }

  return (
    <article className="food-card">
      <div className="food-image-wrap">
        <Link className="food-image-link" to={`/menu/${dish.id}`}>
          <img
            className="food-image"
            src={dish.image}
            alt={dish.name}
          />
        </Link>

        {dish.available && (
          <button
            className={`favorite-button ${isFavorite ? "favorite-button-active" : ""}`}
            aria-label={isFavorite ? `Remove ${dish.name} from favorites` : `Favorite ${dish.name}`}
            onClick={() => toggleFavorite(dish.id)}
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        )}

        {isPopular && (
          <span className="popular-tag">Popular</span>
        )}

        {!dish.available && (
          <span className="sold-out-badge">Sold Out</span>
        )}
      </div>

      <div className="food-content">
        <span className="food-category">
          {dish.category}
        </span>

        <Link className="food-name-link" to={`/menu/${dish.id}`}>
          <h2 className="food-name">{dish.name}</h2>
        </Link>

        <p className="food-description">
          {dish.description}
        </p>

        <div className="food-bottom">
          <span className="food-price">
            {dish.price} ETB
          </span>

          <div className="food-card-actions">
            <button
              className={`add-button ${added ? "add-button-added" : ""} ${!dish.available ? "add-button-disabled" : ""}`}
              disabled={!dish.available}
              onClick={handleAddToCart}
            >
              {dish.available ? (added ? "Added ✓" : "Add to Cart") : "Sold Out"}
            </button>

            <Link className="food-card-open-link" to={`/menu/${dish.id}`}>
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default DishCard;