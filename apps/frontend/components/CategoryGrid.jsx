"use client";

import Link from "next/link";
import Image from "next/image";

const categories = [
  {
    id: "paintings",
    label: "Paintings & Prints",
    color: "bg-[#FFE6C7]",
    image:
      "https://res.cloudinary.com/dxnmj5von/image/upload/v1765158000/handmade-beautiful-7-white-horse-canvas-painting-indian-home-decor-crafts-n-chisel-1_800x_toghhj.jpg",
  },
  {
    id: "home-decor",
    label: "Home Decor",
    color: "bg-[#FFF4D2]",
    image:
      "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157667/home-decor-handicraft-art-rajasthani-6-piece-musicians-set__64525.1643591354_aiguhe.jpg",
  },
  {
    id: "jewellery",
    label: "Handmade Jewellery",
    color: "bg-[#FFE0F0]",
    image:
      "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157786/Bling-On_C2_AE-Real-Rose-Resin-Jhumka-Earrings--Round-Diamond-Shapes-India-No1-Handmade-Jewellery-_E2_9C_A8-2_jhxmrr.webp",
  },
  {
    id: "textiles",
    label: "Textiles & Fabric",
    color: "bg-[#E7F5FF]",
    image:
      "https://res.cloudinary.com/dxnmj5von/image/upload/v1765157949/e5ea92e0717a7393966f5b634508936a_b7mkvy.jpg",
  },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      {/* Heading */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-gray-900">
          Shop by category
        </h2>
        <Link
          href="/marketplace"
          className="text-sm font-medium text-gray-700 hover:text-black transition"
        >
          View all →
        </Link>
      </div>

      {/* Category Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/marketplace?category=${cat.id}`}
            className={`relative rounded-2xl overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300 ${cat.color}`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-300">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                className="object-cover"
              />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/40 to-transparent"></div>

            {/* Text */}
            <div className="relative p-5 flex items-end h-36">
              <span className="font-semibold text-gray-900 text-sm">
                {cat.label}
              </span>
            </div>

            {/* Arrow */}
            <div className="absolute bottom-4 right-4 text-gray-800 text-lg font-bold opacity-70 group-hover:translate-x-1 transition-transform">
              →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
