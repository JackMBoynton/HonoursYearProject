const jwt = require("jsonwebtoken");
require("dotenv/config");

const WatchedList = require("../models/WatchedList");
const WatchList = require("../models/WatchList");

// Error handling
const handleErrors = (err) => {
  let errors = { message: "" };

  // Incorrect email address
  if (err.message.includes("collection")) {
    errors.message = "There is an error in your collection";
  }

  // Incorrect password
  if (err.message.includes("id")) {
    errors.message = "There is an error with user authentication";
  }

  return errors;
};

// Function for getting the UserID for each of these methods via jwt
const getUIDViaToken = (token) => {
  var userID;

  try {
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) {
          throw Error("No User ID could be found from JWT");
        } else {
          userID = decodedToken.id;
        }
      });
    }
  } catch (error) {
    throw Error("No User ID could be found from JWT");
  }

  return userID;
};

// Find users Watched Collection
module.exports.getUserWatchedCollection = async (req, res) => {
  try {
    // get our jwt from the request
    const jwt = req.body.jwt;

    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);

    // supply the user id to our method in WatchedList model to get WatchedList collection
    const watchedList = WatchedList.findUserWatched(userID);

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
    const watchList = WatchList.findUserWatchlist(userID);

    res.status(200).json({ "Watchlist": watchList });
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
