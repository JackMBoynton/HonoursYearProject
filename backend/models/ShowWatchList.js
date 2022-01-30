const mongoose = require("mongoose");

const showWatchListSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
  },
  watchCollection: {
    // this will be an array of IDs, Movie IDs.
    type: [mongoose.Types.ObjectId],
  },
});

// Function that creates specific user's initial Watch Collection
showWatchListSchema.statics.createUserWatchlist = async function (userID) {
  const initialCollection = [];
  try {
    const watchCollection = await this.create({
      userID,
      initialCollection,
    });
    return watchCollection;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Function that finds specific user's WatchList collection
showWatchListSchema.statics.findUserWatchlist = async function (userID) {
  var WatchDocument;

  try {
    if (userID) {
      // if we have been given a User's ID we can use it to search for their collection
      const queryResult = await this.findOne({ "userID": userID });
      if (queryResult) {
        // from queryResult we want the collection
        WatchDocument = queryResult;
      } else {
        // create a user collection as one does not exist
        await this.createUserWatchlist(userID);
        // try re executing og query
        const queryResult = await this.findOne({ "userID": userID });
        // from queryResult we want the collection
        WatchDocument = queryResult;
      }
    } else {
      throw Error("No User ID supplied!");
    }
  } catch (error) {
    console.log(error);
  }

  return WatchDocument;
};

// Function that updates specific user's WatchList collection
showWatchListSchema.statics.updateUserWatchlist = async function (
  userID,
  movieID,
  type
) {
  var watchList;
  try {
    if (type === "add") {
      // We need to get our current watchList
      const watchDocument = await this.findUserWatchlist(userID);
      const watchCollection = watchDocument.watchCollection;
      // check if movieID already exists there
      const index = watchCollection.indexOf(movieID);
      // movieID isnt present
      if (index === -1) {
        // now add to our current WatchList
        watchCollection.push(movieID);
      } else {
        throw Error("Movie ID already present in collection!");
      }
      // then commit the changes and return the new array
      await watchDocument.save();
    } else if (type === "remove") {
      // We need to get our current watchList
      const watchDocument = await this.findUserWatchlist(userID);
      const watchCollection = watchDocument.watchCollection;
      // find the index of the move id to remove
      const index = watchCollection.indexOf(movieID);
      // remove element
      if (index > -1) {
        watchCollection.splice(index, 1);
      }
      // then commit the changes and return the new array
      await watchDocument.save();
    }
    // assign to our return value
    watchDocument = await this.findUserWatchlist(userID);
    watchList = watchDocument.watchCollection;
  } catch (error) {
    // we try to create a collection then update it again
    if (error == "No collection found!") {
      // create a user collection as one does not exist
      await this.createUserWatchlist(userID);
      // now get that collection
      const watchDocument = await this.findUserWatchlist(userID);
      const watchCollection = watchDocument.watchCollection;
      // now add to our current WatchedList
      watchCollection.push(movieID);
      // then commit the changes and return the new array
      await watchDocument.save();
      // assign to our return value
      watchList = await this.findUserWatch(userID);
    } else {
      throw Error(error);
    }
  }
  return watchList;
};

const ShowWatchList = mongoose.model("showWatchlist", showWatchListSchema);

module.exports = ShowWatchList;
