import { Navigate, useLocation } from "react-router-dom";

import useAuth from "./useAuth";

function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/sign-in" replace state={{ from: location.pathname }} />;
  }

  return children;
}

export default RequireAuth;