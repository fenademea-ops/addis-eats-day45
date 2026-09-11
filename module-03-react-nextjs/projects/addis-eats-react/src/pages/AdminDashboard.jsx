import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { useMenuStore } from "../stores/menuStore";
import { useOrdersStore } from "../stores/ordersStore";

function startOfWeek(date) {
  const copy = new Date(date);
  const day = copy.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diffToMonday);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function normalizeDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function toWeekIndex(date, rangeStart) {
  const base = normalizeDate(rangeStart);
  const current = normalizeDate(new Date(date));
  const dayDiff = Math.round((current - base) / 86400000);

  if (dayDiff < 0 || dayDiff > 6) {
    return null;
  }

  return dayDiff;
}

function buildWeekChart(orders, rangeStart) {
  const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const totals = Array(7).fill(0);

  orders.forEach((order) => {
    const orderDate = new Date(order.createdAt);
    const weekIndex = toWeekIndex(orderDate, rangeStart);

    if (weekIndex === null) {
      return;
    }

    totals[weekIndex] += Number(order.total || 0);
  });

  return {
    labels,
    totals,
    totalRevenue: totals.reduce((sum, entry) => sum + entry, 0),
  };
}

function buildMonthChart(orders, monthStart) {
  const weekLabels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"];
  const totals = Array(6).fill(0);

  orders.forEach((order) => {
    const orderDate = new Date(order.createdAt);
    if (orderDate.getMonth() !== monthStart.getMonth() || orderDate.getFullYear() !== monthStart.getFullYear()) {
      return;
    }

    const weekIndex = Math.min(
      5,
      Math.floor((orderDate.getDate() - 1) / 7)
    );

    totals[weekIndex] += Number(order.total || 0);
  });

  return {
    labels: weekLabels,
    totals,
    totalRevenue: totals.reduce((sum, entry) => sum + entry, 0),
  };
}

function AdminDashboard() {
  const dishes = useMenuStore((state) => state.dishes);
  const orders = useOrdersStore((state) => state.orders);
  const [range, setRange] = useState("week");

  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

  const chart = useMemo(() => {
    const today = new Date();

    if (range === "lastWeek") {
      const currentWeekStart = startOfWeek(today);
      const lastWeekStart = new Date(currentWeekStart);
      lastWeekStart.setDate(currentWeekStart.getDate() - 7);
      return buildWeekChart(orders, lastWeekStart);
    }

    if (range === "month") {
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      return buildMonthChart(orders, monthStart);
    }

    const weekStart = startOfWeek(today);
    return buildWeekChart(orders, weekStart);
  }, [orders, range]);

  const maxChartRevenue = Math.max(...chart.totals, 1);
  const chartTitle = range === "lastWeek" ? "Last Week Revenue" : range === "month" ? "Monthly Revenue" : "Weekly Revenue";
  const chartGrowth = chart.totalRevenue > 0 ? Math.max(2, Math.min(44, Math.round((chart.totalRevenue / Math.max(totalRevenue, 1)) * 100))) : 0;

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

      <section className="admin-chart-panel">
        <div className="admin-chart-header">
          <div className="admin-chart-title">
            <span className="admin-chart-icon">▦</span>
            <span className="admin-chart-label">{chartTitle}</span>
          </div>

          <div className="admin-chart-range">
            <button className={`admin-chart-range-button ${range === "week" ? "active" : ""}`} onClick={() => setRange("week")}>This Week</button>
            <button className={`admin-chart-range-button ${range === "lastWeek" ? "active" : ""}`} onClick={() => setRange("lastWeek")}>Last Week</button>
            <button className={`admin-chart-range-button ${range === "month" ? "active" : ""}`} onClick={() => setRange("month")}>Monthly</button>
          </div>
        </div>

        <div className="admin-chart-total-row">
          <div>
            <span className="admin-chart-number">{chart.totalRevenue}</span>
            <span className="admin-chart-unit">ETB</span>
          </div>
          <span className="admin-chart-growth">+{chartGrowth}%</span>
        </div>

        <div className="admin-chart-area">
          <div className="admin-chart-bars">
            {chart.totals.map((total, index) => {
              const height = maxChartRevenue === 0 ? 0 : Math.max((total / maxChartRevenue) * 100, total > 0 ? 8 : 0);
              return (
                <div className="admin-chart-bar-wrap" key={chart.labels[index] ?? index}>
                  <span className="admin-chart-value">{total || 0}</span>
                  <span className="admin-chart-bar" style={{ height: `${height}%` }}></span>
                  <span className="admin-chart-day-name">{chart.labels[index]}</span>
                </div>
              );
            })}
          </div>
        </div>
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
