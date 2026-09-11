import { useMemo, useState } from "react";

import { useOrdersStore } from "../stores/ordersStore";

function AdminOrders() {
  const orders = useOrdersStore((state) => state.orders);
  const updateOrderStatus = useOrdersStore((state) => state.updateOrderStatus);
  const deleteOrder = useOrdersStore((state) => state.deleteOrder);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const visibleOrders = useMemo(() => {
    const normalizedQuery = searchTerm.trim().toLowerCase();

    return orders.filter((order) => {
      const status = order.status || "pending";
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const haystack = [
        String(order.id),
        order.customer,
        order.deliveryLocation,
        order.deliveryArea,
        order.phone,
        order.paymentMethod,
        status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch = haystack.includes(normalizedQuery);
      return matchesStatus && matchesSearch;
    });
  }, [orders, searchTerm, statusFilter]);

  function handleDelete(orderId) {
    deleteOrder(orderId);
    if (selectedOrder?.id === orderId) {
      setSelectedOrder(null);
    }
  }

  return (
    <section className="admin-dashboard">
      <div className="admin-page-title">
        <div>
          <span className="page-kicker">Administration</span>
          <h1 className="page-title">Orders Management</h1>
        </div>
      </div>

      <section className="admin-panel">
        <div className="admin-panel-head">
          <div>
            <h2>All Orders</h2>
          </div>

          <div className="admin-orders-toolbar">
            <label className="admin-order-search">
              <span className="sr-only">Search orders</span>
              <input
                type="search"
                className="checkout-input admin-search-input"
                placeholder="Search orders"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </label>

            <label className="admin-order-status">
              <span className="sr-only">Filter by status</span>
              <select
                className="checkout-input admin-select"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All statuses</option>
                <option value="pending">pending</option>
                <option value="preparing">preparing</option>
                <option value="delivering">delivering</option>
                <option value="delivered">delivered</option>
              </select>
            </label>
          </div>
        </div>

        <div className="admin-list">
          {visibleOrders.length === 0 ? (
            <div className="admin-empty">No matching orders found</div>
          ) : (
            visibleOrders.map((order) => (
              <div className="admin-list-row admin-order-row" key={order.id}>
                <span className="admin-list-name">Order #{order.id}</span>
                <span className="admin-list-category">{order.customer}</span>
                <span className="admin-list-category">{order.deliveryLocation || order.deliveryArea}</span>
                <span className="admin-list-category">{new Date(order.createdAt).toLocaleDateString()}</span>
                <span className="admin-list-price">{order.total} ETB</span>
                <select
                  className="checkout-input admin-select"
                  value={order.status || "pending"}
                  onChange={(event) => updateOrderStatus(order.id, event.target.value)}
                >
                  <option value="pending">pending</option>
                  <option value="preparing">preparing</option>
                  <option value="delivering">delivering</option>
                  <option value="delivered">delivered</option>
                </select>
                <button className="admin-small-button" onClick={() => setSelectedOrder(order)}>
                  Details
                </button>
                <button className="admin-small-button danger-button" onClick={() => handleDelete(order.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>

      {selectedOrder && (
        <div className="admin-modal-backdrop">
          <div className="admin-modal admin-order-modal">
            <div className="admin-modal-head">
              <h2>Order #{selectedOrder.id}</h2>
              <button className="modal-close-button" onClick={() => setSelectedOrder(null)}>
                ×
              </button>
            </div>

            <div className="admin-order-detail-grid">
              <div className="admin-detail-item">
                <span className="meta-label">Customer</span>
                <span className="meta-value">{selectedOrder.customer}</span>
              </div>
              <div className="admin-detail-item">
                <span className="meta-label">Phone</span>
                <span className="meta-value">{selectedOrder.phone || "Not provided"}</span>
              </div>
              <div className="admin-detail-item">
                <span className="meta-label">Delivery Area</span>
                <span className="meta-value">{selectedOrder.deliveryArea || selectedOrder.deliveryLocation || "Not provided"}</span>
              </div>
              <div className="admin-detail-item">
                <span className="meta-label">Status</span>
                <span className="meta-value">{selectedOrder.status || "pending"}</span>
              </div>
              <div className="admin-detail-item">
                <span className="meta-label">Payment</span>
                <span className="meta-value">{selectedOrder.paymentMethod || "Cash on Delivery"}</span>
              </div>
              <div className="admin-detail-item">
                <span className="meta-label">Date</span>
                <span className="meta-value">{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="admin-detail-section">
              <span className="meta-label">Delivery Notes</span>
              <p className="admin-order-notes">
                {selectedOrder.specialInstructions || "No special instructions provided."}
              </p>
            </div>

            <div className="admin-detail-section">
              <span className="meta-label">Items</span>
              <div className="admin-order-items">
                {selectedOrder.dishes?.map((dish) => (
                  <div className="admin-order-item" key={dish.id}>
                    <span>{dish.name} × {dish.quantity}</span>
                    <span>{dish.price * dish.quantity} ETB</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="admin-order-total">
              <span>Total</span>
              <span>{selectedOrder.total} ETB</span>
            </div>

            <div className="admin-modal-actions">
              <button className="admin-small-button" onClick={() => setSelectedOrder(null)}>
                Close
              </button>
              <button className="admin-small-button danger-button" onClick={() => handleDelete(selectedOrder.id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AdminOrders;
