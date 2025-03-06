import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import AuthContext from "./context/AuthContext";

function ProtectedRoute({ allowedRoles }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Redirect to home if not authenticated
  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // If allowedRoles is set and userRole is not in the list, deny access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
