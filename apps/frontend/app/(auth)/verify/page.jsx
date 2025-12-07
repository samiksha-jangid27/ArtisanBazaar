"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const params = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState("Verifying your email...");

  const BASE_URL =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_SERVER_URL
      : process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;

  useEffect(() => {
    const verify = async () => {
      const token = params.get("token");

      if (!token) {
        setStatus("Invalid or missing verification token.");
        return;
      }

      try {
        const res = await axios.get(
          `${BASE_URL}/api/auth/verify-email?token=${token}`,
          { timeout: 8000 }
        );

        if (res.data.success) {
          toast.success("Email verified! You can now log in.");
          setStatus("Email verified! Redirecting to login...");

          setTimeout(() => router.push("/login"), 2000);
        } else {
          setStatus("Verification failed. Please try again.");
        }
      } catch (err) {
        console.error("Verify email error:", err);
        setStatus("Verification failed. Link may be expired.");
      }
    };

    verify();
  }, []); // NO WARNINGS NOW

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <p className="text-gray-900 text-lg font-medium">{status}</p>
    </div>
  );
}
