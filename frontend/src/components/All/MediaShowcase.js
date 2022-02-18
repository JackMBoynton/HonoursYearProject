import React from "react";
import "../../styles/all/MediaShowcase.css";

const MediaShowcase = (props) => {
  // get the URL params
  const {
    Title,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Country,
    Awards,
    Poster,
  } = props.media;

  // ratings
  const imdbRating = props.imdb;
  const metaRating = props.metacritic;
  const rottenRating = props.rottenTomatoes;

  if (props.media.Response !== "False") {
    return (
      <div className="media-content">
        <div className="container">
          <div className="row">
            <div className="col-sm" id="poster-section">
              <img className="media-poster" src={Poster} alt="Movie Poster" />
            </div>
            <div className="col-sm">
              <h2>
                {Title} ({Rated})
              </h2>
              <p>
                {Released} - {Genre} - {Runtime} - {Country}
              </p>
              <p>
                <span className="heading">Director(s): </span>
                {Director}
              </p>
              <p>
                <span className="heading">Writer(s): </span>
                {Writer}
              </p>
              <p>
                <span className="heading">Cast: </span>
                {Actors}
              </p>
              <p>
                <span className="heading">Plot: </span>
                {Plot}
              </p>
              <p>
                <span className="heading">Awards: </span>
                {Awards}
              </p>
              <table className="table table-dark ratings-table">
                <thead>
                  <tr>
                    <th scope="col">IMDb</th>
                    <th scope="col">Metacritic</th>
                    <th scope="col">Rotten Tomatoes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {imdbRating === "" || imdbRating === undefined
                        ? "-"
                        : imdbRating}
                    </td>
                    <td>
                      {metaRating === "" || metaRating === undefined
                        ? "-"
                        : metaRating}
                    </td>
                    <td>
                      {rottenRating === "" || rottenRating === undefined
                        ? "-"
                        : rottenRating}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1 className="media-not-found">Media cannot be found :(</h1>
      </div>
    );
  }
};

export default MediaShowcase;
