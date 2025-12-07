const { prisma } = require("../config/database");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");
const { createToken, verifyToken } = require("../utils/generateToken");


// REGISTER USER
async function register(req, res) {
  try {
    const { name, username, email, password, confirm_password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ ERROR: "All fields are required" });
    }

    if (password !== confirm_password) {
      return res.status(400).json({ ERROR: "Passwords do not match" });
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ ERROR: "Email or username already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashed,
      }
    });

    // Create verification token
    const token = createToken({ userId: user.id }, "1d");

    const verifyURL = `${process.env.FRONTEND_SERVER_URL}/verify-email?token=${token}`;

    // Send email
    await sendEmail(
      user.email,
      "Verify your ArtisanBazaar Email",
      `
      <h2>Welcome to ArtisanBazaar!</h2>
      <p>Click below to verify your email:</p>
      <a href="${verifyURL}" style="color:#eab308;">Verify Email</a>
      `
    );

    return res.status(201).json({
      message: "Registration successful. Please verify your email."
    });

  } catch (err) {
    console.error("REGISTER ERROR:", err);
    return res.status(500).json({ ERROR: "Server error" });
  }
}



// VERIFY EMAIL
async function verifyEmail(req, res) {
  try {
    const { token } = req.query;

    if (!token) return res.status(400).json({ ERROR: "Token missing" });

    const decoded = verifyToken(token);

    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: { emailVerified: true }
    });

    return res.json({ message: "Email verified successfully. You may now log in." });

  } catch (err) {
    console.error("VERIFY EMAIL ERROR:", err);
    return res.status(400).json({ ERROR: "Invalid or expired token" });
  }
}



// RESEND VERIFICATION EMAIL
async function resendVerification(req, res) {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) return res.status(404).json({ ERROR: "User not found" });
    if (user.emailVerified) return res.status(400).json({ ERROR: "Email already verified" });

    const token = createToken({ userId: user.id }, "1d");

    const verifyURL = `${process.env.FRONTEND_SERVER_URL}/verify-email?token=${token}`;

    await sendEmail(
      user.email,
      "Resend Email Verification - ArtisanBazaar",
      `
      <p>Please verify your account by clicking the link below:</p>
      <a href="${verifyURL}" style="color:#eab308;">Verify Email</a>
      `
    );

    return res.json({ message: "Verification email resent successfully." });

  } catch (err) {
    console.error("RESEND VERIFICATION ERROR:", err);
    return res.status(500).json({ ERROR: "Server error" });
  }
}



// LOGIN
async function login(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!password || (!email && !username)) {
      return res.status(400).json({ ERROR: "Missing credentials" });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email || "" },
          { username: username || "" }
        ]
      }
    });

    if (!user) return res.status(400).json({ ERROR: "User not found" });

    if (!user.emailVerified)
      return res.status(403).json({ ERROR: "Email not verified" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ ERROR: "Incorrect password" });

    const token = createToken({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    return res.json({ token });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return res.status(500).json({ ERROR: "Server error" });
  }
}



// FORGOT PASSWORD
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ ERROR: "User not found" });

    const resetToken = createToken({ userId: user.id }, "15m");

    const resetURL = `${process.env.FRONTEND_SERVER_URL}/reset-password?token=${resetToken}`;

    await sendEmail(
      email,
      "Reset Password - ArtisanBazaar",
      `
      <p>Click below to reset your password:</p>
      <a href="${resetURL}" style="color:#eab308;">Reset Password</a>
      `
    );

    return res.json({ message: "Password reset email sent" });

  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);
    return res.status(500).json({ ERROR: "Server error" });
  }
}



// RESET PASSWORD
async function resetPassword(req, res) {
  try {
    const { token, password, confirm_password } = req.body;

    if (!token || !password)
      return res.status(400).json({ ERROR: "Missing data" });

    if (password !== confirm_password)
      return res.status(400).json({ ERROR: "Passwords do not match" });

    const decoded = verifyToken(token);

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { id: decoded.userId },
      data: { password: hashed }
    });

    return res.json({ message: "Password reset successfully" });

  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    return res.status(400).json({ ERROR: "Invalid or expired token" });
  }
}

// GET PROFILE
async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        gender: true,
        createdAt: true,
      }
    });

    return res.json({ user });

  } catch (err) {
    console.error("GET ME ERROR:", err);
    return res.status(500).json({ ERROR: "Server error" });
  }
}


module.exports = {
  register,
  login,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getMe,
};
