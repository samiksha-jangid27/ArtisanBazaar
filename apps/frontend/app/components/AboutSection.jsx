"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="border-t border-gray-200 bg-[#FFFDF3] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        <div className="grid gap-10 lg:grid-cols-[1.3fr,1fr]">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[11px] uppercase tracking-[0.26em] text-gray-500">
              Who we are
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
              A digital home for local art & craft.
            </h2>
            <p className="mt-3 text-[15px] text-gray-700">
              ArtisanBazaar was created with one simple idea:{" "}
              <span className="font-medium">
                craft should be valued as much as commerce.
              </span>{" "}
              We partner with independent artisans and small studios, giving
              them a space where their work is seen, understood and fairly paid
              for.
            </p>
            <p className="mt-3 text-[15px] text-gray-700">
              From block printers and potters to illustrators and woodworkers,
              every seller is vetted for quality and authenticity. Our team
              handles the tech and logistics; they bring the skill, stories and
              soul.
            </p>
          </motion.div>

          {/* RIGHT: small bullets */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid gap-4 text-sm text-gray-800"
          >
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-black">
                Fair, transparent payouts
              </h3>
              <p className="mt-1 text-[13px] text-gray-600">
                Simple pricing, no hidden charges, and fast payouts to sellers.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-black">
                Curated, not overcrowded
              </h3>
              <p className="mt-1 text-[13px] text-gray-600">
                We keep the marketplace focused so every artisan gets space to
                shine.
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <h3 className="text-sm font-semibold text-black">
                Built for connection
              </h3>
              <p className="mt-1 text-[13px] text-gray-600">
                Chat, custom orders and story-led product pages bring buyers
                closer to the makers.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
