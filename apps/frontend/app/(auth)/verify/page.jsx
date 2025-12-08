"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import axios from "../../../utils/axiosInstance";
import toast from "react-hot-toast";

export default function VerifyPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email"); // changed from userId → email

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      return toast.error("Enter valid 6-digit OTP");
    }

    setLoading(true);

    try {
      await axios.post("/api/auth/verify-otp", { email, otp });

      toast.success("Email Verified 🎉");
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.ERROR || "Invalid OTP");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-linear-to-b from-[#f8e272] via-[#FFFDF3] to-white px-6">

      <div className="bg-white/90 backdrop-blur-md border border-yellow-200 
      rounded-3xl shadow-xl px-8 py-10 max-w-md w-full animate-slideIn">

        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Verify your email
        </h1>

        <p className="text-gray-600 text-center mt-2">
          We have sent a 6-digit OTP to <span className="font-semibold">{email}</span>
        </p>

        {/* OTP INPUT */}
        <div className="mt-6">
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full text-center text-3xl font-semibold tracking-[0.4em]
            border border-gray-300 rounded-xl px-4 py-4 bg-white text-black 
            focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            placeholder="• • • • • •"
          />
        </div>

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerify}
          className="mt-8 w-full bg-black text-white py-3 rounded-xl 
          hover:bg-gray-900 transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        <p
          className="text-center text-sm text-gray-600 mt-4 hover:underline cursor-pointer"
          onClick={() => router.push(`/resend-otp?email=${email}`)}
        >
          Didn’t receive OTP? Resend
        </p>
      </div>
    </div>
  );
}
