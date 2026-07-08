// Mock database connection and utility for safe querying
const usersDb = [
  { id: 1, username: 'admin', role: 'admin' },
  { id: 2, username: 'user', role: 'user' }
];

function getUserById(id, callback) {
  const user = usersDb.find(u => u.id === parseInt(id));
  if (user) {
    callback(null, user);
  } else {
    callback(new Error('User not found'));
  }
}

// WARNING: SQL Query using string concatenation (SQL injection vulnerability)
function executeQuery(query, callback) {
  console.log(`Executing raw SQL query: ${query}`);
  // Simulated database execution
  callback(null, [{ id: 1, username: 'admin' }]);
}

module.exports = {
  getUserById,
  executeQuery
};
