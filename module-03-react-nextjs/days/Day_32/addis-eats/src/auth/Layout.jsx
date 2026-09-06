import { Outlet, NavLink, Link } from "react-router-dom";
import CartBadge from "../components/CartBadge";
import ThemeToggle from "../components/ThemeToggle";

export default function Layout({ onOpenCart }) {
  return (
    <div className="layout-container">
      <header className="app-header">
        <div className="header-brand">
          <Link to="/">🇪🇹 Addis Eats</Link>
        </div>

        <nav className="main-nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active-link" : "")}>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Menu
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Checkout
          </NavLink>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <CartBadge onOpen={onOpenCart} />
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Addis Eats. Authentic Ethiopian Cuisine.</p>
      </footer>
    </div>
  );
}