const mongoose = require("mongoose");

const showWatchedListSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
  },
  watchedCollection: {
    // this will be an array of IDs, Movie IDs.
    type: [mongoose.Types.ObjectId],
  },
});

// Function that creates specific user's initial Watched Collection
showWatchedListSchema.statics.createUserWatched = async function (userID) {
  const initialCollection = [];
  try {
    const watchedCollection = await this.create({
      userID,
      initialCollection,
    });
    return watchedCollection;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Function that finds specific user's Watched collection via their ID
showWatchedListSchema.statics.findUserWatched = async function (userID) {
  var WatchedDocument;

  try {
    if (userID) {
      // if we have been given a User's ID we can use it to search for their collection
      const queryResult = await this.findOne({ "userID": userID });
      if (queryResult) {
        // from queryResult we want the collection
        WatchedDocument = queryResult;
      } else {
        // create a user collection as one does not exist
        await this.createUserWatched(userID);
        // try re executing og query
        const queryResult = await this.findOne({ "userID": userID });
        // from queryResult we want the collection
        WatchedDocument = queryResult;
      }
    } else {
      throw Error("No User ID supplied!");
    }
  } catch (error) {
    console.log(error);
  }

  return WatchedDocument;
};

// Function that updates specific user's Watched collection
showWatchedListSchema.statics.updateUserWatched = async function (
  userID,
  movieID,
  type
) {
  var watchedList;
  try {
    if (type === "add") {
      // We need to get our current watchedList
      const watchedDocument = await this.findUserWatched(userID);
      const watchedCollection = watchedDocument.watchedCollection;
      // check if movieID already exists there
      const index = watchedCollection.indexOf(movieID);
      // movieID isnt present
      if (index === -1) {
        // now add to our current WatchedList
        watchedCollection.push(movieID);
      } else {
        throw Error("Movie ID already present in collection!");
      }
      // then commit the changes and return the new array
      await watchedDocument.save();
    } else if (type === "remove") {
      // We need to get our current watchedList
      const watchedDocument = await this.findUserWatched(userID);
      const watchedCollection = watchedDocument.watchedCollection;
      // find the index of the move id to remove
      const index = watchedCollection.indexOf(movieID);
      // remove element
      if (index > -1) {
        watchedCollection.splice(index, 1);
      }
      // then commit the changes and return the new array
      await watchedDocument.save();
    }
    // assign to our return value
    watchedDocument = await this.findUserWatched(userID);
    watchedList = watchedDocument.watchedCollection;
  } catch (error) {
    // we try to create a collection then update it again
    if (error == "No collection found!") {
      // create a user collection as one does not exist
      await this.createUserWatched(userID);
      // now get that collection
      const watchedDocument = await this.findUserWatched(userID);
      const watchedCollection = watchedDocument.watchedCollection;
      // now add to our current WatchedList
      watchedCollection.push(movieID);
      // then commit the changes and return the new array
      await watchedDocument.save();
      // assign to our return value
      watchedList = await this.findUserWatched(userID);
    } else {
      throw Error(error);
    }
  }
  return watchedList;
};

const ShowWatchedList = mongoose.model(
  "showWatchedlist",
  showWatchedListSchema
);

module.exports = ShowWatchedList;
