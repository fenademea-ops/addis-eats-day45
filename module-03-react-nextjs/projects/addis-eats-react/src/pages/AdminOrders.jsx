import { useOrdersStore } from "../stores/ordersStore";

function AdminOrders() {
  const orders = useOrdersStore((state) => state.orders);
  const updateOrderStatus = useOrdersStore((state) => state.updateOrderStatus);
  const deleteOrder = useOrdersStore((state) => state.deleteOrder);

  function handleDelete(orderId) {
    if (window.confirm("Are you sure you want to delete this order?")) {
      deleteOrder(orderId);
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
          <h2>All Orders</h2>
        </div>

        <div className="admin-list">
          {orders.length === 0 ? (
            <div className="admin-empty">No orders yet</div>
          ) : (
            orders.map((order) => (
              <div className="admin-list-row admin-order-row" key={order.id}>
                <span className="admin-list-name">Order #{order.id}</span>
                <span className="admin-list-category">{order.customer}</span>
                <span className="admin-list-category">{order.deliveryLocation}</span>
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
                <button className="admin-small-button danger-button" onClick={() => handleDelete(order.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </section>
  );
}

export default AdminOrders;
