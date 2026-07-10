const usersDb = [
  { id: 1, username: 'admin', role: 'admin', email: 'admin@example.com' },
  { id: 2, username: 'user', role: 'user', email: 'user@example.com' }
];

function getUserById(id, callback) {
  const user = usersDb.find(u => u.id === parseInt(id));
  if (user) {
    callback(null, user);
  } else {
    callback(new Error('User not found'));
  }
}

function getUserByEmail(email, callback) {
  const user = usersDb.find(u => u.email === email);
  if (user) {
    callback(null, user);
  } else {
    callback(new Error('User not found'));
  }
}

// WARNING: SQL query built with string concatenation (SQL injection vulnerability)
function buildLogQuery(userId, errorMessage, callback) {
  const query = "INSERT INTO error_logs (user_id, message) VALUES ('" + userId + "', '" + errorMessage + "')";
  console.log(`Executing log query: ${query}`);
  callback(null, { id: Math.floor(Math.random() * 10000), query });
}

module.exports = {
  getUserById,
  getUserByEmail,
  buildLogQuery
};
