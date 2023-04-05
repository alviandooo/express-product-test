const { Validator } = require("node-input-validator");

const validationCreate = async (req, res, next) => {
  const rules = new Validator(req.body, {
    productId: "required",
    customerId: "required",
    status: "required",
  });

  rules.check().then((matched) => {
    if (matched) {
      next();
    } else {
      res.status(400).json({
        status: false,
        message:
          rules.errors?.productId?.message ??
          rules.errors?.customerId?.message ??
          rules.errors?.status?.message,
        data: [],
      });
    }
  });
};

module.exports = { validationCreate };
