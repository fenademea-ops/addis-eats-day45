import { Navigate } from "react-router-dom";

const SESSION_KEY = "addis-eats-admin-session";

function RequireAdmin({ children }) {
  const isAuthenticated = Boolean(sessionStorage.getItem(SESSION_KEY));

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default RequireAdmin;
export { SESSION_KEY };
