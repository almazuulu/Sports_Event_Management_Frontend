import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import AuthContext from "../context/AuthContext";

function LogoutPage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate("/login", { replace: true });
  });
}

export default LogoutPage;
