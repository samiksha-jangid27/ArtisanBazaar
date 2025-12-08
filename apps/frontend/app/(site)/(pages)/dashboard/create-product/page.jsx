"use client";

import { useState, useEffect } from "react";
import axios from "../../../../../utils/axiosInstance";
import { useRouter } from "next/navigation";
import { Upload, X, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../../../context/AuthContext";

export default function CreateProductPage() {
  const router = useRouter();
  const { logout, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    stock: "1",
    categoryId: "",
  });
  
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    // Fetch categories
    axios.get("/api/categories")
      .then(res => setCategories(res.data || []))
      .catch(err => console.error("Failed to load categories", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);

    const newPreviews = selected.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("categoryId", formData.categoryId);

      files.forEach((file) => {
        data.append("images", file);
      });

      await axios.post("/api/products", data, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/dashboard");
    } catch (error) {
      console.error("Create product error:", error);
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        logout();
      } else {
        alert("Failed to create product");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Background */}
      <div className="w-full bg-linear-to-b from-[#f8e272] to-[#FFFDF3] pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center text-black/70 hover:text-black mb-6 transition font-medium">
            <ChevronLeft size={20} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-semibold tracking-tight text-black">
            List a new item
          </h1>
          <p className="text-gray-700 mt-2 text-lg">
            Share your craft with the world.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 -mt-8 pb-24 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Product Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Handcrafted Ceramic Vase"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-lg text-gray-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Description</label>
              <textarea
                name="description"
                required
                rows={5}
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell the story behind your item..."
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition resize-none text-lg text-gray-500"
              />
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-lg text-gray-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Stock</label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="1"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition text-lg text-gray-500"
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">Category</label>
              <div className="relative">
                <select
                  name="categoryId"
                  required
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition appearance-none text-lg text-gray-500"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                  <ChevronLeft size={20} className="-rotate-90" />
                </div>
              </div>
            </div>

            {/* Images */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">Product Images</label>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {previews.map((src, idx) => (
                  <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-gray-200 group shadow-sm">
                    <img src={src} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-50"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                
                <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition text-gray-400 hover:text-black group">
                  <div className="bg-gray-100 p-3 rounded-full mb-2 group-hover:bg-white transition">
                    <Upload size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wide">Add Image</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white font-bold tracking-wide uppercase py-5 rounded-full hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-200"
              >
                {loading ? "Creating Listing..." : "Publish Listing"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
