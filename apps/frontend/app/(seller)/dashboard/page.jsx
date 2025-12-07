"use client";

import { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import { useAuth } from "@/hooks/useAuth";

export default function SellerDashboard() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      const res = await axios.get(`/api/products/seller/${user.id}`);
      setProducts(res.data);
    };

    load();
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <h1 className="text-3xl font-semibold mb-8">
        Seller Dashboard
      </h1>

      <p className="text-gray-500 mb-6">
        Welcome back, {user?.name}
      </p>

      <h2 className="text-xl font-semibold mb-4">
        Your Products ({products.length})
      </h2>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {products.map((p) => (
          <div key={p.id} className="border rounded-lg p-4 shadow">
            <p className="font-semibold">{p.title}</p>
            <p className="text-gray-600">₹{p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
