const { getUIDViaToken } = require("./authController");

const WatchedList = require("../models/WatchedList");
const WatchList = require("../models/WatchList");

// Error handling
const handleErrors = (err) => {
  let errors = { message: "" };

  // Incorrect email address
  if (err.message.includes("Movie ID already present")) {
    errors.message = "Insert into collection failed due to duplicate Movie ID";
  }

  // Incorrect password
  if (err.message.includes("User ID")) {
    errors.message = "There is an error with user authentication";
  }

  return errors;
};

// Find users Watched Collection
module.exports.getUserWatchedCollection = async (req, res) => {
  try {
    // get our jwt from the request
    const jwt = req.body.jwt;

    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);

    // supply the user id to our method in WatchedList model to get WatchedList collection
    var watchedList = await WatchedList.findUserWatched(userID);
    watchedList = {
      "Watched": watchedList.watchedCollection,
    };

    res.status(200).json({ "WatchedList": watchedList });
  } catch (error) {
    error = handleErrors(error);
    res.status(400).json({ "Error": error.message });
  }
};

// Find users Watching Collection
module.exports.getUserWatchingCollection = async (req, res) => {
  try {
    // get our jwt from the request
    const jwt = req.body.jwt;

    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);

    // supply the user id to our method in WatchedList model to get WatchedList collection
    var watchList = await WatchList.findUserWatchlist(userID);

    watchList = {
      "Watching": watchList.watchCollection,
    };

    res.status(200).json({ "WatchList": watchList });
  } catch (error) {
    error = handleErrors(error);
    res.status(400).json({ "Error": error.message });
  }
};

// Updates the users Watched Collection
module.exports.updateUserWatchedCollection = async (req, res) => {
  // get our jwt from the request
  const { jwt, movieID, type } = req.body;

  try {
    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);
    const newCollection = await WatchedList.updateUserWatched(
      userID,
      movieID,
      type
    );
    res.status(200).json({ "Collection": newCollection });
  } catch (error) {
    error = handleErrors(error);
    res.status(400).json({
      "Error": error.message,
    });
  }
};

// Updates the users Watching Collection
module.exports.updateUserWatchingCollection = async (req, res) => {
  // get our jwt from the request
  const { jwt, movieID, type } = req.body;

  try {
    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);
    const newCollection = await WatchList.updateUserWatchlist(
      userID,
      movieID,
      type
    );
    res.status(200).json({ "Collection": newCollection });
  } catch (error) {
    error = handleErrors(error);
    res.status(400).json({
      "Error": error.message,
    });
  }
};
