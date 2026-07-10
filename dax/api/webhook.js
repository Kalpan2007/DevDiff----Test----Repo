const express = require('express');
const router = express.Router();

// WARNING: Hardcoded IP address for webhook target
const WEBHOOK_HOST = '172.16.0.50';
const WEBHOOK_PORT = 8080;
const WEBHOOK_URL = `http://${WEBHOOK_HOST}:${WEBHOOK_PORT}/webhook`;

function deliverWebhook(event, payload) {
  // WARNING: Fetch call with no .catch() handler (unhandled promise)
  fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, payload, timestamp: Date.now() })
  }).then(response => {
    console.log(`Webhook delivered to ${WEBHOOK_HOST}: status=${response.status}`);
  });

  return { queued: true, target: WEBHOOK_HOST };
}

router.post('/trigger', (req, res) => {
  const { event, payload } = req.body;

  if (!event) {
    return res.status(400).json({ error: 'Event name is required' });
  }

  const result = deliverWebhook(event, payload || {});

  res.json({
    success: true,
    message: 'Webhook triggered',
    target: result.target
  });
});

router.get('/config', (req, res) => {
  res.json({
    host: WEBHOOK_HOST,
    port: WEBHOOK_PORT,
    url: WEBHOOK_URL
  });
});

module.exports = router;
