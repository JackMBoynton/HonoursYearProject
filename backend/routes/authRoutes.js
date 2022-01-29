const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

// Signup Routes
router.post("/auth/signup", authController.signupPost);

// Login routes
router.post("/auth/login", authController.loginPost);

// Log out route
router.get("/auth/logout", authController.logoutGet);

// Check Auth Route
router.get("/auth/user/isAuthed", authController.isAuthedGet);

module.exports = router;
