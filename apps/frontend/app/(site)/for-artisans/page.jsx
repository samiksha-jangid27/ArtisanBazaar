"use client";

import { CheckCircle } from "lucide-react";

export default function ForArtisansPage() {
  const benefits = [
    "No approval needed — start selling instantly",
    "Showcase your handcrafted products",
    "Reach buyers across India",
    "Easy product management dashboard",
  ];

  return (
    <div
      className="min-h-screen pt-32 pb-24"
      style={{
        background: "linear-gradient(#f8e272, #fff7da, #ffffff)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 text-center">

        {/* Hero Section */}
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 animate-fadeIn">
          Become a Seller on <span className="text-[#ff8a00]">ArtisanBazaar</span>
        </h1>

        <p className="text-gray-700 text-lg max-w-2xl mx-auto mt-4 mb-14 animate-slideIn">
          Join thousands of creators selling handmade art, crafts, and beautiful
          products. We help you reach customers across India with ease.
        </p>

        {/* Why Sell Box */}
        <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-xl rounded-3xl p-10 mb-16 animate-scaleIn">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Why sell with us?
          </h2>

          <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 text-left max-w-2xl mx-auto">
            {benefits.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-800">
                <CheckCircle className="text-[#ff8a00] min-w-[20px] mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <a
          href="/dashboard/create-product"
          className="inline-block bg-[#ff8a00] text-white px-8 py-3 text-lg font-medium rounded-xl shadow-lg hover:bg-[#e67a00] transition-all transform hover:scale-[1.03]"
        >
          Start Selling Now
        </a>
      </div>
    </div>
  );
}
