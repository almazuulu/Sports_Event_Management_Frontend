import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const existingUser = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  // Redirect to home if not authenticated
  if (!existingUser) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // If allowedRoles is set and userRole is not in the list, deny access
  if (allowedRoles && !allowedRoles.includes(existingUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
