import React from "react";
import "../../styles/MainPage/ResultsTable.css";

const ResultsTable = (props) => {
  return (
    <div className="container">
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">IMDb Rating</th>
            <th scope="col">Rotten Tomatoes Rating</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.results.map((movie, index) => (
            <tr key={movie.ID}>
              <th scope="row">{movie.Title}</th>
              <td>{movie.IMDb ? movie.IMDb : "Missing"}</td>
              <td>
                {movie["Rotten Tomatoes"] ? movie["Rotten Tomatoes"] : "N/A"}
              </td>
              <td>
                <a className="btn btn-primary" href="#" role="button">
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
