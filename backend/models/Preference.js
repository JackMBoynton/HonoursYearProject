const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
  },
  Netflix: {
    type: Boolean,
    default: false,
  },
  Hulu: {
    type: Boolean,
    default: false,
  },
  Disney: {
    type: Boolean,
    default: false,
  },
  Amazon: {
    type: Boolean,
    default: false,
  },
});

// method for creating default user preferences
preferenceSchema.statics.createUserPreferences = async function (userID) {
  var returnVal;

  try {
    // create new document
    const userPrefs = await this.create({
      userID,
    });
    // return this new document
    returnVal = userPrefs;
  } catch (error) {
    console.log(error);
  }

  return returnVal;
};

// method for setting user preferences for a specific user id
preferenceSchema.statics.setUserPreferences = async function (
  userID,
  netflixChoice,
  huluChoice,
  disneyChoice,
  amazonChoice
) {
  var newPreferences;

  try {
    // get our user preferences, as controller has already done checks
    const userPrefs = await this.getUserPreferences(userID);
    // Update our 4 choices of platforms
    userPrefs.Netflix = netflixChoice;
    userPrefs.Hulu = huluChoice;
    userPrefs.Disney = disneyChoice;
    userPrefs.Amazon = amazonChoice;
    // save our preferences
    await userPrefs.save();
  } catch (error) {
    console.log(error);
  }

  // search for our updated collection
  const updatedPrefs = await this.getUserPreferences(userID);
  newPreferences = updatedPrefs;

  return updatedPrefs;
};

// method for finding user preferences for a specific id
preferenceSchema.statics.getUserPreferences = async function (userID) {
  var preferences;

  try {
    if (userID) {
      const queryResult = await this.findOne({ "userID": userID });
      if (queryResult) {
        // from queryResult assign to preferences
        preferences = queryResult;
      } else {
        preferences = [];
      }
    } else {
      throw Error("No user ID / Invalid user ID was returned from JWT");
    }
  } catch (error) {
    console.log(error);
  }

  return preferences;
};

const Preference = mongoose.model("preference", preferenceSchema);

module.exports = Preference;
