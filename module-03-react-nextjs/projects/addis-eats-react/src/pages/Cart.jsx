import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import { useMenuStore } from "../stores/menuStore";

function Cart() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const dishes = useMenuStore((state) => state.dishes);
  const removeDish = useCartStore((state) => state.removeDish);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

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

  function handleCheckout() {
    if (cartDishes.length === 0) {
      return;
    }

    navigate("/checkout");
  }

  return (
    <main className="page-shell">
      <section className="page-content">
        <div className="page-heading">
          <span className="page-kicker">Addis Eats</span>
          <h1 className="page-title">Cart</h1>
          <p className="page-copy">
            Review your selected dishes before checkout.
          </p>
        </div>

        {cartDishes.length === 0 ? (
          <div className="empty-panel">
            <span className="empty-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Add dishes from the menu to prepare your Addis Eats order.</p>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-list">
              {cartDishes.map((dish) => (
                <article className="cart-item" key={dish.id}>
                  <div className="cart-image">
                    <img src={dish.image} alt={dish.name} />
                  </div>

                  <div className="cart-details">
                    <div className="cart-title-row">
                      <span className="food-category">{dish.category}</span>
                      <strong className="food-price">{dish.price} ETB</strong>
                    </div>

                    <h2 className="food-name">{dish.name}</h2>

                    <div className="cart-controls">
                      <button
                        className="cart-qty-button"
                        onClick={() => updateQuantity(dish.id, dish.quantity - 1)}
                      >
                        −
                      </button>

                      <span className="cart-quantity">{dish.quantity}</span>

                      <button
                        className="cart-qty-button"
                        onClick={() => updateQuantity(dish.id, dish.quantity + 1)}
                      >
                        +
                      </button>

                      <button className="remove-button" onClick={() => removeDish(dish.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{subtotal} ETB</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>80 ETB</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>{subtotal + 80} ETB</span>
              </div>

              <button className="checkout-button" onClick={handleCheckout}>
                Checkout
              </button>
              <button className="clear-button" onClick={clearCart}>Clear Cart</button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;