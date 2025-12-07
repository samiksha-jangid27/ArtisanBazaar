"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage once
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem("token");
    if (!stored) {
      setLoading(false);
      return;
    }

    const init = () => {
      try {
        const decoded = jwtDecode(stored);
        setToken(stored);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token, clearing", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    setTimeout(init, 0); // avoid sync setState warning
  }, []);

  const login = (newToken) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", newToken);
    }
    setToken(newToken);
    try {
      const decoded = jwtDecode(newToken);
      setUser(decoded);
    } catch (err) {
      console.error("Failed to decode token", err);
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
    <AuthContext.Provider
      value={{
        token,
        user,
        isLoggedIn: !!token,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

