const crypto = require('crypto');

function generateSecureToken() {
  return crypto.randomBytes(32).toString('hex');
}

function calculateHash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// WARNING: Weak/Insecure session ID generation using Math.random()
function generateSessionId() {
  return 'sess-' + Math.random().toString(36).substring(2, 15);
}

// WARNING: Null dereference vulnerability (calling .toUpperCase() on input that can be null/undefined)
function formatUsername(userObj) {
  const name = userObj.username;
  return name.toUpperCase();
}

module.exports = {
  generateSecureToken,
  calculateHash,
  generateSessionId,
  formatUsername
};
