"use client";

import { useEffect, useState } from "react";
import axios from "../../../../utils/axiosInstance";
import { useAuth } from "../../../../context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import { Plus, Settings, Package, ShoppingBag, User as UserIcon } from "lucide-react";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      try {
        // Use the seller endpoint which now works for all users
        const res = await axios.get(`/api/products/seller/${user.id}`);
        setProducts(res.data || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [user]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Please log in</h2>
          <Link href="/login" className="text-blue-600 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Background */}
      <div className="relative w-full bg-linear-to-b from-[#f8e272] to-[#FFFDF3] pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-white shadow-md flex items-center justify-center text-3xl font-bold text-black border-4 border-white">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                Hello, {user.name}
              </h1>
              <p className="text-gray-700 mt-1">@{user.username}</p>
            </div>
          </div>
          
          <Link
            href="/dashboard/create-product"
            className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white shadow-lg hover:shadow-xl hover:scale-105 transition transform"
          >
            + Sell New Item
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-10 pb-20">
        {/* Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-10 bg-white/80 backdrop-blur-md p-2 rounded-2xl inline-flex shadow-sm">
          <button
            onClick={() => setActiveTab("products")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "products"
                ? "bg-black text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            My Listings
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeTab === "profile"
                ? "bg-black text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            Profile Settings
          </button>
        </div>

        {/* Content */}
        {activeTab === "products" && (
          <div>
            {loading ? (
              <div className="text-center py-20 text-gray-500">Loading your products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <Package size={56} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900">No products listed yet</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto mt-2">
                  Join our community of artisans. List your first handmade item and reach customers across India.
                </p>
                <Link
                  href="/dashboard/create-product"
                  className="inline-flex items-center gap-2 text-black font-semibold hover:underline"
                >
                  Create your first listing &rarr;
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
                      {product.images?.[0]?.url ? (
                        <Image
                          src={product.images[0].url}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-700"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          No Image
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 truncate text-lg">
                        {product.title}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">
                        ₹{product.price}
                      </p>
                      
                      <div className="mt-5 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                         <button className="flex-1 text-xs font-medium bg-black text-white py-2.5 rounded-full hover:bg-gray-800 transition">
                           Edit
                         </button>
                         <button className="flex-1 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 py-2.5 rounded-full transition">
                           Delete
                         </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-10 max-w-2xl">
            <h3 className="text-2xl font-bold mb-8 tracking-tight">Account Details</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Full Name</label>
                <div className="w-full px-5 py-3 rounded-2xl bg-gray-50 text-gray-900 font-medium border border-gray-100">
                  {user.name}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Email Address</label>
                <div className="w-full px-5 py-3 rounded-2xl bg-gray-50 text-gray-900 font-medium border border-gray-100">
                  {user.email}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Username</label>
                <div className="w-full px-5 py-3 rounded-2xl bg-gray-50 text-gray-900 font-medium border border-gray-100">
                  @{user.username}
                </div>
              </div>
              
              <div className="pt-8 border-t border-gray-100 mt-8">
                 <button
                   onClick={logout}
                   className="text-red-600 font-semibold hover:text-red-700 text-sm flex items-center gap-2"
                 >
                   <span className="w-2 h-2 rounded-full bg-red-600"></span>
                   Sign Out
                 </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
