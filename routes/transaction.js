const router = require("express").Router();

const transactionController = require("../controllers/transactionController");
const transactionValidation = require("../middlewares/transactionValidation");

router.get("/", transactionController.getAll);
router.get("/:id", transactionController.getById);
router.post(
  "/",
  transactionValidation.validationCreate,
  transactionController.create
);
router.patch("/:id/update", transactionController.update);

module.exports = router;
