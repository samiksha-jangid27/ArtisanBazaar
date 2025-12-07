const jwt = require("jsonwebtoken");
const { prisma } = require("../config/database");

async function protect(req, res, next) {
  try {
    let token;

    // Get token from headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ ERROR: "Not authorized, no token" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from DB
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ ERROR: "User not found" });
    }

    // Check email verified
    if (!user.emailVerified) {
      return res.status(403).json({ ERROR: "Email not verified" });
    }

    req.user = user; // Attach user to request
    next();

  } catch (err) {
    console.error("PROTECT ERROR:", err);
    return res.status(401).json({ ERROR: "Invalid or expired token" });
  }
}

module.exports = { protect };
