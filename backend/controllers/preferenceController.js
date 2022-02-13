// using destructuring assignment to get the UID via token method from auth controller
const { getUIDViaToken } = require("./authController");

const Preference = require("../models/Preference");

// Error handling
const handleErrors = (err) => {
  let errors = { message: "" };

  errors.message = err.message;

  return errors;
};

// Set User's preferences
module.exports.setUserPreferences = async (req, res) => {
  // get our jwt from the request
  var jwt;
  const cookie = req.headers.cookie;
  if (cookie) {
    jwt = cookie.slice(4, cookie.length);
  }
  // get our variables from the req body
  const { netflix, hulu, disney, amazon } = req.body;

  try {
    // use this jwt to return our userID from the method in collectionsController
    const userID = getUIDViaToken(jwt);

    // if we have no preferences already, create default ones via getUserPreferences
    const preferencesSearch = await Preference.getUserPreferences(userID);
    // we return an array of [] if nothing is found using getUserPreference or an error
    if (preferencesSearch.length === 0) {
      // create default user preferences as none exist
      await Preference.createUserPreferences(userID);
    }

    // using userID, create a new user preferences
    var updatedPreferences = await Preference.setUserPreferences(
      userID,
      netflix,
      hulu,
      disney,
      amazon
    );

    // just return the preferences, we do not want sensitive data like user id
    updatedPreferences = {
      "Netflix": updatedPreferences.Netflix,
      "Hulu": updatedPreferences.Hulu,
      "Disney": updatedPreferences.Disney,
      "Amazon": updatedPreferences.Amazon,
    };

    res.status(200).json({ "Preferences": updatedPreferences });
  } catch (error) {
    console.log(error);
    res.status(400).json({ "Errors": error.message });
  }
};

// Return User's preferences
module.exports.getUserPreferences = async (req, res) => {
  // get our jwt from the request
  var jwt;
  const cookie = req.headers.cookie;
  if (cookie) {
    jwt = cookie.slice(4, cookie.length);
  }

  try {
    // get UID from JWT
    const userID = getUIDViaToken(jwt);
    // search for prefs using userID
    var preferences = await Preference.getUserPreferences(userID);

    // just return the preferences, we do not want sensitive data like user id
    preferences = {
      "Netflix": preferences.Netflix,
      "Hulu": preferences.Hulu,
      "Disney": preferences.Disney,
      "Amazon": preferences.Amazon,
    };

    res.status(200).json({ "Preferences": preferences });
  } catch (error) {
    res.status(400).json({ "Error": error.message });
  }
};
