"use client";

import { useCart } from "../../../context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, updateQty, removeItem } = useCart();

  if (!cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading cart...</p>
      </div>
    );
  }

  const items = cart.items || [];

  return (
    <section className="min-h-screen bg-linear-to-b from-[#f8e272] via-[#FFFDF3] to-white px-4 py-28">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-semibold text-gray-900 mb-10">
          Your Cart
        </h1>

        {/* ---------------- EMPTY CART ---------------- */}
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center bg-white p-10 rounded-2xl shadow-md"
          >
            <p className="text-gray-700 text-lg">Your cart is empty.</p>
            <Link
              href="/marketplace"
              className="mt-4 inline-block bg-black text-white px-6 py-2.5 rounded-full"
            >
              Browse products
            </Link>
          </motion.div>
        )}

        {/* ---------------- CART LIST ---------------- */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 shadow-md flex gap-5"
              >
                {/* IMAGE */}
                <div className="w-32 h-32 relative rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={item.product.images?.[0]?.url}
                    alt={item.product.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {item.product.seller?.name}
                    </p>

                    <p className="text-amber-700 font-semibold mt-3">
                      ₹{item.product.price}
                    </p>
                  </div>

                  {/* QTY + REMOVE */}
                  <div className="flex items-center justify-between mt-4">
                    {/* QTY BUTTONS */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQty(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="w-8 h-8 flex items-center justify-center rounded-full border"
                      >
                        -
                      </button>

                      <span className="text-gray-900 font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQty(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border"
                      >
                        +
                      </button>
                    </div>

                    {/* REMOVE */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ---------------- SUMMARY ---------------- */}
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg h-fit"
            >
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              <div className="flex justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>
                  ₹
                  {items
                    .reduce(
                      (acc, item) =>
                        acc + item.product.price * item.quantity,
                      0
                    )
                    .toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-gray-700 mb-6">
                <span>Shipping</span>
                <span>₹49</span>
              </div>

              <div className="flex justify-between text-lg font-semibold text-gray-900 mb-6">
                <span>Total</span>
                <span>
                  ₹
                  {(
                    items.reduce(
                      (acc, item) =>
                        acc + item.product.price * item.quantity,
                      0
                    ) + 49
                  ).toLocaleString()}
                </span>
              </div>

              <button className="w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition">
                Proceed to Checkout
              </button>

              <p className="text-center text-xs mt-3 text-gray-500">
                Secure payment · Easy returns · 100% artisan-made
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
