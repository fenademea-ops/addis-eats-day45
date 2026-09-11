import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { SESSION_KEY } from "./RequireAdmin";

function AdminLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="admin-app">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="logo">Addis Eats</span>
          <span className="admin-brand-label">Admin</span>
        </div>

        <nav className="admin-nav">
          <NavLink className="admin-nav-link" to="/admin">
            Dashboard
          </NavLink>
          <NavLink className="admin-nav-link" to="/admin/menu">
            Menu
          </NavLink>
          <NavLink className="admin-nav-link" to="/admin/orders">
            Orders
          </NavLink>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <span className="admin-header-title">Admin Panel</span>
          <button className="admin-header-logout" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </section>
    </div>
  );
}

export default AdminLayout;
