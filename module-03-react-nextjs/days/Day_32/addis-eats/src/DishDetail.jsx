import { useParams, Link } from "react-router-dom";
import { useFetch } from "./hooks/useFetch";
import { CartProvider, useCart } from "./context/CartContext";

export default function DishDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const { data: dishes, loading, error } = useFetch("/dishes.json");

  if (loading) return <p className="loading-state">Loading dish details...</p>;
  if (error) return <p className="error-state">Error loading dish: {error}</p>;

  const dish = dishes?.find((item) => item.id === Number(id));

  if (!dish) {
    return (
      <div className="not-found-container">
        <h2>Dish Not Found</h2>
        <p>We couldn't find a dish matching that ID.</p>
        <Link to="/menu" className="back-link">← Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="dish-detail-page">
      <Link to="/menu" className="back-link">← Back to Menu</Link>
      <article className="dish-detail-card">
        {dish.image && (
          <img src={dish.image} alt={dish.name} className="dish-detail-image" />
        )}
        <div className="dish-detail-info">
          <h2>{dish.name}</h2>
          <span className="category-badge">{dish.category.toUpperCase()}</span>
          <p className="price">{dish.price.toFixed(2)} ETB</p>
          <p className="description">{dish.description}</p>
          <button className="add-btn" onClick={() => addItem(dish)}>
            Add to Order
          </button>
        </div>
      </article>
    </div>
  );
}