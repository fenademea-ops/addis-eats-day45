import { Link } from "react-router-dom";

export default function Receipt() {
  return (
    <div className="hero-card">
      <p className="checkout-eyebrow">Addis Eats</p>
      <h2>Order receipt</h2>
      <p>Your order has been received. Thank you for choosing Addis Eats.</p>
      <Link to="/menu" className="cta-button">Order again</Link>
    </div>
  );
}