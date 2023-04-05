const db = require("../config/db");

const getUserById = async (id) => {
  return await db`SELECT * FROM users WHERE id = ${id}`;
};

module.exports = { getUserById };
