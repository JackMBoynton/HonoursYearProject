const { Router } = require("express");
const router = Router();
const preferenceController = require("../controllers/preferenceController");

// POST Route for posting initial User preferences
router.put("/user/preferences/set", preferenceController.setUserPreferences);

// POST Route for posting user ID to return User preferences for that user
router.get("/user/preferences/get", preferenceController.getUserPreferences);

module.exports = router;
