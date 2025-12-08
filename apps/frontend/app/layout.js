"use client";

import "./globals.css";
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          
            <WishlistProvider>
              <CartProvider>{children}</CartProvider>

              <Toaster />
            </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
