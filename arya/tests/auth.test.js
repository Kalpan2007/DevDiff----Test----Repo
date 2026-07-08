const assert = require('assert');
const jwt = require('jsonwebtoken');
const { verifyToken } = require('../auth');

// Setup environment secret for the test
process.env.JWT_SECRET = 'test-secret-key-12345';

console.log('Running auth unit tests...');

// Test 1: Access denied when Authorization header is missing
{
  const req = {
    headers: {}
  };

  let responseStatus = 0;
  let jsonResponse = null;

  const res = {
    status(code) {
      responseStatus = code;
      return {
        json(data) {
          jsonResponse = data;
        }
      };
    }
  };

  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  verifyToken(req, res, next);

  assert.strictEqual(responseStatus, 401, 'Should return 401 when Authorization header is missing');
  assert.deepStrictEqual(jsonResponse, { error: 'Access denied' }, 'Should return Access denied error');
  assert.strictEqual(nextCalled, false, 'next() should not be called');
  console.log('✔ Test 1 passed: Missing auth header handled correctly');
}

// Test 2: Invalid token returns 400
{
  const req = {
    headers: {
      authorization: 'Bearer invalid-token-string'
    }
  };

  let responseStatus = 0;
  let jsonResponse = null;

  const res = {
    status(code) {
      responseStatus = code;
      return {
        json(data) {
          jsonResponse = data;
        }
      };
    }
  };

  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  verifyToken(req, res, next);

  assert.strictEqual(responseStatus, 400, 'Should return 400 when token is invalid');
  assert.deepStrictEqual(jsonResponse, { error: 'Invalid token' }, 'Should return Invalid token error');
  assert.strictEqual(nextCalled, false, 'next() should not be called');
  console.log('✔ Test 2 passed: Invalid token handled correctly');
}

// Test 3: Valid token calls next() and attaches user payload
{
  const payload = { userId: 42, role: 'admin' };
  const validToken = jwt.sign(payload, process.env.JWT_SECRET);

  const req = {
    headers: {
      authorization: `Bearer ${validToken}`
    }
  };

  let responseStatus = 0;
  const res = {
    status(code) {
      responseStatus = code;
      return {
        json() {}
      };
    }
  };

  let nextCalled = false;
  const next = () => {
    nextCalled = true;
  };

  verifyToken(req, res, next);

  assert.strictEqual(responseStatus, 0, 'Should not set error status code');
  assert.strictEqual(nextCalled, true, 'next() should be called');
  assert.strictEqual(req.user.userId, payload.userId, 'req.user should contain userId');
  assert.strictEqual(req.user.role, payload.role, 'req.user should contain role');
  console.log('✔ Test 3 passed: Valid token verified correctly');
}

console.log('All auth unit tests passed successfully!');
