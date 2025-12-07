"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const heroSlides = [
  {
    title: "Musical Lady Dolls Set",
    subtitle: "Handmade Decorative Gift Item showpiece for Homedecor",
    image: "/hero_image1.jpg",
  },
  {
    title: "Wall Hangings",
    subtitle: "Wall hanging made using ice cream sticks",
    image: "/hero_image2.jpg",
  },
  {
    title: "Framed Paintings",
    subtitle: "Set of Four Framed Painting for Wall Painting Decoration",
    image: "/hero_image3.jpg",
  },
  {
    title: "Dog Painting",
    subtitle: "Colorful dog hand painted from natural colors",
    image: "/hero_image3.jpeg",
  }
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((i) => (i + 1) % heroSlides.length),
      4500
    );
    return () => clearInterval(id);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative w-full bg-linear-to-b from-[#f8e272] via-[#FFFDF3] to-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 pb-16 pt-28 sm:px-6 lg:flex-row lg:items-center lg:gap-16 lg:px-0">
        {/* LEFT: TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1"
        >
          <p className="inline-flex items-center rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-black/80">
            We support local artisans
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-black sm:text-5xl lg:text-[3.2rem] lg:leading-tight">
            A curated marketplace for{" "}
            <span className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.2rem] lg:leading-tight text-amber-600">
              Handmade Stories
            </span>{" "}
            and timeless craft.
          </h1>

          <p className="mt-4 max-w-xl text-[20px] text-gray-700">
            Every product on ArtisanBazaar is crafted by an independent maker.
            We handle discovery, payments and logistics so artisans can focus
            on what they do best: CREATING.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white shadow-sm hover:shadow-md"
            >
              Explore marketplace
            </motion.button>
            <button className="rounded-full border border-black px-5 py-2.5 text-sm font-medium text-black transition hover:bg-black hover:text-white">
              Become a seller
            </button>
          </div>

          <div className="mt-6 flex flex-wrap gap-6 text-xs text-gray-600">
            <Stat label="Artisans" value="450+" />
            <Stat label="Handmade items" value="3,000+" />
            <Stat label="Cities" value="80+" />
          </div>
        </motion.div>

        {/* RIGHT: ROTATING PRODUCT CARD */}
        <motion.div
          key={slide.title}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative flex-1"
        >
          {/* soft blobs */}
          <div className="pointer-events-none absolute -left-6 -top-6 h-32 w-32 rounded-full bg-white/80 blur-2xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-28 w-28 rounded-full bg-yellow-200/70 blur-2xl" />

          {/* back card */}
          <div className="pointer-events-none absolute -left-6 -top-4 h-64 w-full max-w-sm rounded-3xl bg-black/90 shadow-2xl" />
          {/* mid card */}
          <div className="pointer-events-none absolute right-0 top-6 h-64 w-full max-w-sm rounded-3xl border border-black/5 bg-white shadow-xl" />

          {/* front rotating card */}
          <div className="relative z-10 w-full max-w-sm rounded-3xl border border-black/10 bg-white/95 p-5 shadow-2xl">
            <div className="relative h-52 w-full overflow-hidden rounded-2xl bg-[#f5f5f5]">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500">
                  Featured collection
                </p>
                <p className="mt-1 text-sm font-semibold text-black">
                  {slide.title}
                </p>
                <p className="mt-1 text-[13px] text-gray-600">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* small dots */}
          <div className="mt-4 flex justify-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                className={`h-1.5 w-4 rounded-full ${
                  i === current ? "bg-black" : "bg-gray-300"
                }`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-gray-500">
        {label}
      </div>
      <div className="text-base font-semibold text-black">{value}</div>
    </div>
  );
}
