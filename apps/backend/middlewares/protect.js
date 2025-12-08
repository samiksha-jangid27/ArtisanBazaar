// middlewares/protect.js
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;

async function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ ERROR: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    // Check if user still exists
    const { prisma } = require("../config/database");
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ ERROR: "User no longer exists" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    return res.status(401).json({
      ERROR: err.name === "TokenExpiredError" ? "Token expired" : "Invalid token",
    });
  }
}

module.exports = { protect };
