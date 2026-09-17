import { Navigate } from "react-router-dom";
import { ADMIN_SESSION_KEY } from "../admin/useAdminAuth.js";

const SESSION_KEY = ADMIN_SESSION_KEY;

function RequireAdmin({ children }) {
  const isAuthenticated = Boolean(sessionStorage.getItem(SESSION_KEY));

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default RequireAdmin;
export { SESSION_KEY };
