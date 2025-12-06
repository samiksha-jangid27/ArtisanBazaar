"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Shop", path: "/marketplace" },
  { label: "For Artisans", path: "/for-artisans" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (path) => {
    router.push(path);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-18 sm:px-6 lg:px-0">
        {/* LOGO + NAME */}
        <button
          onClick={() => handleNav("/")}
          className="flex items-center gap-3"
        >
          <Image
            src="/artisanbazaar-logo.svg"
            alt="ArtisanBazaar"
            width={40}
            height={40}
            priority
          />
          <div className="flex flex-col items-start leading-tight">
            <span className="text-lg font-semibold tracking-tight text-black">
              ArtisanBazaar
            </span>
            <span className="text-[11px] text-gray-500">
              Local Art · Global Homes
            </span>
          </div>
        </button>

        {/* CENTER NAV (DESKTOP) */}
        <div className="hidden gap-7 md:flex">
          {navItems.map((item) => (
            <motion.button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className="relative text-[14px] font-medium text-black"
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-[1.5px] origin-left scale-x-0 bg-black transition-transform duration-200 group-hover:scale-x-100" />
              <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-[1.5px] origin-left scale-x-0 bg-black" />
              <motion.span
                className="pointer-events-none absolute inset-x-0 -bottom-1 h-[1.5px] origin-left bg-black"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.18 }}
              />
            </motion.button>
          ))}
        </div>

        {/* RIGHT ICONS (DESKTOP) */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => handleNav("/wishlist")}
            className="transition hover:opacity-70"
          >
            <Heart size={20} className="text-black" />
          </button>
          <button
            onClick={() => handleNav("/cart")}
            className="transition hover:opacity-70"
          >
            <ShoppingCart size={20} className="text-black" />
          </button>

          {isLoggedIn ? (
            <button
              onClick={() => handleNav("/profile")}
              className="rounded-full border border-black px-4 py-1.5 text-xs font-medium text-black transition hover:bg-black hover:text-white"
            >
              Profile
            </button>
          ) : (
            <button
              onClick={() => handleNav("/login")}
              className="rounded-full border border-black px-4 py-1.5 text-xs font-medium text-black transition hover:bg-black hover:text-white"
            >
              Login
            </button>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMobileOpen((p) => !p)}
          className="flex items-center md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="border-t border-gray-200 bg-white md:hidden"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-sm">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className="w-full rounded-md px-1 py-2 text-left text-[15px] text-black hover:bg-gray-100"
                >
                  {item.label}
                </button>
              ))}

              <div className="mt-2 flex items-center gap-4 border-t border-gray-100 pt-3">
                <Heart
                  size={20}
                  className="text-black"
                  onClick={() => handleNav("/wishlist")}
                />
                <ShoppingCart
                  size={20}
                  className="text-black"
                  onClick={() => handleNav("/cart")}
                />
                <User
                  size={20}
                  className="text-black"
                  onClick={() =>
                    handleNav(isLoggedIn ? "/profile" : "/login")
                  }
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
