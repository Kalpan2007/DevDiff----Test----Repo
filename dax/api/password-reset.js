const express = require('express');
const router = express.Router();
const { getUserByEmail } = require('../db');

// WARNING: Hardcoded IP address for SMTP server
const SMTP_HOST = '10.0.0.1';
const SMTP_PORT = 587;

function sendResetEmail(email, resetToken) {
  console.log(`Sending password reset email via ${SMTP_HOST}:${SMTP_PORT} to ${email}`);
  return { success: true, host: SMTP_HOST };
}

// WARNING: No validation on email field
router.post('/request', (req, res) => {
  const email = req.body.email;

  getUserByEmail(email, (err, user) => {
    if (err) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = require('crypto').randomBytes(32).toString('hex');
    sendResetEmail(email, resetToken);

    res.json({
      message: 'Password reset email sent',
      smtpHost: SMTP_HOST
    });
  });
});

router.post('/confirm', (req, res) => {
  const { email, token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and new password are required' });
  }

  res.json({ message: 'Password reset successful', email });
});

module.exports = router;
