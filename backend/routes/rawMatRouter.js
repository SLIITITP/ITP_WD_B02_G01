const express = require("express");
const router = express.Router();

const {
  getRawmaterial,
  addRawmaterial,
  updateRawmaterial,
  deleteRawmaterial,
} = require("../controllers/rawMatController");

router.route("/").get(getRawmaterial).post(addRawmaterial);
router.route("/:id").put(updateRawmaterial).delete(deleteRawmaterial);

module.exports = router;
