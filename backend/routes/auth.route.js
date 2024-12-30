const express = require("express");
const userController = require("../controllers/auth.controller");
const router = express.Router();

router.route("/signup").post(userController.signup);
router.route("/signin").post(userController.signin);

module.exports = router;
