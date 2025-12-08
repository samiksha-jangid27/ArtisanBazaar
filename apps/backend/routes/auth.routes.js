const express = require("express");

const {
  register,
  login,
  verifyOtp,        // NEW
  forgotPassword,
  resetPassword,
  getMe
} = require("../controllers/auth.controller");

const { protect } = require("../middlewares/protect");

const router = express.Router();

// AUTH MAIN ROUTES
router.post("/register", register);
router.post("/login", login);

// OTP VERIFICATION
router.post("/verify-otp", verifyOtp);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// PROFILE
router.get("/me", protect, getMe);

module.exports = router;
