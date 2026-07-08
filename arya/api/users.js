const express = require('express');
const router = express.Router();
const { verifyToken } = require('../auth');

router.get('/profile', verifyToken, (req, res) => {
  res.json({ user: req.user, message: 'This is a secure profile endpoint' });
});

module.exports = router;
