const mongoose = require("mongoose");

const preferenceSchema = new mongoose.Schema({
  userID: {
    type: Number,
  },
  Netflix: {
    type: Boolean,
  },
  Hulu: {
    type: Boolean,
  },
  Disney: {
    type: Boolean,
  },
  Amazon: {
    type: Boolean,
  },
});

const Preference = mongoose.model("preference", preferenceSchema);

module.exports = Preference;
