const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth_controller")
router.route("/").get(authController.home);
router.route("/register").post(authController.register_post)
router.route("/register").get(authController.register);
 module.exports = router;