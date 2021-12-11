const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
  ID: {
    type: Number,
    unique: true,
  },
  Title: {
    type: String,
  },
  Year: {
    type: Number,
  },
  Age: {
    type: String,
  },
  IMDb: {
    type: String,
  },
  "Rotten Tomatoes": {
    type: String,
  },
  Netflix: {
    type: Number,
  },
  Hulu: {
    type: Number,
  },
  "Prime Video": {
    type: Number,
  },
  "Disney+": {
    type: Number,
  },
});

showSchema.statics.findShows = async function (
  searchQuery,
  netflix,
  hulu,
  disney,
  amazon
) {
  // declare the shows array
  var shows = [];

  // first check for search value
  if (searchQuery) {
    if (netflix === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { "Netflix": 1 },
        ],
      });
    } else if (hulu === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { "Hulu": 1 },
        ],
      });
    } else if (disney === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { "Disney+": 1 },
        ],
      });
    } else if (amazon === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { "Prime Video": 1 },
        ],
      });
    } else {
      shows = await this.find({
        "Title": { "$regex": searchQuery, "$options": "i" },
      });
    }
  } else {
    throw Error("No search value!");
  }

  return shows;
};

const Show = mongoose.model("show", showSchema);

module.exports = Show;
