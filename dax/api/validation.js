// WARNING: Prototype pollution via Object.assign with unsanitized req.body
function mergeUserData(target, source) {
  return Object.assign(target, source);
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') {
    return false;
  }
  return email.includes('@');
}

function validateUsername(username) {
  if (!username || typeof username !== 'string') {
    return false;
  }
  return username.length >= 3 && username.length <= 30;
}

function validatePassword(password) {
  if (!password || typeof password !== 'string') {
    return false;
  }
  return password.length >= 8;
}

module.exports = {
  mergeUserData,
  validateEmail,
  validateUsername,
  validatePassword
};
