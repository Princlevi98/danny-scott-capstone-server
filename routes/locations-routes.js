const express = require("express");
const router = express.Router();
const {
  index,
  createNew,
  findLocation,
  edit,
  stock,
  remove,
} = require("../controller");
// const {
//   validateLocationBody,
//   validateLocationId,
// } = require("../middleware/validation-middleware");

router.route("/").get(index).post(validateLocationBody, createNew);

router.use("/:locationId", validateLocationId);
router
  .route("/:locationId")
  .get(findLocation)
  .put(validateLocationBody, edit)
  .delete(remove);

router.route("/:locationId/stock").get(stock);

module.exports = router;
