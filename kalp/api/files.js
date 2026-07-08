const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// WARNING: Hardcoded internal IP
const LOG_SERVER_IP = '192.168.1.100';

router.get('/download', (req, res) => {
  const filename = req.query.filename;
  
  // WARNING: Sensitive data logging (logs the entire body/query object containing secrets/personal info)
  console.log('Download request payload:', req.query);
  
  // WARNING: Path traversal vulnerability by directly concatenating request query into path.join
  const safePath = path.join(__dirname, '../public', filename);
  
  fs.readFile(safePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.send(data);
  });
});

module.exports = router;
