"use client";

import { useState, useEffect } from "react";
import axios from "../../../utils/axiosInstance";
import ProductCard from "../../../components/ProductCard";
import { Search, SlidersHorizontal } from "lucide-react";

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sort: "",
    page: 1,
  });

  const [loading, setLoading] = useState(true);
  const limit = 12;

  // Load categories
  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => {});
  }, []);

  // Load products
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/products", {
          params: { ...filters, limit },
        });

        setProducts(res.data.products || res.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    load();
  }, [filters]);

  const updateFilter = (key, value) =>
    setFilters((p) => ({ ...p, page: 1, [key]: value }));

  const resetFilters = () =>
    setFilters({ search: "", category: "", sort: "", page: 1 });

  return (
    <div
      className="min-h-screen pt-32 pb-20"
      style={{
        background: "linear-gradient(#f8e272, #fff7da, #ffffff)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center mb-14 animate-slideIn">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Discover <span className="text-[#ff8a00]">Handmade</span> Treasures
          </h1>
          <p className="text-gray-600 mt-2 text-lg max-w-2xl mx-auto">
            Explore unique artisanal items crafted with culture, passion, and creativity.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-6 mb-14 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Search Bar */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search handmade products..."
                className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-[#ff8a00] outline-none"
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
              />
            </div>

            {/* Categories */}
            <select
              className="border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#ff8a00] outline-none"
              value={filters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
            >
              <option value="">All Categories</option>
              {categories?.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              className="border border-gray-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#ff8a00] outline-none"
              value={filters.sort}
              onChange={(e) => updateFilter("sort", e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="newest">Newest</option>
              <option value="price_low">Price: Low → High</option>
              <option value="price_high">Price: High → Low</option>
            </select>

            {/* Reset Filters */}
            <button
              onClick={resetFilters}
              className="bg-[#ff8a00] text-white rounded-xl py-3 text-sm 
              flex items-center justify-center gap-2 
              hover:bg-[#e67a00] transition-all shadow-md"
            >
              <SlidersHorizontal size={16} />
              Reset Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <p className="text-center text-gray-600 mt-10 text-lg">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 mt-10 text-lg">No products found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
