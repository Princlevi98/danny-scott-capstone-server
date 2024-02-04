const express = require("express");
const router = express.Router();

const {
  index,
  newItem,
  findItem,
  edit,
  remove,
  reduceStockQuantity,
} = require("../controllers/stock-controller");

// const {
//   validateStockId,
//   validateItemBody,
// } = require("../middleware/validation-middleware");

router.route("/").get(index).post(newItem);
router.route("/:stockId").get(findItem).put(edit).delete(remove);
router.route("/:locationId/stock/:itemId/reduce").put(reduceStockQuantity);

module.exports = router;
