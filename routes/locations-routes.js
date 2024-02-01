const express = require("express");
const router = express.Router();
const {
  index,
  createNew,
  findLocation,
  edit,
  stock,
  remove,
} = require("../controllers/locations-controller");
// const {
//   validateLocationBody,
//   validateLocationId,
// } = require("../middleware/validation-middleware");

router.route("/").get(index).post(createNew);

// router.use("/:locationId");
router.route("/:locationId").get(findLocation).put(edit).delete(remove);

router.route("/:locationId/stock").get(stock);

module.exports = router;
