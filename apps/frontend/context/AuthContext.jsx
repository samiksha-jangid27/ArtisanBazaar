"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("token");
    if (!stored) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(stored);
      setToken(stored);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (newToken) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", newToken);
    }

    setToken(newToken);

    try {
      setUser(jwtDecode(newToken));
    } catch (err) {
      console.error("Failed to decode", err);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
