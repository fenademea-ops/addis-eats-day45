import { Navigate, useLocation } from "react-router-dom";

import useAuth from "./useAuth";

function RequireAuth({ children, requireFreshLogin = false }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || (requireFreshLogin && !location.state?.authenticated)) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default RequireAuth;