"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { token, isLoggedIn, logout } = useAuth();
  const [cart, setCart] = useState(null);

  // Load cart after login
  useEffect(() => {
    if (!isLoggedIn) return;

    axios
      .get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCart(res.data))
      .catch(() => setCart({ items: [] }));
  }, [isLoggedIn]);

  // ---------------- ADD TO CART ----------------
  const addToCart = async (productId) => {
    if (!isLoggedIn) return toast.error("Please log in first");

    try {
      await axios.post(
        "/api/cart",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Added to cart");

      const updated = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCart(updated.data);
    } catch (error) {
      console.error("Add to cart error:", error);
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        logout();
      } else {
        toast.error("Failed to add to cart");
      }
    }
  };

  // ---------------- UPDATE QUANTITY ----------------
  const updateQty = async (itemId, quantity) => {
    await axios.patch(
      `/api/cart/${itemId}`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updated = await axios.get("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCart(updated.data);
  };

  // ---------------- REMOVE ITEM ----------------
  const removeItem = async (itemId) => {
    await axios.delete(`/api/cart/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updated = await axios.get("/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setCart(updated.data);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
