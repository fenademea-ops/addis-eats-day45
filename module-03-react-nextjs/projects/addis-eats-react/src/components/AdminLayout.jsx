import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import Footer from "./Footer";
import ThemeToggle from "../theme/ThemeToggle";
import { SESSION_KEY } from "./RequireAdmin";

function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="admin-app">
      <aside
        id="admin-sidebar"
        className={`admin-sidebar ${sidebarOpen ? "is-open" : "is-closed"}`}
        aria-label="Admin sidebar"
        aria-expanded={sidebarOpen}
      >
        <div className="admin-sidebar-top">
          <div className="admin-brand">
            <span className="logo">Addis Eats</span>
            <span className="admin-brand-label">Admin</span>
          </div>

          <button
            className="admin-sidebar-collapse"
            type="button"
            aria-label="Collapse admin sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen(false)}
          >
            <span aria-hidden="true">‹</span>
          </button>
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
          <NavLink className="admin-nav-link customer-link" to="/menu">
            Customer Page
          </NavLink>
        </nav>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <section className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            {!sidebarOpen && (
              <button
                className="admin-sidebar-open"
                type="button"
                aria-label="Open admin sidebar"
                aria-controls="admin-sidebar"
                aria-expanded={sidebarOpen}
                onClick={() => setSidebarOpen(true)}
              >
                <span aria-hidden="true">☰</span>
              </button>
            )}
            <span className="admin-header-title">Admin Panel</span>
          </div>

          <div className="admin-header-actions">
            <ThemeToggle />
            <button className="admin-header-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>

        <Footer />
      </section>
    </div>
  );
}

export default AdminLayout;
