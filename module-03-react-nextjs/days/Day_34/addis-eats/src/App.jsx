import { lazy, Profiler, Suspense, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./auth/Layout";

import Menu from "./Menu";
import DishDetail from "./DishDetail";
import CartPanel from "./components/CartPanel";
import ErrorBoundary from "./ErrorBoundary";

const Checkout = lazy(() => import("./checkout/Checkout"));
const Receipt = lazy(() => import("./checkout/Receipt"));

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

function RouteSkeleton() {
  return <div className="loading-state" role="status">Loading page...</div>;
}

function logMenuProfile(id, phase, actualDuration) {
  if (id === "menu") {
    console.info(`[Profiler] ${phase} menu: ${actualDuration.toFixed(2)}ms`);
  }
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
              <Route path="menu" element={
                <ErrorBoundary fallback={<p className="error-state">The menu could not be displayed. Please refresh and try again.</p>}>
                  <Profiler id="menu" onRender={logMenuProfile}>
                    <Menu />
                  </Profiler>
                </ErrorBoundary>
              } />
              <Route path="menu/:id" element={<DishDetail />} />
              <Route path="checkout" element={<Suspense fallback={<RouteSkeleton />}><Checkout /></Suspense>} />
              <Route path="receipt" element={<Suspense fallback={<RouteSkeleton />}><Receipt /></Suspense>} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
          <ErrorBoundary fallback={<p className="error-state">Your cart is temporarily unavailable.</p>}>
            <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </ErrorBoundary>
        </BrowserRouter>
      </CartProvider>
    </ThemeProvider>
  );
}