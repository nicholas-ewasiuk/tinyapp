const { users, urlDatabase } = require('../models/database.js');

function generateRandomString() {
  return (Math.random() * 1e+18).toString(36).slice(0, 6);
};

function findUserByEmail(email) {
  for (let key in users) {
    if (users[key]['email'] === email) {
      return key;
    }
  }
};

module.exports = {
  generateRandomString,
  findUserByEmail
};