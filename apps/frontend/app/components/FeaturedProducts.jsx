"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Hand-painted folk art canvas",
    artisan: "Meera Studio",
    price: 2499,
    category: "Paintings",
    image: "/products/folk-art.jpg",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Textured clay wall plate",
    artisan: "Clay & Co.",
    price: 1799,
    category: "Ceramics",
    image: "/products/clay-plate.jpg",
    badge: "Limited",
  },
  {
    id: 3,
    name: "Handwoven cotton throw",
    artisan: "Loom & Loom",
    price: 2199,
    category: "Textiles",
    image: "/products/cotton-throw.jpg",
    badge: "New",
  },
  {
    id: 4,
    name: "Recycled brass statement earrings",
    artisan: "Anvi Jewels",
    price: 1299,
    category: "Jewelry",
    image: "/products/brass-earrings.jpg",
    badge: "Eco-friendly",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
              Featured from our community
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Every purchase directly supports a local studio and their craft.
            </p>
          </div>
          <button className="h-fit rounded-full border border-black px-4 py-2 text-xs font-medium text-black transition hover:bg-black hover:text-white">
            See more like this
          </button>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, idx) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative h-44 w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-black/80 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-white">
                  {p.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <div className="text-[11px] uppercase tracking-[0.22em] text-gray-500">
                  {p.category}
                </div>
                <h3 className="text-sm font-semibold text-black line-clamp-2">
                  {p.name}
                </h3>
                <p className="text-[13px] text-gray-600">by {p.artisan}</p>
                <div className="mt-auto flex items-center justify-between pt-2">
                  <div className="text-base font-semibold text-black">
                    ₹{p.price.toLocaleString("en-IN")}
                  </div>
                  <button className="rounded-full border border-black px-3 py-1 text-[11px] font-medium text-black transition hover:bg-black hover:text-white">
                    View details
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
