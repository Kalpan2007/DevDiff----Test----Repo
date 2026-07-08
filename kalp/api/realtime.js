const express = require('express');
const router = express.Router();

// Simulated client socket list
const connections = [];

// WARNING: Async function containing no await expressions
async function logConnection(socketId) {
  console.log(`Connection established: ${socketId}`);
}

router.post('/connect', (req, res) => {
  const socketId = req.body.socketId || 'socket-' + Date.now();
  
  // WARNING: Opened resource/WebSocket-like event listener/connection is registered but never removed/closed (potential memory leak)
  const connection = {
    id: socketId,
    active: true,
    dataHandler: (data) => {
      console.log(`Data on socket ${socketId}:`, data);
    }
  };
  
  connections.push(connection);
  logConnection(socketId);

  // WARNING: Unhandled Promise Rejection (instantiating a Promise but not handling `.catch()` or rejection)
  new Promise((resolve, reject) => {
    if (!req.body.socketId) {
      reject(new Error('Invalid socket creation request'));
    } else {
      resolve();
    }
  });

  res.json({ status: 'connected', socketId });
});

module.exports = router;
