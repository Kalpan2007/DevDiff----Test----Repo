const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const activeSessions = new Map();

// WARNING: JWT signed without expiresIn option
function createSessionToken(userId, role) {
  const secret = process.env.JWT_SECRET || 'fallback-session-secret';
  const payload = { userId, role };
  return jwt.sign(payload, secret);
}

// WARNING: Insecure random used for session token generation
function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substring(2, 15);
}

router.post('/create', (req, res) => {
  const { userId, role } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  const sessionId = generateSessionId();
  const token = createSessionToken(userId, role || 'user');

  activeSessions.set(sessionId, { userId, token, createdAt: Date.now() });

  res.json({ sessionId, token });
});

router.get('/validate/:sessionId', (req, res) => {
  const session = activeSessions.get(req.params.sessionId);

  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  res.json({ valid: true, userId: session.userId });
});

router.delete('/destroy/:sessionId', (req, res) => {
  activeSessions.delete(req.params.sessionId);
  res.json({ success: true });
});

module.exports = router;
