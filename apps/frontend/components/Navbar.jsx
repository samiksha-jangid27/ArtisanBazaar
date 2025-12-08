"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

// MAIN NAV BUTTONS
const navItems = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/marketplace" },
  { label: "About", href: "/about" },
  { label: "For Artisans", href: "/for-artisans" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, user, logout } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll background transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    router.push(href);
    setMobileOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const displayName = user?.name || user?.username || "Account";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#ffe78f]/90 backdrop-blur-md shadow-sm"
          : "bg-[#fff9d6]/80 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between h-16 sm:h-20 px-4 lg:px-0">

        {/* LOGO */}
        <button onClick={() => handleNav("/")} className="flex items-center gap-3">
          <Image src="/artisanbazaar-logo.png" width={40} height={40} alt="ArtisanBazaar" />
          <div className="leading-tight text-left">
            <p className="font-semibold text-lg text-black">ArtisanBazaar</p>
            <p className="text-[11px] text-gray-600">Local Art · Global Homes</p>
          </div>
        </button>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex gap-7">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <button
                key={item.href}
                onClick={() => handleNav(item.href)}
                className={`relative text-[15px] font-medium transition ${
                  active ? "text-black" : "text-gray-700 hover:text-black"
                }`}
              >
                {item.label}

                {/* Underline Animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-black rounded-full transition-transform duration-200 ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                ></span>
              </button>
            );
          })}
        </div>

        {/* RIGHT ICONS */}
        <div className="hidden md:flex items-center gap-5">
          <IconButton onClick={() => handleNav("/wishlist")} tooltip="Wishlist">
            <Heart size={20} color="black" />
          </IconButton>

          <IconButton onClick={() => handleNav("/cart")} tooltip="Cart">
            <ShoppingCart size={20} color="black"/>
          </IconButton>

          {/* SELL BUTTON */}
          {isLoggedIn && (
            <button
              onClick={() => handleNav("/dashboard/create-product")}
              className="rounded-full bg-black text-white px-5 py-2 text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition"
            >
              Sell Item
            </button>
          )}

          {/* PROFILE */}
          <div className="relative">
            <IconButton onClick={() => (isLoggedIn ? setProfileOpen(!profileOpen) : handleNav("/login"))}>
              <User size={20} color="black"/>
            </IconButton>

            {profileOpen && isLoggedIn && (
              <div className="absolute right-0 mt-3 w-56 bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b text-sm bg-gray-50">
                  <p className="font-medium text-gray-900">Hi, {displayName.split(" ")[0]}</p>
                </div>

                <button onClick={() => handleNav("/dashboard")} className="dropdown-item">Dashboard</button>
                <button onClick={() => handleNav("/account")} className="dropdown-item">My Account</button>
                
                <button onClick={handleLogout} className="dropdown-item text-red-600">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div className="md:hidden bg-[#fff9d6]/90 backdrop-blur-md border-t shadow-sm p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleNav(item.href)}
              className="block w-full text-left px-3 py-2 rounded-lg text-gray-900 hover:bg-gray-200"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t">
            {isLoggedIn ? (
              <>
                <button onClick={() => handleNav("/dashboard")} className="mobile-item ">
                  Dashboard
                </button>
                <button onClick={() => handleNav("/dashboard/create-product")} className="mobile-item">
                  Sell Item
                </button>
                <button onClick={handleLogout} className="mobile-item text-red-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => handleNav("/login")} className="mobile-item">Login</button>
                <button onClick={() => handleNav("/register")} className="mobile-item">Register</button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------------------- */
/* ICON BUTTON COMPONENT                          */
/* ---------------------------------------------- */
function IconButton({ children, tooltip, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative p-2 rounded-full hover:bg-gray-100 transition flex items-center justify-center"
    >
      {children}
    </button>
  );
}
