import { Link } from "react-router-dom";

function OrderHistoryItem({ order }) {
  return <article className="order-card"><div className="order-card-head"><span className="order-id">Order #{order.id}</span><span className="order-date">{new Date(order.createdAt).toLocaleDateString()}</span></div><p>{order.status || "pending"}</p><Link className="order-detail-link" to={`/orders/${order.id}`}>View Details</Link></article>;
}

export default OrderHistoryItem;