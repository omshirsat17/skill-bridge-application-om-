const { verifyToken } = require("../utils/jwt");

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization || "";

  if (!authHeader) {
    return null;
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  return token.trim().replace(/^["']|["']$/g, "");
};

const protect = (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (token) {
    try {
      const decoded = verifyToken(token);

      req.user = decoded;

      return next();

    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, invalid token"
      });
    }
  }

  return res.status(401).json({
    message: "Not authorized, no token"
  });
};

module.exports = protect;
