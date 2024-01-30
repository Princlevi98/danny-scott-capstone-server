const express = require("express");
const router = express.Router();

const {
  index,
  newItem,
  findItem,
  edit,
  remove,
} = require("../controllers/stock-controller");

const {
  validateStockId,
  validateItemBody,
} = require("../middleware/validation-middleware");

router.route("/").get(index).post(validateItemBody, newItem);

router.use("/:stockId", validateStockId);
router
  .route("/:stockId")
  .get(findItem)
  .put(validateItemBody, edit)
  .delete(remove);

module.exports = router;
