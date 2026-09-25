import { getSession } from "../../lib/session";
import { listOrdersForUser } from "../../lib/store";
import CancelButton from "./CancelButton";

export default async function OrdersPage() {
  const session = await getSession();
  const orders = session ? await listOrdersForUser(session.user.id) : [];

  return (
    <main className="shell page-section">
      <p className="eyebrow">Your history</p>
      <h1>Orders</h1>
      {!session || orders.length === 0 ? (
        <div className="panel"><p>No orders yet. Place an order and it will appear here.</p></div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order.id}>
              <div><strong>Order {order.id.slice(0, 8)}</strong><p>{order.customerName} · ETB {order.total}</p></div>
              <span className="status">{order.status}</span>
              {order.status !== "cancelled" && <CancelButton orderId={order.id} />}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
