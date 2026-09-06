import { useCart } from "../context/CartContext";

export default function CartPanel({ isOpen, onClose }) {
  const { items, totalInETB, addItem, removeItem, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <aside className="cart-panel">
        <div className="cart-header">
          <h2>Your Order</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {items.length === 0 ? (
          <p className="empty-cart-msg">Your cart is currently empty.</p>
        ) : (
          <>
            <ul className="cart-item-list">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <div className="item-info">
                    <strong>{item.name}</strong>
                    <span>{item.price.toFixed(2)} ETB</span>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => removeItem(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addItem(item)}>+</button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="total-row">
                <span>Total:</span>
                <strong>{totalInETB.toFixed(2)} ETB</strong>
              </div>
              <div className="cart-actions">
                <button className="clear-btn" onClick={clearCart}>Clear Cart</button>
                <button className="checkout-btn" onClick={() => alert("Order Placed!")}>
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}