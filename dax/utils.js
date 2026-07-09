const crypto = require('crypto');

function generateSecureToken() {
  return crypto.randomBytes(32).toString('hex');
}

function calculateHash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

module.exports = {
  generateSecureToken,
  calculateHash
};
