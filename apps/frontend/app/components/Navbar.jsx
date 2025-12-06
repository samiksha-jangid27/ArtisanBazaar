"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, User, Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/marketplace" },
  {
    label: "Categories",
    dropdown: [
      { label: "Art & Paintings", path: "/category/art" },
      { label: "Ceramics", path: "/category/ceramics" },
      { label: "Textiles", path: "/category/textiles" },
      { label: "Jewelry", path: "/category/jewelry" },
    ],
  },
  { label: "For Artisans", path: "/for-artisans" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(null);

  const [scrollY, setScrollY] = useState(0);
  const [navHeight, setNavHeight] = useState(80);
  const [progress, setProgress] = useState(0);

  // Soft yellow brand background
  const NAV_YELLOW = "bg-white/95 backdrop-blur-md";

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollY(y);
      setProgress((y / docHeight) * 100);

      if (y > 40) setNavHeight(64);
      else setNavHeight(80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const go = (p) => {
    router.push(p);
    setMobileOpen(false);
    setShowDropdown(null);
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 z-[100] h-[3px] bg-black"
        style={{ width: `${progress}%` }}
      />

      <motion.nav
        style={{ height: navHeight }}
        transition={{ duration: 0.25 }}
        className={`fixed top-0 left-0 z-50 w-full border-b border-black/10 ${NAV_YELLOW}`}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6">

          {/* LOGO */}
          <button
            onClick={() => go("/")}
            className="flex items-center gap-3"
          >
            <Image
              src="/artisanbazaar-logo.svg"
              alt="ArtisanBazaar"
              width={42}
              height={42}
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

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) =>
              !item.dropdown ? (
                <motion.button
                  key={i}
                  onClick={() => go(item.path)}
                  className="relative text-[15px] font-medium text-black hover:text-gray-700"
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  <motion.span
                    className="absolute inset-x-0 -bottom-1 h-[2px] bg-black origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.25 }}
                  />
                </motion.button>
              ) : (
                <div
                  key={i}
                  className="relative"
                  onMouseEnter={() => setShowDropdown(item.label)}
                  onMouseLeave={() => setShowDropdown(null)}
                >
                  <motion.button
                    className="flex items-center gap-1 text-[15px] font-medium text-black hover:text-gray-700"
                    whileHover={{ y: -2 }}
                  >
                    {item.label}
                    <ChevronDown size={14} />
                  </motion.button>

                  <AnimatePresence>
                    {showDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute left-0 mt-2 w-48 rounded-lg border border-black/10 bg-white shadow-lg"
                      >
                        {item.dropdown.map((d, j) => (
                          <button
                            key={j}
                            onClick={() => go(d.path)}
                            className="w-full px-4 py-2 text-left text-sm text-black hover:bg-gray-100"
                          >
                            {d.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            )}
          </div>

          {/* RIGHT ICONS */}
          <div className="hidden md:flex items-center gap-6">
            <Icon label="Wishlist" onClick={() => go("/wishlist")}>
              <Heart size={22} className="text-black" />
            </Icon>

            <Icon label="Cart" onClick={() => go("/cart")}>
              <ShoppingCart size={22} className="text-black" />
            </Icon>

            <Icon
              label={isLoggedIn ? "Profile" : "Login"}
              onClick={() => go(isLoggedIn ? "/profile" : "/login")}
            >
              <User size={22} className="text-black" />
            </Icon>
          </div>

          {/* MOBILE MENU */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            className="md:hidden text-black"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </motion.nav>
    </>
  );
}

/* Tooltip Icons */
function Icon({ label, children, onClick }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative cursor-pointer"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onClick={onClick}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-[11px] text-white shadow-lg"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
