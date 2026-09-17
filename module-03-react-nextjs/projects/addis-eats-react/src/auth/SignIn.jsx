import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useAuth from "./useAuth";

function SignIn() {
  const [name, setName] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;
    signIn(name);
    navigate(location.state?.from || "/", { replace: true });
  }

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <span className="page-kicker">Addis Eats</span>
        <h1 className="page-title">Customer Sign In</h1>
        <p className="page-copy">Sign in to save favorites and track orders.</p>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label htmlFor="customer-name">Your name</label>
          <input id="customer-name" className="checkout-input" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
          <button className="checkout-button" type="submit">Continue</button>
        </form>
      </section>
    </main>
  );
}

export default SignIn;