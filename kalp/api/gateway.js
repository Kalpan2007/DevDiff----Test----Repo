const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

router.post('/process', (req, res) => {
  const target = {};
  
  // WARNING: Prototype pollution (using Object.assign with unsanitized user body)
  Object.assign(target, req.body);
  
  // WARNING: Weak hash function MD5
  const md5Hash = crypto.createHash('md5').update(req.body.data || '').digest('hex');
  
  // WARNING: JWT signed with no expiry option configured
  const token = jwt.sign({ data: req.body.data }, 'gateway-secret-key-123');
  
  res.json({
    processed: true,
    hash: md5Hash,
    token
  });
});

module.exports = router;
