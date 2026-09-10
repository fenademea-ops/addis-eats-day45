import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import { useMenuStore } from "../stores/menuStore";
import { useOrdersStore } from "../stores/ordersStore";

function Checkout() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const dishes = useMenuStore((state) => state.dishes);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrdersStore((state) => state.addOrder);

  const cartDishes = cart
    .map((item) => {
      const dish = dishes.find((entry) => entry.id === item.id);

      if (!dish) {
        return null;
      }

      return {
        ...dish,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  const subtotal = cartDishes.reduce(
    (sum, dish) => sum + dish.price * dish.quantity,
    0
  );

  const delivery = 80;
  const total = subtotal + delivery;

  function handlePlaceOrder() {
    if (cartDishes.length === 0) {
      return;
    }

    const order = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      total,
      dishes: cartDishes.map((dish) => ({
        id: dish.id,
        name: dish.name,
        quantity: dish.quantity,
        price: dish.price,
      })),
    };

    addOrder(order);
    clearCart();
    navigate("/orders");
  }

  return (
    <main className="page-shell">
      <section className="page-content checkout-page">
        <div className="page-heading">
          <span className="page-kicker">Addis Eats</span>
          <h1 className="page-title">Checkout</h1>
          <p className="page-copy">
            Complete your Addis Eats order.
          </p>
        </div>

        {cartDishes.length === 0 ? (
          <div className="empty-panel">
            <span className="empty-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Add dishes from the menu before checkout.</p>
          </div>
        ) : (
          <div className="checkout-grid">
            <section className="checkout-form">
              <div className="checkout-section-title">Delivery Details</div>

              <div className="checkout-field">
                <label htmlFor="name">Full Name</label>
                <input id="name" className="checkout-input" defaultValue="Addis Eats Customer" />
              </div>

              <div className="checkout-field">
                <label htmlFor="location">Delivery Location</label>
                <input id="location" className="checkout-input" defaultValue="Addis Ababa" />
              </div>

              <div className="checkout-field">
                <label htmlFor="payment">Payment Method</label>
                <select id="payment" className="checkout-input">
                  <option>Cash on Delivery</option>
                  <option>Mobile Money</option>
                  <option>Card</option>
                </select>
              </div>
            </section>

            <aside className="checkout-summary">
              <h2>Order Summary</h2>

              <div className="checkout-items">
                {cartDishes.map((dish) => (
                  <div className="checkout-item" key={dish.id}>
                    <span>
                      {dish.name} × {dish.quantity}
                    </span>
                    <span>{dish.price * dish.quantity} ETB</span>
                  </div>
                ))}
              </div>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>{subtotal} ETB</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{delivery} ETB</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>{total} ETB</span>
              </div>

              <button className="checkout-button" onClick={handlePlaceOrder}>
                Place Order
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

export default Checkout;
