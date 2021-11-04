const { Router } = require("express");
const router = Router();
const showController = require("../controllers/showController");

router.post("/shows/search", showController.showSearchPost);

module.exports = router;
