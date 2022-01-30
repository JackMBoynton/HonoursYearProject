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
    if (
      netflix === true &&
      disney === true &&
      hulu === true &&
      amazon === true
    ) {
      shows = await this.find({
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
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Prime Video": 1 }, { "Netflix": 1 }, { "Hulu": true }] },
        ],
      });
    } else if (disney === true && netflix === true && amazon === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          {
            $or: [{ "Prime Video": 1 }, { "Disney+": 1 }, { "Netflix": true }],
          },
        ],
      });
    } else if (disney === true && hulu === true && netflix === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Netflix": 1 }, { "Disney+": 1 }, { "Hulu": true }] },
        ],
      });
    } else if (disney === true && hulu === true && amazon === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Prime Video": 1 }, { "Disney+": 1 }, { "Hulu": true }] },
        ],
      });
    } else if (hulu === true && amazon === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Prime Video": 1 }, { "Hulu": 1 }] },
        ],
      });
    } else if (netflix === true && amazon === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Prime Video": 1 }, { "Netflix": 1 }] },
        ],
      });
    } else if (netflix === true && hulu === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Netflix": 1 }, { "Hulu": 1 }] },
        ],
      });
    } else if (amazon === true && disney === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Prime Video": 1 }, { "Disney+": 1 }] },
        ],
      });
    } else if (hulu === true && disney === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Hulu": 1 }, { "Disney+": 1 }] },
        ],
      });
    } else if (netflix === true && disney === true) {
      shows = await this.find({
        $and: [
          { "Title": { "$regex": searchQuery, "$options": "i" } },
          { $or: [{ "Netflix": 1 }, { "Disney+": 1 }] },
        ],
      });
    } else if (netflix === true) {
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
