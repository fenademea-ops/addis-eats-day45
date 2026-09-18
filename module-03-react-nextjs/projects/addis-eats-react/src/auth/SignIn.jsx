import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import useAuth from "./useAuth";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    const isValid = signIn(username, password);

    if (isValid) {
      navigate(location.state?.from || "/", { replace: true, state: { authenticated: true } });
    } else {
      setError("Invalid username or password.");
    }

    setLoading(false);
  }

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <span className="page-kicker">Addis Eats</span>
        <h1 className="page-title">Customer Sign In</h1>
        <p className="page-copy">Use your username and password to access favorites and orders.</p>

        <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
          <div className="admin-form-field">
            <label htmlFor="customer-username">Username</label>
            <input
              id="customer-username"
              className="checkout-input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="customer-password">Password</label>
            <input
              id="customer-password"
              className="checkout-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="admin-error">{error}</div>}

          <div className="admin-helper-text">Demo login: username = customer, password = customer123</div>

          <button className="checkout-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <Link className="auth-home-link" to="/">
          Back to Home
        </Link>
      </section>
    </main>
  );
}

export default SignIn;