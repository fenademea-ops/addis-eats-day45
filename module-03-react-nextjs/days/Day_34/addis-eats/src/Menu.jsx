import { dishes } from "./data"; // Add curly braces around dishes
import { memo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCartStore } from "./cart/cartStore";
import Modal from "./ui/Modal";

const DishCard = memo(function DishCard({ dish, addItem, onSelect, shouldCrash }) {
  if (shouldCrash) {
    throw new Error(`Forced render error for ${dish.name}`);
  }

  return (
    <article className="dish-card">
      {dish.image && <div className="dish-image-container"><img src={dish.image} alt={dish.name} className="dish-image" loading="lazy" /></div>}
      <div className="dish-details">
        <h3>{dish.name}</h3>
        <p className="price">{dish.price} ETB</p>
        <p className="description">{dish.description}</p>
        <button className="add-btn" onClick={() => addItem(dish)}>Add to Order</button>
        <button className="back-link" onClick={() => onSelect(dish)}>View details</button>
      </div>
    </article>
  );
});

export default function Menu() {
  const addItem = useCartStore((state) => state.addItem);
  const [selectedDish, setSelectedDish] = useState(null);
  const [searchParams] = useSearchParams();
  const crashDishId = Number(searchParams.get("crash-dish"));

  if (!dishes || dishes.length === 0) {
    return <div className="main-content">No menu items found.</div>;
  }

  return (
    <div className="main-content">
      <h2>Our Menu</h2>
      <div className="dish-grid">
        {dishes.map((dish) => (
          <DishCard key={dish.id} dish={dish} addItem={addItem} onSelect={setSelectedDish} shouldCrash={dish.id === crashDishId} />
        ))}
      </div>
      <Modal open={Boolean(selectedDish)} title={selectedDish?.name || "Dish details"} onClose={() => setSelectedDish(null)}>
        {selectedDish && <><p>{selectedDish.description || "A delicious Ethiopian favorite."}</p><p className="price">{selectedDish.price} ETB</p></>}
      </Modal>
    </div>
  );
}