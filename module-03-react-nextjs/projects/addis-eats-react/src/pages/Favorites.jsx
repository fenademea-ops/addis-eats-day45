import { useMenuStore } from "../stores/menuStore";
import { useFavoritesStore } from "../stores/favoritesStore";

function Favorites() {
  const dishes = useMenuStore((state) => state.dishes);
  const favoriteIds = useFavoritesStore((state) => state.favorites);

  const favoriteDishes = dishes.filter((dish) => favoriteIds.includes(dish.id));

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

        {favoriteDishes.length === 0 ? (
          <div className="empty-panel">
            <span className="empty-icon">♥</span>
            <h2>No favorites yet</h2>
            <p>Save dishes you love from the menu to build your shortlist.</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {favoriteDishes.map((dish) => (
              <article className="favorite-list-item" key={dish.id}>
                <div className="favorite-list-image">
                  <img src={dish.image} alt={dish.name} />
                </div>

                <div className="favorite-list-copy">
                  <span className="food-category">{dish.category}</span>
                  <h2 className="food-name">{dish.name}</h2>
                  <p className="food-description">{dish.description}</p>
                  <span className="food-price">{dish.price} ETB</span>
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
