import { Link } from "react-router-dom";

import { useOrdersStore } from "../stores/ordersStore";

function Orders() {
  const orders = useOrdersStore((state) => state.orders);

  return (
    <main className="page-shell">
      <section className="page-content">
        <div className="page-heading">
          <span className="page-kicker">Addis Eats</span>
          <h1 className="page-title">Orders</h1>
          <p className="page-copy">
            Track your recent deliveries and food orders.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-panel">
            <span className="empty-icon">📦</span>
            <h2>No orders yet</h2>
            <p>Your order history will show up once you place your first delivery.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => (
              <article className="order-card" key={order.id}>
                <div className="order-card-head">
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="order-items">
                  {order.dishes.map((dish) => (
                    <div className="order-row" key={dish.id}>
                      <span>{dish.name} × {dish.quantity}</span>
                      <span>{dish.price * dish.quantity} ETB</span>
                    </div>
                  ))}
                </div>

                <div className="order-total">
                  <span>Total</span>
                  <span>{order.total} ETB</span>
                </div>

                <Link className="order-detail-link" to={`/orders/${order.id}`}>
                  View Details
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Orders;
