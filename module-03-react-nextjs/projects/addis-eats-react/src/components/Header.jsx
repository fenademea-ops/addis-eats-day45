import { Link, NavLink } from "react-router-dom";

import ThemeToggle from "../theme/ThemeToggle";
import { useCartStore } from "../stores/cartStore";

function Header() {
  const cart = useCartStore((state) => state.cart);
  const toast = useCartStore((state) => state.toast);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo">
          Addis Eats
        </Link>

        <nav className="main-nav">
          <NavLink to="/" end>
            Home
          </NavLink>

          <NavLink to="/menu">
            Menu
          </NavLink>

          <NavLink to="/favorites">
            Favorites
          </NavLink>

          <NavLink to="/orders">
            Orders
          </NavLink>

          <NavLink to="/admin/login">
            Admin
          </NavLink>

          <NavLink to="/cart" className="cart-link">
            <span className="cart-label">
              Cart
              {cartCount > 0 && (
                <span className="cart-count-badge" aria-label={`${cartCount} item${cartCount === 1 ? "" : "s"} in cart`}>
                  {cartCount}
                </span>
              )}
            </span>
          </NavLink>

          <ThemeToggle />
        </nav>

        {toast && (
          <div className="cart-toast" role="status" aria-live="polite">
            <span className="toast-icon">✓</span>
            <span>{toast.dishName} added to cart</span>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;