import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./auth/Layout";

import Menu from "./Menu";
import DishDetail from "./DishDetail";
import CartPanel from "./components/CartPanel";
import Checkout from "./checkout/Checkout";

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

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <ThemeProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout onOpenCart={() => setIsCartOpen(true)} />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}