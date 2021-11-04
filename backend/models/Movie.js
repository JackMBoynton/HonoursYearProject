const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
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

movieSchema.statics.findMovies = async function (
  searchQuery,
  netflix,
  hulu,
  disney,
  amazon
) {
  // declare the movies array
  var movies = [];

  // first check for search value
  if (searchQuery) {
    if (netflix === "True") {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { "Netflix": 1 },
        ],
      });
    } else if (hulu === "True") {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { "Hulu": 1 },
        ],
      });
    } else if (disney === "True") {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { "Disney+": 1 },
        ],
      });
    } else if (amazon === "True") {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { "Prime Video": 1 },
        ],
      });
    } else {
      movies = await this.find({
        "Title": { "$regex": searchQuery, "$options": "i" },
      });
    }
  } else {
    throw Error("No search value!");
  }

  return movies;
};

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;
