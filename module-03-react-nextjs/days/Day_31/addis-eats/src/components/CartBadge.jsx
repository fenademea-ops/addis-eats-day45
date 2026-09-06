import { useCart } from "../context/CartContext";

export default function CartBadge({ onClick }) {
  const { itemCount } = useCart();

  return (
    <button className="cart-badge-btn" onClick={onClick} aria-label="View Cart">
      🛒 Cart
      {itemCount > 0 && <span className="badge-count">{itemCount}</span>}
    </button>
  );
}