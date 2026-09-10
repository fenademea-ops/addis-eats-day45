import { useFavoritesStore } from "../stores/favoritesStore";
import { useCartStore } from "../stores/cartStore";

function DishCard({ dish }) {
  const favoriteIds = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const addDish = useCartStore((state) => state.addDish);

  const isFavorite = favoriteIds.includes(dish.id);

  return (
    <article className="food-card">
      <div className="food-image-wrap">
        <img
          className="food-image"
          src={dish.image}
          alt={dish.name}
        />

        <button
          className={`favorite-button ${isFavorite ? "favorite-button-active" : ""}`}
          aria-label={isFavorite ? `Remove ${dish.name} from favorites` : `Favorite ${dish.name}`}
          onClick={() => toggleFavorite(dish.id)}
        >
          {isFavorite ? "♥" : "♡"}
        </button>
      </div>

      <div className="food-content">
        <span className="food-category">
          {dish.category}
        </span>

        <h2 className="food-name">{dish.name}</h2>

        <p className="food-description">
          {dish.description}
        </p>

        <div className="food-bottom">
          <span className="food-price">
            {dish.price} ETB
          </span>

          <button className="add-button" onClick={() => addDish(dish)}>
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default DishCard;