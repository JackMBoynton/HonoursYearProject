const mongoose = require("mongoose");

const WatchListSchema = new mongoose.Schema({
  userID: {
    type: Number,
  },
  collection: {
    // this will be an array of IDs, Movie IDs.
    type: [Number],
  },
});

const WatchList = mongoose.model("watchlist", WatchListSchema);

module.exports = WatchList;
