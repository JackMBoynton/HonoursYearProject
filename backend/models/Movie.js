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
    if (
      netflix === true &&
      disney === true &&
      hulu === true &&
      amazon === true
    ) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          {
            $or: [
              { "Netflix": 1 },
              { "Prime Video": 1 },
              { "Disney+": 1 },
              { "Hulu": 1 },
            ],
          },
        ],
      });
    } else if (netflix === true && hulu === true && amazon === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Prime Video": 1 }, { "Netflix": 1 }, { "Hulu": true }] },
        ],
      });
    } else if (disney === true && netflix === true && amazon === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          {
            $or: [{ "Prime Video": 1 }, { "Disney+": 1 }, { "Netflix": true }],
          },
        ],
      });
    } else if (disney === true && hulu === true && netflix === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Netflix": 1 }, { "Disney+": 1 }, { "Hulu": true }] },
        ],
      });
    } else if (disney === true && hulu === true && amazon === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Prime Video": 1 }, { "Disney+": 1 }, { "Hulu": true }] },
        ],
      });
    } else if (hulu === true && amazon === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Prime Video": 1 }, { "Hulu": 1 }] },
        ],
      });
    } else if (netflix === true && amazon === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Prime Video": 1 }, { "Netflix": 1 }] },
        ],
      });
    } else if (netflix === true && hulu === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Netflix": 1 }, { "Hulu": 1 }] },
        ],
      });
    } else if (amazon === true && disney === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Prime Video": 1 }, { "Disney+": 1 }] },
        ],
      });
    } else if (hulu === true && disney === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Hulu": 1 }, { "Disney+": 1 }] },
        ],
      });
    } else if (netflix === true && disney === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Netflix": 1 }, { "Disney+": 1 }] },
        ],
      });
    } else if (netflix === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { "Netflix": 1 },
        ],
      });
    } else if (hulu === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { "Hulu": 1 },
        ],
      });
    } else if (disney === true) {
      movies = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { "Disney+": 1 },
        ],
      });
    } else if (amazon === true) {
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
