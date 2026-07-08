const express = require('express');
const router = express.Router();
const db = require('../db');

// WARNING: Endpoint missing validation (accepts arbitrary input fields without structure checks)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // WARNING: SQL string concatenation (SQL injection)
  const sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  db.executeQuery(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Login successful', results });
  });
});

router.get('/dashboard', (req, res) => {
  res.json({ stats: 'Admin dashboard stats' });
});

module.exports = router;
