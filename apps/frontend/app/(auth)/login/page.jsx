"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState({ input: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_SERVER_URL
      : process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;

  const getErrorMessage = (err, fallback = "Login failed ❌") => {
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
    setMessage("");

    const input = formData.input.trim();
    const password = formData.password.trim();

    if (!input || !password) {
      const msg = "Email/Username and Password are required";
      setMessage(`⚠️ ${msg}`);
      toast.error(`⚠️ ${msg}`);
      setLoading(false);
      return;
    }

    const payload = {
      password,
      ...(input.includes("@")
        ? { email: input.toLowerCase() }
        : { username: input.toLowerCase() }),
    };

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/login`, payload, {
        headers: { "Content-Type": "application/json" },
        timeout: 8000,
      });

      setLoading(false);

      // backend might return error telling user to verify email
      if (res.data.ERROR === "Please verify your email first") {
        setMessage("Please verify your email before logging in.");
        toast.error("Verify your email before logging in.");
        return;
      }

      if (res.data?.token) {
        login(res.data.token);
        toast.success("✅ Login successful! Redirecting...");
        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => router.push("/profile"), 1000);
      } else {
        toast.error("Unexpected response format ❌");
        setMessage("Unexpected response format ❌");
      }
    } catch (err) {
      const msg = getErrorMessage(err);
      console.error("Login error:", err);
      setLoading(false);
      toast.error(`❌ ${msg}`);
      setMessage(`❌ ${msg}`);
    }
  };

  return (
    <div className="min-h-screen w-full flex gap-0 md:gap-10 bg-white">
      {/* LEFT SIDE — optional video/illustration */}
      <div className="w-1/2 hidden md:flex items-center justify-center bg-white">
        <video autoPlay muted playsInline className="w-150 h-150 bg-white">
          <source src="/ARTISANBAZAAR.mp4" type="video/mp4" />
        </video>
      </div>

      {/* RIGHT SIDE — LOGIN FORM */}
      <div className="w-full md:w-[58%] flex flex-col items-center justify-center p-8 bg-white animate-slideIn relative">
        <button
          onClick={() => router.push("/")}
          className="absolute top-6 right-6 text-gray-700 hover:text-black transition flex items-center gap-1"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <h2 className="text-4xl font-bold text-black mb-8">Artisan Bazaar</h2>

        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-800 font-semibold mb-1">
                Email / Username
              </label>
              <input
                type="text"
                name="input"
                value={formData.input}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full border border-black rounded-md px-4 py-2.5 text-black outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-gray-800 font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border border-black rounded-md px-4 py-2.5 text-black outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white font-semibold py-3 rounded-md hover:bg-neutral-900 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {message && (
            <p
              className={`text-center mt-4 text-sm ${
                message.includes("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-center text-gray-700 text-sm mt-6">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
