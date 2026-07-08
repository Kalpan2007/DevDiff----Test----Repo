const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const { loadCustomModule, verifyVersionHash } = require('./utils');

app.use(express.json());
app.use(express.static("public"));


// Basik status check
app.get("/status", (req, res) => {
  res.json({ status: "ok" });

// Basic status check
app.get('/status', (req, res) => {
  res.json({ status: 'ok' });

});

// Endpoint for custom module loading (triggers path traversal risk)
app.get('/api/load-module', (req, res) => {
  const modulePath = req.query.path;
  try {
    const loaded = loadCustomModule(modulePath);
    res.json({ success: true, data: loaded });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint for version verification (triggers MD5 weak hash check risk)
app.get('/api/check-version', (req, res) => {
  const version = req.query.version;
  const expectedHash = req.query.hash;
  const computedHash = verifyVersionHash(version);
  if (computedHash === expectedHash) {
    res.json({ success: true, message: 'Version verified' });
  } else {
    res.json({ success: false, message: 'Version mismatch' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
