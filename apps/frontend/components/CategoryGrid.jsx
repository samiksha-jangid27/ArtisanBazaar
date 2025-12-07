 "use client";

import Link from "next/link";

const categories = [
  { id: "paintings", label: "Paintings & Prints", color: "bg-[#FFE6C7]" },
  { id: "home-decor", label: "Home Decor", color: "bg-[#FFF4D2]" },
  { id: "jewellery", label: "Handmade Jewellery", color: "bg-[#FFE0F0]" },
  { id: "textiles", label: "Textiles & Fabric", color: "bg-[#E7F5FF]" },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Shop by category
        </h2>
        <Link
          href="/categories"
          className="text-sm font-medium text-gray-700 underline"
        >
          View all
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/marketplace?category=${cat.id}`}
            className={`rounded-2xl p-5 flex items-end h-32 ${cat.color} hover:shadow-md transition`}
          >
            <span className="font-medium text-gray-900 text-sm">
              {cat.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
