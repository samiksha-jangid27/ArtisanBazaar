const jwt = require("jsonwebtoken");

function createToken(payload, expiresIn = "7d") {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
}

function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = { createToken, verifyToken };
