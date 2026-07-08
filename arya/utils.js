const crypto = require("crypto");

const path = require('path');

function generateSecureToken() {
  return crypto.randomBytes(32).toString("hex");
}

function calculateHash(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

// WARNING: Path traversal vulnerability in custom module loader
function loadCustomModule(modulePath) {
  const fullPath = path.join(__dirname, modulePath);
  return require(fullPath);
}

// WARNING: Weak cryptographic hash (MD5) used for version verification check
function verifyVersionHash(versionString) {
  return crypto.createHash('md5').update(versionString).digest('hex');
}

module.exports = {
  generateSecureToken,
  calculateHash,

  loadCustomModule,
  verifyVersionHash

};
