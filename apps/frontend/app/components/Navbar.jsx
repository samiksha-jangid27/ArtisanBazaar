"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, User, ShoppingBag } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleNavClick = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/70 backdrop-blur-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] z-50 border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <button
            onClick={() => handleNavClick("/")}
            className="flex items-center gap-2 text-2xl font-bold tracking-tight text-blue-700 hover:text-blue-800 transition cursor-pointer"
          >
            <ShoppingBag size={26} className="text-blue-600" />
            Artisan<span className="text-blue-600">Bazaar</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">Home</Link>
            <Link href="/gifts" className="text-gray-700 hover:text-blue-600 font-medium transition">Gifts</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition">Contact</Link>

            <div className="flex items-center space-x-3">
              {isLoggedIn ? (
                <button
                  onClick={() => handleNavClick("/profile")}
                  className="flex items-center gap-2 px-5 py-2 text-blue-700 border border-blue-300 rounded-full hover:bg-blue-50 hover:border-blue-400 transition font-medium"
                >
                  <User size={18} />
                  Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick("/login")}
                    className="px-5 py-2 text-blue-700 border border-blue-300 rounded-full hover:bg-blue-50 hover:border-blue-500 transition font-medium"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => handleNavClick("/register")}
                    className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium shadow-sm hover:bg-blue-700 transition"
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2.5 rounded-lg text-blue-800 hover:bg-blue-50 active:scale-95 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden">
          <div className="bg-white shadow-xl absolute top-16 left-0 w-full px-6 pt-3 pb-5 space-y-4 border-b border-blue-100">
            <button onClick={() => handleNavClick("/")} className="block text-lg text-gray-800 hover:text-blue-600 font-medium">Home</button>
            <button onClick={() => handleNavClick("/gifts")} className="block text-lg text-gray-800 hover:text-blue-600 font-medium">Gifts</button>
            <button onClick={() => handleNavClick("/about")} className="block text-lg text-gray-800 hover:text-blue-600 font-medium">About</button>
            <button onClick={() => handleNavClick("/contact")} className="block text-lg text-gray-800 hover:text-blue-600 font-medium">Contact</button>

            {isLoggedIn ? (
              <button
                onClick={() => handleNavClick("/profile")} 
                className="w-full text-center border border-blue-400 text-blue-700 rounded-full py-2 font-medium hover:bg-blue-50 transition"
              >
                Profile
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNavClick("/login")} 
                  className="w-full text-center border border-blue-400 text-blue-700 rounded-full py-2 font-medium hover:bg-blue-50 transition"
                >
                  Login
                </button>

                <button
                  onClick={() => handleNavClick("/register")} 
                  className="w-full text-center bg-blue-600 text-white rounded-full py-2 font-medium hover:bg-blue-700 transition shadow"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
