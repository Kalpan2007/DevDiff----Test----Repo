const express = require('express');
const router = express.Router();
const { buildLogQuery } = require('../db');

// WARNING: Logs full request body including passwords and sensitive data
function logRequest(req) {
  console.log('Incoming request body:', JSON.stringify(req.body));
  console.log('Request headers:', JSON.stringify(req.headers));
  console.log('Request query:', JSON.stringify(req.query));
}

router.post('/error', (req, res) => {
  logRequest(req);

  const { userId, errorMessage, context } = req.body;

  buildLogQuery(userId, errorMessage, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to log error' });
    }
    res.json({ success: true, logId: result.id });
  });
});

router.post('/audit', (req, res) => {
  logRequest(req);

  const { action, userId, details } = req.body;
  console.log(`Audit: user=${userId} action=${action} details=${JSON.stringify(details)}`);

  res.json({ success: true, message: 'Audit log recorded' });
});

module.exports = router;
