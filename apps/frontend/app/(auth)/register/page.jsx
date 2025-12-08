"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_SERVER_URL
      : process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;

  const getErrorMessage = (err, fallback = "Something went wrong") => {
    if (err.response?.data?.ERROR) return err.response.data.ERROR;
    if (err.response?.data?.message) return err.response.data.message;
    if (err.message?.includes("timeout")) return "Request timed out. Try again.";
    if (err.request) return "No response from server. Check your network.";
    return fallback;
  };

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, username, email, password, confirmPassword } = formData;

    // 1) simple frontend validation
    if (!name || !username || !email || !password) {
      setLoading(false);
      return toast.error("All fields are required");
    }

    if (password !== confirmPassword) {
      setLoading(false);
      return toast.error("Passwords do not match");
    }

    const payload = {
      name: name.trim(),
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password,
    };

    try {
      const res = await axios.post(
        `${BASE_URL}/api/auth/register`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      // If backend returns a message, show it
      const msg =
        res.data?.message ||
        "Registration successful! Please check your email / OTP.";

      toast.success(msg);

      // 🔁 Redirect to OTP verify page (email-based)
      router.push(`/verify?email=${encodeURIComponent(payload.email)}`);
    } catch (err) {
      console.error("REGISTER ERROR:", err);
      const msg = getErrorMessage(err);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f8e272] via-[#FFFDF3] to-white px-4">
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-700 hover:text-black transition"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="w-full max-w-md bg-white/90 border border-yellow-200 rounded-2xl shadow-lg px-7 py-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center">
          Create your <span className="text-amber-600">ArtisanBazaar</span> account
        </h1>
        <p className="mt-2 text-xs text-gray-500 text-center">
          Join our community of buyers and makers. Verify your email with OTP to continue.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Samiksha Jangid"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-black/80 focus:border-black outline-none transition"
            />
          </div>

          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="e.g. samiksha_art"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-black/80 focus:border-black outline-none transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-black/80 focus:border-black outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-black/80 focus:border-black outline-none transition"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-800">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat password"
              className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-black/80 focus:border-black outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-full bg-black text-white text-sm font-medium py-2.5 hover:bg-gray-900 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up & get OTP"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-amber-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
