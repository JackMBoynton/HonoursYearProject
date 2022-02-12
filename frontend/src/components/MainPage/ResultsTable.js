import React, { useState, useEffect } from "react";
import "../../styles/MainPage/ResultsTable.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const axios = require("axios");

// platform images
import netflix from "./platform-logos/Netflix.png";
import hulu from "./platform-logos/Hulu.png";
import prime from "./platform-logos/Prime-Video.png";
import disney from "./platform-logos/Disney-Plus.png";

// make with credentials = true
axios.defaults.withCredentials = true;

const ResultsTable = (props) => {
  // Another state for execution
  const [userAuth, setUserAuth] = useState(false);

  const checkUserStatus = async () => {
    await axios
      .get("http://localhost:5000/auth/user/isAuthed", {
        withCredentials: true,
      })
      .then(function (response) {
        if (response.data.Status === true) {
          setUserAuth(true);
        }
      })
      .catch(function (error) {
        // Do nothing
      });
  };

  // Adding to Collection methods
  const addToWatchlist = async (event, id, type) => {
    // prevent the default event from firing
    event.preventDefault();

    // declare url but do not create it yet
    var url = "";

    // if type is movie, use the movie endpoint - if shows, use shows endpoint
    if (type === "movie") {
      url = "http://localhost:5000/collections/movies/watching/update";

      // send the axios request
      await axios
        .put(
          url,
          {
            "movieID": id,
            "type": "add",
          },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          // To-do: add notification
          NotificationManager.success(
            "Successfully Added to Watching Collection!",
            "Action Complete",
            2000
          );
        })
        .catch(function (error) {
          NotificationManager.error(
            "Failed to add to Collection, please try again!",
            "Action Unsuccessful",
            2000
          );
        });
    } else {
      url = "http://localhost:5000/collections/shows/watching/update";

      // send the axios request
      await axios
        .put(
          url,
          {
            "showID": id,
            "type": "add",
          },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          // To-do: add notification
          NotificationManager.success(
            "Successfully Added to Watching Collection!",
            "Action Complete",
            2000
          );
        })
        .catch(function (error) {
          NotificationManager.error(
            "Failed to add to Collection, please try again!",
            "Action Unsuccessful",
            2000
          );
        });
    }
  };

  const addToWatched = async (event, id, type) => {
    // prevent the default event from firing
    event.preventDefault();

    // declare url but do not create it yet
    var url = "";

    // if type is movie, use the movie endpoint - if shows, use shows endpoint
    if (type === "movie") {
      url = "http://localhost:5000/collections/movies/watched/update";

      // send the axios request
      await axios
        .put(
          url,
          {
            "movieID": id,
            "type": "add",
          },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          // To-do: add notification
          NotificationManager.success(
            "Successfully Added to Watched Collection!",
            "Action Complete",
            2000
          );
        })
        .catch(function (error) {
          NotificationManager.error(
            "Failed to add to Collection, please try again!",
            "Action Unsuccessful",
            2000
          );
        });
    } else {
      url = "http://localhost:5000/collections/shows/watched/update";

      // send the axios request
      await axios
        .put(
          url,
          {
            "showID": id,
            "type": "add",
          },
          {
            withCredentials: true,
          }
        )
        .then(function (response) {
          // To-do: add notification
          NotificationManager.success(
            "Successfully Added to Watched Collection!",
            "Action Complete",
            2000
          );
        })
        .catch(function (error) {
          NotificationManager.error(
            "Failed to add to Collection, please try again!",
            "Action Unsuccessful",
            2000
          );
        });
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  if (!userAuth) {
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
                    href={
                      props.mediaType === "movie"
                        ? `/movie/${movie.Title}`
                        : `/show/${movie.Title}`
                    }
                    role="button"
                  >
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
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
                    href={
                      props.mediaType === "movie"
                        ? `/movie/${movie.Title}`
                        : `/show/${movie.Title}`
                    }
                    role="button"
                  >
                    View
                  </a>
                  <a
                    className="btn btn-success"
                    onClick={() =>
                      addToWatchlist(event, movie._id, props.mediaType)
                    }
                    role="button"
                  >
                    Add to Watchlist
                  </a>
                  <a
                    className="btn btn-warning"
                    onClick={() =>
                      addToWatched(event, movie._id, props.mediaType)
                    }
                    role="button"
                  >
                    Add to Watched
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <NotificationContainer />
      </div>
    );
  }
};

export default ResultsTable;
