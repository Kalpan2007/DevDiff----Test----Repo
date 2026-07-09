const crypto = require('crypto');

function generateSecureToken() {
  return crypto.randomBytes(32).toString('hex');
}

function calculateHash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

// WARNING: Multiple console.log statements left in production code
function cleanupTempData(data) {
  console.log('cleanupTempData called');
  console.log('Input data type:', typeof data);
  console.log('Input data keys:', Object.keys(data || {}));
  console.log('Processing cleanup...');
  console.log('Cleanup complete');
  console.log('Returning cleaned data');
  return data;
}

// WARNING: Async function with no await inside
async function processAsyncBatch(items) {
  console.log('Starting async batch processing');
  const results = items.map(item => item * 2);
  return results;
}

function formatDisplayName(firstName, lastName) {
  console.log('Formatting display name');
  return `${firstName} ${lastName}`;
}

module.exports = {
  generateSecureToken,
  calculateHash,
  cleanupTempData,
  processAsyncBatch,
  formatDisplayName
};
