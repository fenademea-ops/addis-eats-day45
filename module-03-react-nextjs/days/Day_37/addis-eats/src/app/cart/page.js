import Link from "next/link";

export default function CartPage() {
  return (
    <main className="shell simple-page">
      <Link className="back-link" href="/menu">&larr; Continue shopping</Link>
      <h1>Your cart</h1>
      <div className="empty-state"><p>Your cart is ready for something delicious.</p><Link className="button" href="/checkout">Continue to checkout</Link></div>
    </main>
  );
}