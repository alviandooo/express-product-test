const { getProductById } = require("../models/product");
const {
  getAllTransactions,
  getTransactionById,
  createTransaction,
  updateTransaction,
} = require("../models/transaction");
const { getUserById } = require("../models/user");

const statusExp = [
  {
    id: 0,
    name: "SUCCESS",
  },
  {
    id: 1,
    name: "FAILED",
  },
];

const getAll = async (req, res) => {
  try {
    const { limit, page } = req.query;
    const data = await getAllTransactions({
      limit: limit,
      page: page,
    });
    res.status(200).json({
      status: true,
      message: "success",
      data: {
        data,
        status: statusExp,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(error?.statusCode ?? 500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getTransactionById(id);

    if (data.length < 1) {
      throw { statusCode: 400, message: "Data not found!" };
    }

    res.status(200).json({
      status: true,
      message: "success",
      data: {
        data,
        status: [
          {
            id: 0,
            name: "SUCCESS",
          },
          {
            id: 1,
            name: "FAILED",
          },
        ],
      },
    });
  } catch (error) {
    res.status(error?.statusCode ?? 500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};

const create = async (req, res) => {
  try {
    const { productId, customerId, status } = req.body;

    // check product is exist?
    const checkProduct = await getProductById(productId);
    if (checkProduct.length < 1) {
      throw { statusCode: 400, message: "Product ID not found!" };
    }

    // check user is exist?
    const checkUser = await getUserById(customerId);
    if (checkUser.length < 1) {
      throw { statusCode: 400, message: "User ID not found!" };
    }

    const create = await createTransaction({ productId, customerId, status });

    res.status(200).json({
      status: true,
      message: "success",
      data: {
        data: create,
        status: statusExp,
      },
    });
  } catch (error) {
    res.status(error?.statusCode ?? 500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, customerId, status, date } = req.body;

    // check transaction  is exist
    const transaction = await getTransactionById(id);
    if (transaction.length < 1) {
      throw { statusCode: 400, message: "Transaction ID not found!" };
    }

    // check product is exist?
    const checkProduct = await getProductById(productId);
    if (checkProduct.length < 1) {
      throw { statusCode: 400, message: "Product ID not found!" };
    }

    // check user is exist?
    const checkUser = await getUserById(customerId);
    if (checkUser.length < 1) {
      throw { statusCode: 400, message: "User ID not found!" };
    }

    // update data
    const update = await updateTransaction(id, {
      productId: productId || transaction?.[0]?.product_id,
      customerId: customerId || transaction?.[0]?.created_by_id,
      status: status || transaction?.[0]?.status,
      date: date || transaction?.[0]?.transactiondate,
    });

    res.status(200).json({
      status: true,
      message: "success",
      data: {
        data: update,
        status: statusExp,
      },
    });
  } catch (error) {
    res.status(error?.statusCode ?? 500).json({
      status: false,
      message: error?.message ?? error,
      data: [],
    });
  }
};

module.exports = { getAll, getById, create, update };
