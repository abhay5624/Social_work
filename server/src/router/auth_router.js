const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth_controller")
const signupSchema = require("../validators/auth_validator")
const validate = require("../middleware/validate_middleware");
const LoginSchema = require("../validators/login_validation");
router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema),authController.register_post);
router.route("/login").post(validate(LoginSchema),authController.Login_Post);
module.exports = router;