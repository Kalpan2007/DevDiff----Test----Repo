const jwt = require("jsonwebtoken");

// Tokin verification helper
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback-secure-env-secret-12345",
    );
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token" });
  }
}

module.exports = {
  verifyToken,
};
