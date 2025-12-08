const cors = require("cors");
require("dotenv").config();

// Explicit allowed origins
const allowedOrigins = [
  "http://localhost:3000", // local dev
  process.env.FRONTEND_SERVER_URL, // your production frontend
];

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow server-to-server or tools (like Postman) with no origin
    if (!origin) return callback(null, true);

    // Allow explicitly listed origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Allow ALL Vercel preview URLs (*.vercel.app)
    if (/\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    // Block everything else
    console.warn("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

module.exports = cors(corsOptions);
