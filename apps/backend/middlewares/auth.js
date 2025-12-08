// routes/auth.routes.js
const express = require("express");
const {
  register,
  verifyOtp,
  resendVerificationOtp,
  login,
  forgotPassword,
  resetPassword,
  getMe,
} = require("../controllers/auth.controller");
const { protect } = require("../middlewares/protect");

const router = express.Router();

// Register + send OTP
router.post("/register", register);

// Verify OTP (email verification)
router.post("/verify-otp", verifyOtp);

// Resend verification OTP
router.post("/resend-otp", resendVerificationOtp);

// Login
router.post("/login", login);

// Forgot password → send OTP
router.post("/forgot-password", forgotPassword);

// Reset password using OTP
router.post("/reset-password", resetPassword);

// Get logged-in user
router.get("/me", protect, getMe);

module.exports = router;
