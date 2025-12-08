"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import axios from "../../../../utils/axiosInstance"
import { useWishlistCon } from "../../../../hooks/useWishlist";
import { useCartt } from "../../../../hooks/useCart";
import Image from "next/image";

export default function ProductPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { toggleWishlist, isWishlisted } = useWishlistCon();
  const { addToCart } = useCartt();

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
    <section className="min-h-screen bg-gradient-to-b from-[#f8e272] to-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        
        {/* Left Image Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 flex items-center justify-center">
          <div className="relative w-full h-[480px] rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={product.images?.[0]?.url || "/placeholder.jpg"}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Content Section */}
        <div className="flex flex-col justify-center">
          
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 leading-snug">
            {product.title}
          </h1>

          {/* Description */}
          <p className="text-gray-700 text-lg mt-4">
            {product.description}
          </p>

          {/* Price */}
          <p className="text-4xl font-bold text-black mt-6">
            ₹{product.price}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(product.id)}
              className="px-8 py-3 rounded-xl text-lg font-semibold
                         bg-black text-white hover:bg-gray-800 shadow-lg transition"
            >
              Add to Cart
            </button>

            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`px-8 py-3 rounded-xl text-lg shadow-lg border transition ${
                isWishlisted(product.id)
                  ? "bg-[#ffa726] text-white border-[#ffa726]"
                  : "border-gray-300 text-gray-800 bg-white hover:bg-gray-100"
              }`}
            >
              {isWishlisted(product.id) ? "Wishlisted ❤️" : "Add to Wishlist"}
            </button>
          </div>

          {/* Seller */}
          <div className="mt-10 bg-white rounded-xl p-5 shadow-md">
            <p className="text-gray-600">
              Sold by:{" "}
              <span className="font-semibold text-gray-900">
                {product.seller?.name || "Unknown Seller"}
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

