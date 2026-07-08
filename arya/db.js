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

module.exports = {
  getUserById
};
