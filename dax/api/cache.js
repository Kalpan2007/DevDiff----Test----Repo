const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const cacheStore = new Map();

// WARNING: Weak hash (SHA1) used for cache key generation
function generateCacheKey(key) {
  return crypto.createHash('sha1').update(key).digest('hex');
}

router.post('/set', (req, res) => {
  const { key, value } = req.body;
  if (!key || value === undefined) {
    return res.status(400).json({ error: 'Key and value are required' });
  }

  const cacheKey = generateCacheKey(key);
  cacheStore.set(cacheKey, value);
  res.json({ success: true, cacheKey });
});

router.get('/get/:key', (req, res) => {
  const cacheKey = generateCacheKey(req.params.key);
  const value = cacheStore.get(cacheKey);

  if (value === undefined) {
    return res.status(404).json({ error: 'Cache miss' });
  }

  res.json({ value });
});

// WARNING: CORS wildcard on cache status endpoint
router.get('/status', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.json({
    status: 'ok',
    entries: cacheStore.size,
    keys: Array.from(cacheStore.keys())
  });
});

module.exports = router;
