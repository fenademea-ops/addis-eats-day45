import { useCartStore } from "../cart/cartStore";
import { Link } from "react-router-dom";

export default function CartPanel({ isOpen, onClose }) {
  // Pull state and actions directly from Zustand
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);

  if (!isOpen) return null;

  const total = items.reduce(
    (sum, dish) => sum + (Number(dish?.price) || 0),
    0
  );

  return (
    <div className="cart-panel-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h3>Your Order ({items.length})</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <p className="empty-msg">Your cart is empty.</p>
        ) : (
          <div className="cart-body">
            <ul className="cart-item-list">
              {items.map((item, index) => (
                <li key={item?.id || index} className="cart-item">
                  <div>
                    <span className="item-name">{item?.name}</span>
                    <span className="item-price"> - {Number(item?.price || 0).toFixed(2)} ETB</span>
                  </div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <h4>Total: {total.toFixed(2)} ETB</h4>
              <div className="cart-actions">
                <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
                <Link className="checkout-btn" to="/checkout" onClick={onClose}>
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}