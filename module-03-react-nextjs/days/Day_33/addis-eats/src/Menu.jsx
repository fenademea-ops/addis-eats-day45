import { dishes } from "./data"; // Add curly braces around dishes
import { useCartStore } from "./cart/cartStore";

export default function Menu() {
  const addItem = useCartStore((state) => state.addItem);

  if (!dishes || dishes.length === 0) {
    return <div className="main-content">No menu items found.</div>;
  }

  return (
    <div className="main-content">
      <h2>Our Menu</h2>
      <div className="dish-grid">
        {dishes.map((dish) => (
          <div key={dish.id} className="dish-card">
            {dish.image && (
              <div className="dish-image-container">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="dish-image"
                  loading="lazy"
                />
              </div>
            )}
            <div className="dish-details">
              <h3>{dish.name}</h3>
              <p className="price">{dish.price} ETB</p>
              <p className="description">{dish.description}</p>
              <button 
                className="add-btn" 
                onClick={() => addItem(dish)}
              >
                Add to Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}