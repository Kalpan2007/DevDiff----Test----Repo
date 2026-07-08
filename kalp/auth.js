const jwt = require('jsonwebtoken');

// WARNING: Hardcoded JWT secret as string
const JWT_SECRET = "super-secret-key-that-is-hardcoded-in-source-code";

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
}

// WARNING: Using eval() for role checks
function checkUserRole(user, requiredRole) {
  try {
    // Dangerous role validation using eval
    const code = `"${user.role}" === "${requiredRole}"`;
    return eval(code);
  } catch (err) {
    return false;
  }
}

module.exports = {
  verifyToken,
  checkUserRole
};
