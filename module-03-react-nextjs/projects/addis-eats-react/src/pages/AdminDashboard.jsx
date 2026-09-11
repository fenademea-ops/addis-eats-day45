import { Link } from "react-router-dom";

import { useMenuStore } from "../stores/menuStore";
import { useOrdersStore } from "../stores/ordersStore";

function AdminDashboard() {
  const dishes = useMenuStore((state) => state.dishes);
  const orders = useOrdersStore((state) => state.orders);

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

  const dishCounts = orders.flatMap((order) => order.dishes).reduce((acc, item) => {
    acc[item.id] = (acc[item.id] || 0) + item.quantity;
    return acc;
  }, {});

  const topDishes = Object.entries(dishCounts)
    .map(([dishId, quantity]) => {
      const dish = dishes.find((entry) => String(entry.id) === String(dishId));
      return dish ? { dish, quantity } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);

  const statusCounts = orders.reduce((acc, order) => {
    const status = order.status || "pending";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return (
    <section className="admin-dashboard">
      <div className="admin-page-title">
        <div>
          <span className="page-kicker">Dashboard</span>
          <h1 className="page-title">Admin Dashboard</h1>
        </div>
        <Link className="admin-link" to="/admin/orders">
          Manage Orders
        </Link>
      </div>

      <section className="admin-summary-grid">
        <article className="admin-summary-card">
          <span className="meta-label">Total Revenue</span>
          <span className="meta-value">{totalRevenue} ETB</span>
        </article>

        <article className="admin-summary-card">
          <span className="meta-label">Total Orders</span>
          <span className="meta-value">{totalOrders}</span>
        </article>

        <article className="admin-summary-card">
          <span className="meta-label">Average Order Value</span>
          <span className="meta-value">{Math.round(averageOrderValue)} ETB</span>
        </article>
      </section>

      <section className="admin-dashboard-grid">
        <article className="admin-panel analytics-panel">
          <div className="admin-panel-head">
            <h2>Top Selling Dishes</h2>
          </div>

          <div className="admin-list">
            {topDishes.length === 0 ? (
              <div className="admin-empty">No orders yet</div>
            ) : (
              topDishes.map(({ dish, quantity }) => (
                <div className="admin-list-row" key={dish.id}>
                  <span className="admin-list-name">{dish.name}</span>
                  <span className="admin-list-category">{quantity} sold</span>
                  <span className="admin-list-price">{dish.price} ETB</span>
                </div>
              ))
            )}
          </div>
        </article>

        <article className="admin-panel analytics-panel">
          <div className="admin-panel-head">
            <h2>Order Status Distribution</h2>
          </div>

          <div className="admin-list">
            {Object.entries(statusCounts).length === 0 ? (
              <div className="admin-empty">No orders yet</div>
            ) : (
              Object.entries(statusCounts).map(([status, count]) => (
                <div className="admin-list-row" key={status}>
                  <span className="admin-list-name">{status}</span>
                  <span className="admin-list-category">{count}</span>
                  <span className="admin-list-price">{Math.round((count / totalOrders) * 100)}%</span>
                </div>
              ))
            )}
          </div>
        </article>
      </section>

      <section className="admin-panel recent-orders-panel">
        <div className="admin-panel-head">
          <h2>Recent Orders</h2>
          <Link className="admin-link" to="/admin/orders">
            View All
          </Link>
        </div>

        <div className="admin-list">
          {orders.length === 0 ? (
            <div className="admin-empty">No orders yet</div>
          ) : (
            orders.slice(0, 6).map((order) => (
              <div className="admin-list-row" key={order.id}>
                <span className="admin-list-name">Order #{order.id}</span>
                <span className="admin-list-category">{order.customer}</span>
                <span className="admin-list-category">{order.status || "pending"}</span>
                <span className="admin-list-price">{order.total} ETB</span>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
}

export default AdminDashboard;
