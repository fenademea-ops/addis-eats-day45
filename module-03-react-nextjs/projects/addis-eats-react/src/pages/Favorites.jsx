import { useState } from "react";

import { useMenuStore } from "../stores/menuStore";
import { useFavoritesStore } from "../stores/favoritesStore";
import { useCartStore } from "../stores/cartStore";

function Favorites() {
  const dishes = useMenuStore((state) => state.dishes);
  const favoriteIds = useFavoritesStore((state) => state.favorites);
  const addDish = useCartStore((state) => state.addDish);

  const orderedFavoriteDishes = favoriteIds
    .map((id) => dishes.find((dish) => dish.id === id))
    .filter(Boolean);

  return (
    <main className="page-shell">
      <section className="page-content">
        <div className="page-heading">
          <span className="page-kicker">Addis Eats</span>
          <h1 className="page-title">Favorites</h1>
          <p className="page-copy">
            Your saved dishes will appear here.
          </p>
        </div>

        {orderedFavoriteDishes.length === 0 ? (
          <div className="empty-panel">
            <span className="empty-icon">♥</span>
            <h2>No favorites yet</h2>
            <p>Save dishes you love from the menu to build your shortlist.</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {orderedFavoriteDishes.map((dish) => (
              <article className="favorite-list-item" key={dish.id}>
                <div className="favorite-list-image">
                  <img src={dish.image} alt={dish.name} />
                </div>

                <div className="favorite-list-copy">
                  <span className="food-category">{dish.category}</span>
                  <h2 className="food-name">{dish.name}</h2>
                  <p className="food-description">{dish.description}</p>
                  <span className="food-price">{dish.price} ETB</span>

                  <button className="favorite-add-button" onClick={() => addDish(dish)}>
                    Add to Cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Favorites;
