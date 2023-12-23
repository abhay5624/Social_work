const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth_controller")
const signupSchema = require("../validators/auth_validator")
const validate = require("../middleware/validate_middleware");
const LoginSchema = require("../validators/login_validation");
const authMiddleware = require("../middleware/authMiddleware");
const profileMiddleware = require("../middleware/profileMiddleware")
const postMiddleware = require("../middleware/postMiddleware")
router.route("/").get(authController.home);
router.route("/register").post(validate(signupSchema),authController.register_post);
router.route("/login").post(validate(LoginSchema),authController.Login_Post);
router.route("/profile").post(authController.profileAdd);
router.route("/profile").get(profileMiddleware,authController.ProfileGet);
router.route("/user").get(authMiddleware, authController.user);
router.route("/post").post( postMiddleware,authController.userPosts);
router.route("/post").get(postMiddleware,authController.GetProfile);
router.route("/posts").get(postMiddleware,authController.GetAllPost);
router.route("/poststreams").get(authController.GetAllPostByStream);
router.route("/searchPerson").get(authController.SearchPersonHandle);
router.route("/searchPost").get(authController.SearchPostHandle);
router.route("/post").delete(postMiddleware,authController.PostDelete);
router.route("/post").put(postMiddleware,authController.updatePost);
router.route("/postById").get(postMiddleware,authController.SearchPostById);
router.route("/postByDate").get(postMiddleware,authController.searchPostByDate)
module.exports = router;