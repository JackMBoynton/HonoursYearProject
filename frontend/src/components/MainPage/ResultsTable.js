import React from "react";
import "../../styles/MainPage/ResultsTable.css";

// platform images
import netflix from "./platform-logos/Netflix.png";
import hulu from "./platform-logos/Hulu.png";
import prime from "./platform-logos/Prime-Video.png";
import disney from "./platform-logos/Disney-Plus.png";

const ResultsTable = (props) => {
  return (
    <div className="container-fluid">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Available On</th>
            <th scope="col">IMDb Rating</th>
            <th scope="col">Rotten Tomatoes Rating</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.results.map((movie, index) => (
            <tr key={movie.ID}>
              <th scope="row">{movie.Title}</th>
              <td>
                {movie.Netflix === 1 ? (
                  <img className="platform-logo" src={netflix} />
                ) : (
                  ""
                )}
                {movie.Hulu === 1 ? (
                  <img className="platform-logo" src={hulu} />
                ) : (
                  ""
                )}
                {movie["Prime Video"] === 1 ? (
                  <img className="platform-logo" src={prime} />
                ) : (
                  ""
                )}
                {movie["Disney+"] === 1 ? (
                  <img className="platform-logo" src={disney} />
                ) : (
                  ""
                )}
              </td>
              <td>{movie.IMDb ? movie.IMDb : "Missing"}</td>
              <td>
                {movie["Rotten Tomatoes"] ? movie["Rotten Tomatoes"] : "N/A"}
              </td>
              <td>
                <a
                  className="btn btn-primary"
                  href={`/movie/${movie.Title}`}
                  role="button"
                >
                  View
                </a>
                <a className="btn btn-success" href="#" role="button">
                  Add to Watchlist
                </a>
                <a className="btn btn-warning" href="#" role="button">
                  Add to Watched
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResultsTable;
