"use client";

import { useWishlistCon } from "../../../hooks/useWishlist";
import ProductCard from "../../../components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlistCon();

  return (
    <div className="min-h-screen bg-white">
      {/* Header Background */}
      <div className="w-full bg-linear-to-b from-[#f8e272] to-[#FFFDF3] pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-semibold tracking-tight text-black">
            My Wishlist
          </h1>
          <p className="text-gray-700 mt-2 text-lg">
            Items you have saved for later.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-8 pb-24 relative z-10">
        {wishlist.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Explore our marketplace to find unique handmade items.</p>
            <a href="/marketplace" className="inline-block bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition">
              Browse Marketplace
            </a>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
