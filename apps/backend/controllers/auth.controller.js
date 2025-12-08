const { prisma } = require("../config/database");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateToken");
const { generateOtp } = require("../utils/otp");
const bcrypt = require("bcryptjs");

/* ---------------------------
   Async Wrapper
---------------------------- */
function asyncWrapper(fn) {
  return (req, res) => {
    fn(req, res).catch((err) => {
      console.error("AUTH CONTROLLER ERROR:", err);
      res
        .status(err.statusCode || 500)
        .json({ ERROR: err.message || "Internal Server Error" });
    });
  };
}

/* ---------------------------
   REGISTER + OTP
---------------------------- */
const register = asyncWrapper(async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password)
    return res.status(400).json({ ERROR: "All fields are required" });

  const exist = await prisma.user.findFirst({
    where: {
      OR: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }],
    },
  });

  if (exist)
    return res
      .status(400)
      .json({ ERROR: "User with this email or username already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const otp = generateOtp();
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  const user = await prisma.user.create({
    data: {
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashed,
      otpCode: otp,
      otpExpiresAt: expires,
      isVerified: false,
    },
  });

  await sendEmail({
    to: user.email,
    subject: "Your ArtisanBazaar Verification Code",
    html: `
      <h2>Verify your email</h2>
      <h1 style="font-size:32px; letter-spacing:4px;">${otp}</h1>
      <p>This OTP expires in 10 minutes.</p>
    `,
  });

  res.status(201).json({
    message: "OTP sent to email",
    userId: user.id,
  });
});

/* ---------------------------
   VERIFY OTP
---------------------------- */
const verifyOtp = asyncWrapper(async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp)
    return res.status(400).json({ ERROR: "Email and OTP required" });

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ ERROR: "User not found" });

  if (user.otpCode !== otp) return res.status(400).json({ ERROR: "Invalid OTP" });

  if (user.otpExpiresAt < new Date())
    return res.status(400).json({ ERROR: "OTP expired" });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      isVerified: true,
      otpCode: null,
      otpExpiresAt: null,
    },
  });

  res.json({ message: "Email verified successfully" });
});

/* ---------------------------
   RESEND OTP
---------------------------- */
const resendVerificationOtp = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ ERROR: "Email is required" });

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ ERROR: "User not found" });

  if (user.isVerified)
    return res.status(400).json({ ERROR: "User already verified" });

  const otp = generateOtp();
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: { otpCode: otp, otpExpiresAt: expires },
  });

  await sendEmail({
    to: user.email,
    subject: "Your New Verification Code",
    html: `<h1>${otp}</h1>`,
  });

  res.json({ message: "New OTP sent" });
});

/* ---------------------------
   LOGIN
---------------------------- */
const login = asyncWrapper(async (req, res) => {
  const { emailOrUsername, password } = req.body;

  if (!emailOrUsername || !password)
    return res.status(400).json({ ERROR: "All fields are required" });

  const identifier = emailOrUsername.toLowerCase();

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: identifier }, { username: identifier }],
    },
  });

  if (!user) return res.status(401).json({ ERROR: "Invalid credentials" });

  if (!user.isVerified)
    return res.status(403).json({ ERROR: "Please verify your email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ ERROR: "Invalid credentials" });

  const token = generateToken(user);

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      role: user.role,
    },
  });
});

/* ---------------------------
   FORGOT PASSWORD OTP
---------------------------- */
const forgotPassword = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ ERROR: "User not found" });

  const otp = generateOtp();
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetOtpCode: otp,
      resetOtpExpiresAt: expires,
    },
  });

  await sendEmail({
    to: user.email,
    subject: "Password Reset OTP",
    html: `<h1>${otp}</h1>`,
  });

  res.json({ message: "Reset OTP sent to email" });
});

/* ---------------------------
   RESET PASSWORD
---------------------------- */
const resetPassword = asyncWrapper(async (req, res) => {
  const { email, otp, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return res.status(404).json({ ERROR: "User not found" });

  if (user.resetOtpCode !== otp)
    return res.status(400).json({ ERROR: "Invalid OTP" });

  if (user.resetOtpExpiresAt < new Date())
    return res.status(400).json({ ERROR: "OTP expired" });

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashed,
      resetOtpCode: null,
      resetOtpExpiresAt: null,
    },
  });

  res.json({ message: "Password reset successful" });
});

/* ---------------------------
   GET ME
---------------------------- */
const getMe = asyncWrapper(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
  });

  if (!user) return res.status(404).json({ ERROR: "User not found" });

  res.json({ user });
});

/* ---------------------------
   EXPORT (CommonJS)
---------------------------- */
module.exports = {
  register,
  verifyOtp,
  resendVerificationOtp,
  login,
  forgotPassword,
  resetPassword,
  getMe,
};
