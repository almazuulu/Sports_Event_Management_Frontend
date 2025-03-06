import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "./context/AuthContext";

const PublicRoute = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (user && location.pathname === "/login") {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
