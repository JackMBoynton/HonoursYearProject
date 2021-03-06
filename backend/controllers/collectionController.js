const { getUIDViaToken } = require("./authController");
const movieController = require("./movieController");

const ShowWatchedList = require("../models/ShowWatchedList");
const ShowWatchList = require("../models/ShowWatchList");
const MovieWatchedList = require("../models/MovieWatchedList");
const MovieWatchList = require("../models/MovieWatchList");

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

/* #########################
   #     Movies Section    #
   ######################### */

// Find users Watched Collection
module.exports.getUserMoviesWatchedCollection = async (req, res) => {
  try {
    // get our jwt from the request
    var jwt;
    const cookie = req.headers.cookie;
    if (cookie) {
      jwt = cookie.slice(4, cookie.length);
    }

    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);

    // supply the user id to our method in WatchedList model to get WatchedList collection
    var watchedList = await MovieWatchedList.findUserWatched(userID);
    watchedList = {
      "Watched": watchedList.watchedCollection,
    };

    res.status(200).json({ "WatchedList": watchedList });
  } catch (error) {
    //error = handleErrors(error);
    res.status(400).json({ "Error": error.message });
  }
};

// Find users Watching Collection
module.exports.getUserMoviesWatchingCollection = async (req, res) => {
  try {
    // get our jwt from the request
    var jwt;
    const cookie = req.headers.cookie;
    if (cookie) {
      jwt = cookie.slice(4, cookie.length);
    }

    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);

    // supply the user id to our method in WatchedList model to get WatchedList collection
    var watchList = await MovieWatchList.findUserWatchlist(userID);

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
module.exports.updateUserMoviesWatchedCollection = async (req, res) => {
  // get our jwt from the request
  var jwt;
  const cookie = req.headers.cookie;
  if (cookie) {
    jwt = cookie.slice(4, cookie.length);
  }
  const { movieID, type } = req.body;

  try {
    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);
    const newCollection = await MovieWatchedList.updateUserWatched(
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
module.exports.updateUserMoviesWatchingCollection = async (req, res) => {
  // get our jwt from the request
  var jwt;
  const cookie = req.headers.cookie;
  if (cookie) {
    jwt = cookie.slice(4, cookie.length);
  }
  const { movieID, type } = req.body;

  try {
    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);
    const newCollection = await MovieWatchList.updateUserWatchlist(
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

/* #########################
   #     Shows Section     #
   ######################### */

// Find users Watched Collection
module.exports.getUserShowsWatchedCollection = async (req, res) => {
  try {
    // get our jwt from the request
    var jwt;
    const cookie = req.headers.cookie;
    if (cookie) {
      jwt = cookie.slice(4, cookie.length);
    }

    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);

    // supply the user id to our method in WatchedList model to get WatchedList collection
    var watchedList = await ShowWatchedList.findUserWatched(userID);
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
module.exports.getUserShowsWatchingCollection = async (req, res) => {
  try {
    // get our jwt from the request
    var jwt;
    const cookie = req.headers.cookie;
    if (cookie) {
      jwt = cookie.slice(4, cookie.length);
    }

    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);

    // supply the user id to our method in WatchedList model to get WatchedList collection
    var watchList = await ShowWatchList.findUserWatchlist(userID);

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
module.exports.updateUserShowsWatchedCollection = async (req, res) => {
  // get our jwt from the request
  var jwt;
  const cookie = req.headers.cookie;
  if (cookie) {
    jwt = cookie.slice(4, cookie.length);
  }
  const { showID, type } = req.body;

  try {
    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);
    const newCollection = await ShowWatchedList.updateUserWatched(
      userID,
      showID,
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
module.exports.updateUserShowsWatchingCollection = async (req, res) => {
  // get our jwt from the request
  var jwt;
  const cookie = req.headers.cookie;
  if (cookie) {
    jwt = cookie.slice(4, cookie.length);
  }
  const { showID, type } = req.body;

  try {
    // use this jwt in our method to get our userID
    const userID = getUIDViaToken(jwt);
    const newCollection = await ShowWatchList.updateUserWatchlist(
      userID,
      showID,
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
