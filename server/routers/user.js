const express = require("express");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/login", UserController.login);
router.post("/login/google", UserController.googleLogin);
router.post("/register", UserController.register);
router.get("/profile", authentication, UserController.getProfile);
router.put("/profile", authentication, UserController.updateProfile);

module.exports = router;
