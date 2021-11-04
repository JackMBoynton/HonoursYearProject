const mongoose = require("mongoose");

const watchedListSchema = new mongoose.Schema({
  userID: {
    type: Number,
  },
  collection: {
    // this will be an array of IDs, Movie IDs.
    type: [Number],
  },
});

const WatchedList = mongoose.model("watchedlist", watchedListSchema);

module.exports = WatchedList;
