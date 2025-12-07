"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { token, user } = useAuth();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // LOAD WISHLIST IF LOGGED IN
  // ----------------------------
  useEffect(() => {
    if (!token || !user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await axios.get("/api/wishlist", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setItems(res.data.items || []);
      } catch (err) {
        console.error("Wishlist load failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [token, user]);

  // ----------------------------
  // ADD TO WISHLIST
  // ----------------------------
  const addToWishlist = async (productId) => {
    if (!token) return toast.error("Please log in first.");

    try {
      const res = await axios.post(
        "/api/wishlist/add",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems(res.data.items);
      toast.success("Added to wishlist ❤️");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to wishlist");
    }
  };

  // ----------------------------
  // REMOVE
  // ----------------------------
  const removeFromWishlist = async (productId) => {
    try {
      const res = await axios.post(
        "/api/wishlist/remove",
        { productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setItems(res.data.items);
      toast.success("Removed from wishlist");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove item");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        items,
        loading,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
