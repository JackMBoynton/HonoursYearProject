const Movie = require("../models/Movie");

// Search for Movie
module.exports.movieSearchPost = async (req, res) => {
  // we get the search query from the frontend as well as streaming services checkboxes
  const { search, netflix, hulu, disney, amazon } = req.body;

  try {
    const movies = await Movie.findMovies(
      search,
      netflix,
      hulu,
      disney,
      amazon
    );
    res.status(200).json({ results: movies });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports.movieSearchViaID = async (req, res) => {
  const { id } = req.body;

  try {
    const movie = await Movie.findMovieViaID(id);
    res.status(200).json({ result: movie });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
