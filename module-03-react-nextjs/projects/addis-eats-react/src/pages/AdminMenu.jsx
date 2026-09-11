import { useState } from "react";

import { useMenuStore } from "../stores/menuStore";

function AdminMenu() {
  const dishes = useMenuStore((state) => state.dishes);
  const deleteDish = useMenuStore((state) => state.deleteDish);
  const [query, setQuery] = useState("");

  const visibleDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(query.toLowerCase()) ||
    dish.category.toLowerCase().includes(query.toLowerCase())
  );

  function handleDelete(dishId) {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      deleteDish(dishId);
    }
  }

  return (
    <section className="admin-dashboard">
      <div className="admin-page-title">
        <div>
          <span className="page-kicker">Administration</span>
          <h1 className="page-title">Menu Management</h1>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <h2>All Dishes</h2>
          <input
            className="checkout-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search dishes"
          />
        </div>

        <div className="admin-list">
          {visibleDishes.length === 0 ? (
            <div className="admin-empty">No dishes found</div>
          ) : (
            visibleDishes.map((dish) => (
              <div className="admin-list-row" key={dish.id}>
                <span className="admin-list-image-wrap">
                  <img className="admin-list-image" src={dish.image} alt={dish.name} />
                </span>
                <span className="admin-list-name">{dish.name}</span>
                <span className="admin-list-category">{dish.category}</span>
                <span className="admin-list-category">{dish.available ? "Available" : "Unavailable"}</span>
                <span className="admin-list-category">{dish.featured ? "Featured" : "Standard"}</span>
                <span className="admin-list-price">{dish.price} ETB</span>
                <button className="admin-small-button">Edit</button>
                <button className="admin-small-button danger-button" onClick={() => handleDelete(dish.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
}

export default AdminMenu;
