"use client";

import { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/products/featured");;
        setProducts(res.data || []);
      } catch (err) {
        console.error("Featured error", err);
      }
    };
    load();
  }, []);

  if (!products.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 pb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Featured this week
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
