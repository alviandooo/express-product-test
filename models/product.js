const db = require("../config/db");

const getProductById = async (id) => {
  return await db`SELECT * FROM products WHERE id = ${id}`;
};

module.exports = { getProductById };
