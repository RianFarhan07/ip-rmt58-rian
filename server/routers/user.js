const express = require("express");
const UserController = require("../controllers/UserController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/updateProfile", authentication, UserController.updateProfile);
router.post("/login", UserController.login);

module.exports = router;
