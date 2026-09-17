import { useFavoritesStore } from "../stores/favoritesStore.js";

function FavoriteButton({ dishId, dishName = "dish" }) {
  const favorites = useFavoritesStore((state) => state.favorites);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = favorites.includes(dishId);
  return <button className={`favorite-button ${isFavorite ? "favorite-button-active" : ""}`} type="button" aria-label={`${isFavorite ? "Remove" : "Save"} ${dishName}`} onClick={() => toggleFavorite(dishId)}>{isFavorite ? "♥" : "♡"}</button>;
}

export default FavoriteButton;