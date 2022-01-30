const { Router } = require("express");
const router = Router();
const collectionController = require("../controllers/collectionController");

// Routes
// This route will take a userID in the form of a POST variable

/* #########################
   #     Movies Section    #
   ######################### */

router.post(
  "/collections/movies/watched",
  collectionController.getUserMoviesWatchedCollection
);

// Same with this route - this is to avoid passing sensitive IDs in URLs
router.post(
  "/collections/movies/watching",
  collectionController.getUserMoviesWatchingCollection
);

router.put(
  "/collections/movies/watching/update",
  collectionController.updateUserMoviesWatchingCollection
);

router.put(
  "/collections/movies/watched/update",
  collectionController.updateUserMoviesWatchedCollection
);

/* #########################
   #     Movies Section    #
   ######################### */

router.post(
  "/collections/shows/watched",
  collectionController.getUserShowsWatchedCollection
);

// Same with this route - this is to avoid passing sensitive IDs in URLs
router.post(
  "/collections/shows/watching",
  collectionController.getUserShowsWatchingCollection
);

router.put(
  "/collections/shows/watching/update",
  collectionController.updateUserShowsWatchingCollection
);

router.put(
  "/collections/shows/watched/update",
  collectionController.updateUserShowsWatchedCollection
);

module.exports = router;
