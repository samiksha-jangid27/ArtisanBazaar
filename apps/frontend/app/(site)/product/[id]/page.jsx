"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import Image from "next/image";

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data.product || res.data);
      } catch (err) {
        console.error("Product load error:", err);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-10">Loading...</p>;
  if (!product) return <p className="p-10">Product not found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-12">
      {/* Images */}
      <div>
        <div className="relative w-full h-96 rounded-xl overflow-hidden shadow">
          <Image
            src={product.images?.[0]?.url || "/placeholder.jpg"}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
      </div>

      {/* Product Info */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">
          {product.title}
        </h1>
        <p className="text-gray-600 mt-2">{product.description}</p>

        <p className="text-2xl font-bold text-black mt-4">
          ₹{product.price}
        </p>

        {/* ACTION BUTTONS */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => addToCart(product)}
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>

          <button
            onClick={() => toggleWishlist(product.id)}
            className={`px-6 py-3 rounded-lg border ${
              isWishlisted(product.id)
                ? "bg-red-500 text-white border-red-500"
                : "border-gray-300 text-gray-700"
            }`}
          >
            {isWishlisted(product.id) ? "Wishlisted ❤️" : "Add to Wishlist"}
          </button>
        </div>

        {/* Seller */}
        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Sold by:{" "}
            <span className="font-medium text-gray-800">
              {product.seller?.name || "Unknown"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
