const path = require("path");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: path.join(__dirname, "..", ".env"), quiet: true });

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
};

const signToken = (payload, options = {}) => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "1d",
    ...options,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};

module.exports = {
  signToken,
  verifyToken,
};
