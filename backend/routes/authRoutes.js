const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

// Signup Routes
router.post("/signup", authController.signupPost);

// Login routes
router.post("/login", authController.loginPost);

// Log out route
router.get("/logout", authController.logoutGet);

module.exports = router;
