import { Link, NavLink } from "react-router-dom";

function Header() {
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

          <NavLink to="/cart">
            Cart
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;