import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await api.get("/auth/me");
      setIsAuth(true);
      setUser(res.data);
    } catch {
      setIsAuth(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const logout = async () => {
    await api.post("/logout");
    setIsAuth(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuth, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
