import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./auth/Layout";

import Menu from "./Menu";
import DishDetail from "./DishDetail";
import CartPanel from "./components/CartPanel";
import RequireAuth from "./auth/RequireAuth";

import "./App.css";

function Home() {
  return (
    <div className="home-hero">
      <h1>Welcome to Addis Eats</h1>
      <p>Experience authentic Ethiopian flavors delivered straight to your table.</p>
      <Link to="/menu" className="cta-button">Browse Full Menu</Link>
    </div>
  );
}

function NotFound() {
  return (
    <div className="not-found-container">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="back-link">Return Home</Link>
    </div>
  );
}

function Login({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/checkout";

  const handleSignIn = (e) => {
    e.preventDefault();
    onLogin();
    navigate(from, { replace: true });
  };

  return (
    <div className="login-container">
      <h2>Sign In to Addis Eats</h2>
      <form onSubmit={handleSignIn} className="login-form">
        <input type="email" placeholder="Email Address" required />
        <input type="password" placeholder="Password" required />
        <button type="submit" className="login-btn">Sign In</button>
      </form>
    </div>
  );
}

function Checkout() {
  const { items = [], cart = [], removeFromCart, clearCart, dispatch } = useCart();
  
  // Ensures cartArray is always an array, whether context uses "items" or "cart"
  const cartArray = items.length ? items : cart;

  // Safe reduce with fallbacks
  const total = (cartArray || []).reduce(
    (sum, item) => sum + (Number(item?.price) || 0),
    0
  );

  if (!cartArray || cartArray.length === 0) {
    return (
      <div className="hero-card">
        <h2>Your Cart is Empty</h2>
        <p>Please select items from the menu to build your order.</p>
      </div>
    );
  }

  return (
    <div className="main-content">
      <h2>Order Summary</h2>
      <ul>
        {cartArray.map((item, index) => (
          <li key={item?.id || index}>
            <span>{item?.name}</span> - {Number(item?.price || 0).toFixed(2)} ETB
          </li>
        ))}
      </ul>
      <h3>Total: {total.toFixed(2)} ETB</h3>
    </div>
  );
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout onOpenCart={() => setIsCartOpen(true)} />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route
                path="checkout"
                element={
                  <RequireAuth isAuthenticated={isAuthenticated}>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route
                path="login"
                element={<Login onLogin={() => setIsAuthenticated(true)} />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}