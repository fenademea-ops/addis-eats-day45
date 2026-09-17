import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import { useMenuStore } from "../stores/menuStore";
import { useOrdersStore } from "../stores/ordersStore";
import DeliveryEstimate from "../checkout/DeliveryEstimate.jsx";
import validateCheckout from "../checkout/validate.js";

function Checkout() {
  const navigate = useNavigate();
  const cart = useCartStore((state) => state.cart);
  const dishes = useMenuStore((state) => state.dishes);
  const clearCart = useCartStore((state) => state.clearCart);
  const addOrder = useOrdersStore((state) => state.addOrder);

  const [checkoutForm, setCheckoutForm] = useState({
    name: "Addis Eats Customer",
    location: "Addis Ababa",
    phone: "+251 900 000 000",
    payment: "Cash on Delivery",
    specialInstructions: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const cartDishes = cart
    .map((item) => {
      const dish = dishes.find((entry) => entry.id === item.id);

      if (!dish || !dish.available) {
        return null;
      }

      return {
        ...dish,
        quantity: item.quantity,
      };
    })
    .filter(Boolean);

  const unavailableCartIds = cart
    .map((item) => item.id)
    .filter((id) => {
      const dish = dishes.find((entry) => entry.id === id);
      return dish && !dish.available;
    });

  const subtotal = cartDishes.reduce(
    (sum, dish) => sum + dish.price * dish.quantity,
    0
  );

  const delivery = 80;
  const total = subtotal + delivery;

  function handlePlaceOrder() {
    const validationErrors = validateCheckout(checkoutForm);
    setFormErrors(validationErrors);

    if (cartDishes.length === 0 || unavailableCartIds.length > 0) {
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const now = new Date();
    const order = {
      id: now.getTime(),
      createdAt: now.toISOString(),
      total,
      customer: checkoutForm.name,
      deliveryLocation: checkoutForm.location,
      deliveryArea: checkoutForm.location,
      paymentMethod: checkoutForm.payment,
      phone: checkoutForm.phone,
      specialInstructions: checkoutForm.specialInstructions,
      dishes: cartDishes.map((dish) => ({
        id: dish.id,
        name: dish.name,
        quantity: dish.quantity,
        price: dish.price,
      })),
    };

    addOrder(order);
    clearCart();
    navigate(`/orders/${order.id}`);
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

        {unavailableCartIds.length > 0 && (
          <div className="cart-warning">
            <span className="cart-warning-icon">!</span>
            <span>Some dishes in your cart are sold out. Remove them before checkout.</span>
          </div>
        )}

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
                <input
                  id="name"
                  className="checkout-input"
                  value={checkoutForm.name}
                  onChange={(event) =>
                    setCheckoutForm({ ...checkoutForm, name: event.target.value })
                  }
                />
                {formErrors.name && <span className="form-error">{formErrors.name}</span>}
              </div>

              <div className="checkout-field">
                <label htmlFor="location">Delivery Location</label>
                <input
                  id="location"
                  className="checkout-input"
                  value={checkoutForm.location}
                  onChange={(event) =>
                    setCheckoutForm({ ...checkoutForm, location: event.target.value })
                  }
                />
                {formErrors.location && <span className="form-error">{formErrors.location}</span>}
              </div>

              <div className="checkout-field">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  className="checkout-input"
                  value={checkoutForm.phone}
                  onChange={(event) =>
                    setCheckoutForm({ ...checkoutForm, phone: event.target.value })
                  }
                />
                {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
              </div>

              <div className="checkout-field">
                <label htmlFor="specialInstructions">Special Instructions</label>
                <textarea
                  id="specialInstructions"
                  className="checkout-input"
                  value={checkoutForm.specialInstructions}
                  onChange={(event) =>
                    setCheckoutForm({
                      ...checkoutForm,
                      specialInstructions: event.target.value,
                    })
                  }
                />
              </div>

              <div className="checkout-field">
                <label htmlFor="payment">Payment Method</label>
                <select
                  id="payment"
                  className="checkout-input"
                  value={checkoutForm.payment}
                  onChange={(event) =>
                    setCheckoutForm({ ...checkoutForm, payment: event.target.value })
                  }
                >
                  <option>Cash on Delivery</option>
                  <option>Mobile Money</option>
                  <option>Card</option>
                </select>
              </div>
            </section>

            <aside className="checkout-summary">
              <h2>Order Summary</h2>
              <DeliveryEstimate area={checkoutForm.location} />

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
