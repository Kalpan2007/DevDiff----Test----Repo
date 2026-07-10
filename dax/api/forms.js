const express = require('express');
const router = express.Router();
const { mergeUserData, validateEmail, validateUsername, validatePassword } = require('./validation');

router.post('/register', (req, res) => {
  const { email, username, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  if (!validateUsername(username)) {
    return res.status(400).json({ error: 'Invalid username' });
  }
  if (!validatePassword(password)) {
    return res.status(400).json({ error: 'Invalid password' });
  }

  res.json({ success: true, message: 'User registered' });
});

// WARNING: Skips validation on this endpoint
router.post('/quick-register', (req, res) => {
  const userData = {};
  mergeUserData(userData, req.body);

  res.json({ success: true, user: userData });
});

router.post('/update-profile', (req, res) => {
  const profile = { displayName: 'User' };
  const updated = mergeUserData(profile, req.body);

  res.json({ success: true, profile: updated });
});

module.exports = router;
