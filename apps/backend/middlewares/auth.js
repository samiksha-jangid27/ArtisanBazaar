const { verifyToken } = require("../utils/generateTokens");

function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ ERROR: "No token provided" });
    }

    const token = header.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({ ERROR: "Invalid or expired token" });
    }
}

function requireRole(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ ERROR: "Not authorized" });
        }
        next();
    };
}

module.exports = { auth, requireRole };
