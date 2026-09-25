import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="shell page-section">
      <p className="eyebrow">Addis Eats</p>
      <h1>Complete your checkout</h1>
      <p className="hero-copy">Tell us where to deliver your Ethiopian favorites.</p>
      <CheckoutForm />
    </main>
  );
}
