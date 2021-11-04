const { Router } = require("express");
const router = Router();
const movieController = require("../controllers/movieController");

router.post("/movies/search", movieController.movieSearchPost);

module.exports = router;
