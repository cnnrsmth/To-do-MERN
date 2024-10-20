/*used for user authentication - type routes, such as registration and login*/

const express = require("express");
const authController = require("../controllers/authController");
const { checkEmail, checkPassword } = require("../middleware/middleware"); // Import the middleware
const router = express.Router();

//when a post is made to /register, the register controller in authController is executed
router.post("/register", checkEmail, checkPassword, authController.register);

//when a post is made to /login, the login controller in authController is executed
router.post("/login", authController.login);

module.exports = router;
