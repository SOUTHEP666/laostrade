const db = require('../config/db');

const createUser = async (username, hashedPassword) => {
  const [rows] = await db.execute(
    'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
    [username, hashedPassword, 'user']
  );
  return rows;
};

const findUserByUsername = async (username) => {
  const [rows] = await db.execute(
    'SELECT * FROM users WHERE username = ?',
    [username]
  );
  return rows[0];
};

module.exports = { createUser, findUserByUsername };
