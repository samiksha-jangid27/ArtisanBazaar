const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,          
      email: user.email,
      username: user.username,
      role: user.role,
      isVerified: user.isVerified, 
    },
    SECRET,
    { expiresIn: EXPIRES_IN }
  );
}

module.exports = generateToken;
