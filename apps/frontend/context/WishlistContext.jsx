"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "./AuthContext";
import toast from "react-hot-toast";

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { token, isLoggedIn } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // ---------------- LOAD WISHLIST ----------------
  useEffect(() => {
    if (!isLoggedIn) return;

    axios
      .get("/api/wishlist", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWishlist(res.data.items || []))
      .catch(() => setWishlist([]));
  }, [isLoggedIn]);

  // ---------------- CHECK IF WISHLISTED ----------------
  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.productId === productId);
  };

  // ---------------- TOGGLE WISHLIST ----------------
  const toggleWishlist = async (productId) => {
    if (!isLoggedIn) return toast.error("Please log in first");

    try {
      const res = await axios.post(
        "/api/wishlist/toggle",
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setWishlist(res.data.items);
      toast.success("Wishlist updated");
    } catch (error) {
      toast.error("Could not update wishlist");
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlisted,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
