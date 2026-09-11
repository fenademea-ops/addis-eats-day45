import { Link, useParams } from "react-router-dom";

import { useOrdersStore } from "../stores/ordersStore";

function OrderDetail() {
  const { orderId } = useParams();
  const orders = useOrdersStore((state) => state.orders);

  const order = orders.find((entry) => String(entry.id) === String(orderId));

  if (!order) {
    return (
      <main className="page-shell">
        <section className="page-content">
          <div className="empty-panel">
            <span className="empty-icon">📦</span>
            <h2>Order not found</h2>
            <p>The order you are looking for is not available.</p>
            <Link className="back-button" to="/orders">
              Back to Orders
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="page-content">
        <div className="page-heading">
          <span className="page-kicker">Addis Eats</span>
          <h1 className="page-title">Order Confirmation</h1>
          <p className="page-copy">
            Order #{order.id}
          </p>
        </div>

        <section className="order-detail-card">
          <div className="order-detail-head">
            <div>
              <span className="order-detail-label">Order confirmed</span>
              <h2 className="order-detail-title">Thank you for your order!</h2>
            </div>
            <span className="order-detail-date">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="order-detail-customer-grid">
            <div className="order-detail-customer-block">
              <span className="meta-label">Customer</span>
              <span className="meta-value">{order.customer}</span>
            </div>

            <div className="order-detail-customer-block">
              <span className="meta-label">Delivery Location</span>
              <span className="meta-value">{order.deliveryLocation}</span>
            </div>

            <div className="order-detail-customer-block">
              <span className="meta-label">Payment Method</span>
              <span className="meta-value">{order.paymentMethod}</span>
            </div>
          </div>

          <div className="order-detail-list">
            {order.dishes.map((dish) => (
              <div className="order-detail-row" key={dish.id}>
                <span className="order-detail-name">
                  {dish.name} × {dish.quantity}
                </span>
                <span className="order-detail-price">
                  {dish.price * dish.quantity} ETB
                </span>
              </div>
            ))}
          </div>

          <div className="order-detail-summary">
            <div className="summary-row">
              <span>Total</span>
              <span>{order.total} ETB</span>
            </div>
          </div>

          <div className="order-detail-actions">
            <Link className="back-button" to="/menu">
              Explore Menu
            </Link>
            <Link className="checkout-button" to="/orders">
              View Orders
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}

export default OrderDetail;
