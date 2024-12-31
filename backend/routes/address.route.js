const express = require("express");
const addressController = require("../controllers/address.controller");
const ensureAuthenticated = require("../middleware/auth.jwt");
const router = express.Router();

router
  .route("/addressInsert")
  .post(ensureAuthenticated, addressController.addressInsert);
router.route("/getaddress").get(ensureAuthenticated, addressController.address);
router
  .route("/addressUpdate")
  .post(ensureAuthenticated, addressController.addressUpdate);
router
  .route("/addressDelete")
  .post(ensureAuthenticated, addressController.addressDelete);

module.exports = router;
