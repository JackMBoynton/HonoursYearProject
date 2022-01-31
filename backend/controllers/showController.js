const Show = require("../models/Show");

// Search for Show
module.exports.showSearchPost = async (req, res) => {
  // we get the search query from the frontend as well as streaming services checkboxes
  const { search, netflix, hulu, disney, amazon } = req.body;

  try {
    const shows = await Show.findShows(search, netflix, hulu, disney, amazon);
    res.status(200).json({ results: shows });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.showSearchViaID = async (req, res) => {
  const { id } = req.body;

  try {
    const show = await Show.findShowViaID(id);
    res.status(200).json({ result: show });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
