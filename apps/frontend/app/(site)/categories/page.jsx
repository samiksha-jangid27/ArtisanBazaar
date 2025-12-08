"use client";

import { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import Link from "next/link";
import Image from "next/image";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data.categories || []))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pt-32 pb-20">
      <h1 className="text-3xl font-semibold mb-8">Categories</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/marketplace?category=${cat.id}`}
            className="border rounded-lg p-6 text-center hover:shadow-lg transition"
          >
            <Image
              src={cat.image || "/placeholder.jpg"}
              className="w-full h-40 object-cover rounded mb-4"
              alt=""
            />
            <h2 className="font-semibold">{cat.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
