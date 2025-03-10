import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  user: {},
  loading: false,
  login: () => {},
  logout: () => {},
});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: credentials.email,
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, data };
      }

      localStorage.setItem("user", JSON.stringify(data));

      const getProfileUser = await fetch(
        "http://127.0.0.1:8000/api/users/profile/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${data.access}`,
          },
        }
      );

      const profileData = await getProfileUser.json();

      if (getProfileUser.ok) {
        const existingUser = JSON.parse(localStorage.getItem("user"));
        const updatedUser = { ...existingUser, ...profileData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
        return { success: true };
      }

      return { success: false };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const authCtx = {
    user,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
