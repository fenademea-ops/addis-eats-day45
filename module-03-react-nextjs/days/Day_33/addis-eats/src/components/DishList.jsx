import { useCart } from "../context/CartContext";

export default function DishList({ dishes, search }) {
  const { addItem } = useCart();

  const filteredDishes = dishes.filter((dish) =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredDishes.length === 0) {
    return <p className="empty-state">No Ethiopian dishes found matching your search.</p>;
  }

  return (
    <div className="dish-grid">
      {filteredDishes.map((dish) => (
        <article key={dish.id} className="dish-card">
          {dish.image && (
            <div className="dish-image-container">
              <img src={dish.image} alt={dish.name} className="dish-image" />
            </div>
          )}
          <div className="dish-details">
            <h3>{dish.name}</h3>
            <p className="price">{dish.price.toFixed(2)} ETB</p>
            <p className="description">{dish.description}</p>
            <button className="add-btn" onClick={() => addItem(dish)}>
              Add to Order
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}