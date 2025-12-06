"use client";

import { motion } from "framer-motion";

const categories = [
  {
    name: "Paintings & Illustration",
    tagline: "Original canvases, prints & wall art",
  },
  {
    name: "Ceramics & Clay",
    tagline: "Hand-thrown mugs, plates & decor",
  },
  {
    name: "Textiles & Weaves",
    tagline: "Throws, runners, cushions & more",
  },
  {
    name: "Jewelry & Accessories",
    tagline: "Handcrafted pieces with character",
  },
  {
    name: "Home Decor Objects",
    tagline: "Sculptures, frames & curios",
  },
  {
    name: "Gift Boxes & Sets",
    tagline: "Curated gifts for every occasion",
  },
];

export default function CategoryGrid() {
  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
              Browse by category
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Explore curated collections from independent artisans across India.
            </p>
          </div>
          <button className="h-fit rounded-full border border-black px-4 py-2 text-xs font-medium text-black transition hover:bg-black hover:text-white">
            View all products
          </button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="group flex flex-col items-start gap-1 rounded-2xl border border-gray-200 bg-white px-4 py-4 text-left text-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-[11px] uppercase tracking-[0.24em] text-gray-500">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="text-[15px] font-semibold text-black">
                {cat.name}
              </span>
              <span className="text-[13px] text-gray-600">{cat.tagline}</span>
              <span className="mt-2 text-[12px] text-gray-500 group-hover:text-black">
                Explore →
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
