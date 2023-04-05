const db = require("../config/db");

const getAllTransactions = async (params) => {
  const { limit, page } = params;
  return await db`SELECT transactions.id as id, products.id as productID, products.name as productName, products.amount, users.name as customerName, transactions.status, transactions.date as transactionDate, users.id as createdBy, transactions.created_at as CreateOn FROM transactions LEFT JOIN products ON products.id = transactions.product_id LEFT JOIN users ON users.id = transactions.created_by_id ORDER BY transactions.date DESC LIMIT ${
    limit ?? null
  } OFFSET ${page ? limit * (page - 1) : 0}`;
};

const getTransactionById = async (id) => {
  return await db`SELECT transactions.id as id, products.id as productID, products.name as productName, products.amount, users.name as customerName, transactions.status, transactions.date as transactionDate, users.id as createdBy, transactions.created_at as CreateOn FROM transactions LEFT JOIN products ON products.id = transactions.product_id LEFT JOIN users ON users.id = transactions.created_by_id WHERE transactions.id = ${id}`;
};

const createTransaction = async (params) => {
  const { productId, customerId, status } = params;
  return await db`INSERT INTO transactions(product_id, created_by_id, date, created_at, updated_at, status) VALUES(${productId}, ${customerId}, ${new Date()}, ${new Date()}, ${new Date()}, ${status}) RETURNING *`;
};

const updateTransaction = async (id, params) => {
  const { productId, customerId, status, date } = params;
  return await db`UPDATE transactions SET "product_id" = ${productId}, "created_by_id" = ${customerId}, "status" = ${status}, "date" = ${date}, "updated_at"=${new Date()} WHERE "id" = ${id} RETURNING *`;
};

module.exports = {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
};
