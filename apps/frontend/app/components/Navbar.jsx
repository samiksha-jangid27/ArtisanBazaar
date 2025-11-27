"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  const toggleMenu = () => setIsOpen(prev => !prev);
  const handleNavClick = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* LOGO + TEXT (BLACK) */}
          <button 
            onClick={() => handleNavClick("/")}
            className="flex items-center cursor-pointer"
          >
            <Image 
              src="/newlogo.png"     
              width={50}
              height={50}
              alt="Artisan Bazaar Logo"
            />
            <span className="text-2xl font-bold text-black">Artisan Bazaar</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link href="/" className="text-black hover:text-gray-600">Home</Link>
            <Link href="/gifts" className="text-black hover:text-gray-600">Gifts</Link>
            <Link href="/about" className="text-black hover:text-gray-600">About</Link>
            <Link href="/contact" className="text-black hover:text-gray-600">Contact</Link>

            {isLoggedIn ? (
              <button 
                onClick={() => handleNavClick("/profile")} 
                className="flex items-center gap-2 px-4 py-2 border border-gray-400 rounded-full text-black hover:bg-gray-100"
              >
                <User size={18}/> Profile
              </button>
            ) : (
              <>
                <button 
                  onClick={() => handleNavClick("/login")} 
                  className="px-4 py-2 border border-gray-400 rounded-full text-black hover:bg-gray-100"
                >
                  Login
                </button>
                <button 
                  onClick={() => handleNavClick("/register")} 
                  className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-900"
                >
                  Register
                </button>
              </>
            )}
          </div>

          {/* Mobile Icon */}
          <button onClick={toggleMenu} className="md:hidden text-black">
            {isOpen ? <X size={26}/> : <Menu size={26}/>}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white w-full shadow-lg border-t border-gray-300 py-4 space-y-2 px-6">
          <button onClick={() => handleNavClick("/")} className="block text-black text-lg hover:text-gray-600">Home</button>
          <button onClick={() => handleNavClick("/gifts")} className="block text-black text-lg hover:text-gray-600">Gifts</button>
          <button onClick={() => handleNavClick("/about")} className="block text-black text-lg hover:text-gray-600">About</button>
          <button onClick={() => handleNavClick("/contact")} className="block text-black text-lg hover:text-gray-600">Contact</button>

          {isLoggedIn ? (
            <button onClick={() => handleNavClick("/profile")} className="w-full border border-gray-400 rounded-full py-2 text-black hover:bg-gray-100">Profile</button>
          ) : (
            <>
              <button onClick={() => handleNavClick("/login")} className="w-full border border-gray-400 rounded-full py-2 text-black hover:bg-gray-100">Login</button>
              <button onClick={() => handleNavClick("/register")} className="w-full bg-black text-white rounded-full py-2 hover:bg-gray-900">Register</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
