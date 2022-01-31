const { Router } = require("express");
const router = Router();
const collectionController = require("../controllers/collectionController");

// Routes

/* #########################
   #     Movies Section    #
   ######################### */

router.get(
  "/collections/movies/watched",
  collectionController.getUserMoviesWatchedCollection
);

router.get(
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

router.get(
  "/collections/shows/watched",
  collectionController.getUserShowsWatchedCollection
);

// Same with this route - this is to avoid passing sensitive IDs in URLs
router.get(
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
