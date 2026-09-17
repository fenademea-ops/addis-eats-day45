import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import useAdminAuth from "../admin/useAdminAuth.js";

function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login } = useAdminAuth();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    window.setTimeout(() => {
      if (username.trim().toLowerCase() === "admin" && password === "admin123") {
        login(username.trim());
        navigate("/admin", { replace: true });
      } else {
        setError("Invalid username or password.");
      }

      setLoading(false);
    }, 500);
  }

  return (
    <main className="admin-auth-page">
      <section className="admin-auth-card">
        <div className="admin-auth-head">
          <span className="page-kicker">Addis Eats</span>
          <h1 className="page-title">Admin Login</h1>
          <p className="page-copy">Sign in to the restaurant dashboard.</p>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit} noValidate>
          <div className="admin-form-field">
            <label htmlFor="admin-username">Username</label>
            <input
              id="admin-username"
              className="checkout-input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="admin-form-field">
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              className="checkout-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <div className="admin-error">{error}</div>}

          <button className="checkout-button" disabled={loading}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default AdminLogin;
