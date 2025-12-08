"use client";

import { useState } from "react";
import axios from "../../../utils/axiosInstance";
import AuthInput from "../../../components/AuthInput";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post("/api/auth/login", {
        emailOrUsername,
        password,
      });

      const token = res.data?.token;
      if (!token) {
        throw new Error("No token returned from server");
      }

      // ✅ update context + localStorage
      login(token);

      toast.success("Logged in successfully");
      router.push("/"); // you can change to "/account" later
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      const backendError =
        err.response?.data?.ERROR ||
        err.response?.data?.message ||
        err.message ||
        "Invalid login.";

      setErrorMsg(backendError);
      toast.error(backendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f8e272] to-white flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl"
      >
        <h1 className="text-3xl font-semibold text-center text-gray-900">
          Welcome back
        </h1>
        <p className="text-center text-gray-600 text-sm mt-1">
          Login to continue shopping
        </p>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleLogin}>
          <AuthInput
            label="Email or Username"
            value={emailOrUsername}
            onChange={setEmailOrUsername}
          />
          <AuthInput
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
          />

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-700">
          Don’t have an account?{" "}
          <a href="/register" className="underline font-medium">
            Register
          </a>
        </p>
      </motion.div>
    </section>
  );
}
