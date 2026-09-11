import { useEffect, useState } from "react";

import DishForm from "../components/DishForm";
import { useMenuStore } from "../stores/menuStore";

function AdminMenu() {
  const dishes = useMenuStore((state) => state.dishes);
  const loading = useMenuStore((state) => state.loading);
  const error = useMenuStore((state) => state.error);
  const loadDishes = useMenuStore((state) => state.loadDishes);
  const addDish = useMenuStore((state) => state.saveDish);
  const updateDish = useMenuStore((state) => state.updateDish);
  const deleteDish = useMenuStore((state) => state.deleteDish);

  const [query, setQuery] = useState("");
  const [editingDish, setEditingDish] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [dishToDelete, setDishToDelete] = useState(null);

  useEffect(() => {
    if (dishes.length === 0 && !loading) {
      loadDishes();
    }
  }, [dishes.length, loading, loadDishes]);

  const visibleDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(query.toLowerCase()) ||
    dish.category.toLowerCase().includes(query.toLowerCase())
  );

  function handleSubmit(nextDish) {
    if (editingDish) {
      updateDish(nextDish);
    } else {
      addDish(nextDish);
    }

    setShowForm(false);
    setEditingDish(null);
  }

  function handleEdit(dish) {
    setEditingDish(dish);
    setShowForm(true);
  }

  function toggleSoldOut(dish) {
    updateDish({ ...dish, available: !dish.available });
  }

  return (
    <section className="admin-dashboard">
      <div className="admin-page-title">
        <div>
          <span className="page-kicker">Administration</span>
          <h1 className="page-title">Menu Management</h1>
        </div>

        <button
          className="checkout-button admin-add-button"
          onClick={() => {
            setEditingDish(null);
            setShowForm(true);
          }}
        >
          Add Dish
        </button>
      </div>

      {loading && (
        <section className="admin-panel">
          <div className="admin-empty">Loading dishes...</div>
        </section>
      )}

      {error && (
        <section className="admin-panel">
          <div className="admin-empty">{error}</div>
        </section>
      )}

      {showForm && (
        <section className="admin-panel dish-form-panel">
          <div className="admin-panel-head">
            <h2>{editingDish ? "Edit Dish" : "Add Dish"}</h2>
          </div>

          <DishForm
            dish={editingDish}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditingDish(null);
            }}
          />
        </section>
      )}

      {!loading && !error && (
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
                  <span className="admin-list-category">{dish.available ? "Available" : "Sold Out"}</span>
                  <span className="admin-list-category">{dish.featured ? "Featured" : "Standard"}</span>
                  <span className="admin-list-price">{dish.price} ETB</span>
                  <button className="admin-small-button" onClick={() => handleEdit(dish)}>
                    Edit
                  </button>
                  <button className="admin-small-button soldout-button" onClick={() => toggleSoldOut(dish)}>
                    {dish.available ? "Sold Out" : "Available"}
                  </button>
                  <button className="admin-small-button danger-button" onClick={() => setDishToDelete(dish)}>
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>

          {dishToDelete && (
            <div className="admin-modal-backdrop">
              <div className="admin-modal">
                <div className="admin-modal-head">
                  <h2>Delete Dish</h2>
                </div>
                <p>Are you sure you want to delete this dish?</p>
                <div className="admin-modal-actions">
                  <button className="admin-small-button" onClick={() => setDishToDelete(null)}>
                    Cancel
                  </button>
                  <button
                    className="admin-small-button danger-button"
                    onClick={() => {
                      deleteDish(dishToDelete.id);
                      setDishToDelete(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </section>
  );
}

export default AdminMenu;
