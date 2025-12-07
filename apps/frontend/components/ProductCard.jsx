"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { items, addToWishlist, removeFromWishlist } = useWishlist();

  const isSaved = items?.some((item) => item.productId === product.id);

  const toggleWishlist = () => {
    if (isSaved) removeFromWishlist(product.id);
    else addToWishlist(product.id);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative rounded-xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden"
    >
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute right-3 top-3 z-20 bg-white/80 p-2 rounded-full shadow-sm hover:bg-white transition"
      >
        <Heart
          size={18}
          className={isSaved ? "text-red-500 fill-red-500" : "text-gray-700"}
        />
      </button>

      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-56 bg-gray-50">
          <Image
            src={product.images?.[0]?.url || "/placeholder.png"}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <p className="text-sm text-gray-500">{product.category?.name}</p>

          <h3 className="font-semibold mt-1 text-gray-900 line-clamp-1">
            {product.title}
          </h3>

          <p className="mt-1 text-yellow-600 font-medium">
            ₹{product.price.toFixed(2)}
          </p>

          {/* Rating (simple average) */}
          <div className="flex items-center mt-2 text-yellow-500 text-sm">
            {"★".repeat(product.reviews?.length ? 4 : 5)}
            <span className="text-gray-500 ml-1 text-xs">
              ({product.reviews?.length || 0})
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
