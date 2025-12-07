"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/useAuth";
import ProductCard from "@/components/ProductCard";

export default function SellerProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`/api/products/seller/${user.id}`)
      .then((res) => setProducts(res.data || []))
      .catch(() => {});
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold">My Products</h1>

        <a
          href="/seller/products/create"
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800"
        >
          Add Product
        </a>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500">You have not added any products yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
