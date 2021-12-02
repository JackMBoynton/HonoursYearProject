const { Router } = require("express");
const router = Router();
const collectionController = require("../controllers/collectionController");

// Routes
// This route will take a userID in the form of a POST variable
router.post(
  "/collections/watched",
  collectionController.getUserWatchedCollection
);

// Same with this route - this is to avoid passing sensitive IDs in URLs
router.post(
  "/collections/watching",
  collectionController.getUserWatchingCollection
);

router.put(
  "/collections/watched/update/add",
  collectionController.updateUserWatchedCollection
);

router.put(
  "/collections/watching/update/add",
  collectionController.updateUserWatchingCollection
);

router.put(
  "/collections/watched/update/remove",
  collectionController.updateUserWatchedCollection
);

router.put(
  "/collections/watching/update/remove",
  collectionController.updateUserWatchingCollection
);

module.exports = router;
