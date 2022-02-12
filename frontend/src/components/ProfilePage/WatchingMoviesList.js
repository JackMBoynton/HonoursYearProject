import React, { useEffect, useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const axios = require("axios");

// Components for MoviesList
import MediaList from "./MediaListEntity/MediaList";
import RemoveFavourites from "./MediaListEntity/RemoveFavourites";
import MediaHeading from "./MediaListEntity/MediaHeading";

const WatchingMoviesList = (props) => {
  // Create separate Axios Instance as we need withCredentials to be false for External API requests
  // However, default Axios requests need to contain withCredentials for internals
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: false,
  });

  // States
  const [watchListIDs, setWatchListIDs] = useState([]);
  const [watchListTitles, setWatchListTitles] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);

  // Methods
  // This method fetches the array of Watched Movie IDs
  const fetchWatchListMovies = async () => {
    const url = "http://localhost:5000/collections/movies/watching";

    await axios
      .get(
        url,
        {},
        { headers: { "Content-Type": "application/json", "Method": "GET" } },
        { withCredentials: true }
      )
      .then(function (response) {
        // assign our watched collection (array)
        setWatchListIDs(response.data.WatchList.Watching);
      })
      .catch(function (error) {
        // set the error
        console.log(error);
      });
  };

  const changeIDElementToMovieTitle = async (id) => {
    var movieToReturn;

    const url = "http://localhost:5000/movies/search/id";

    await axios
      .post(
        url,
        {
          "id": id,
        },
        { headers: { "Content-Type": "application/json", "Method": "POST" } },
        { withCredentials: true }
      )
      .then(function (response) {
        const movieArray = Object.values(response.data.result[0]);
        movieToReturn = movieArray[2];
      })
      .catch(function (error) {
        // set the error
        console.log(error);
      });

    return movieToReturn;
  };

  const returnMetadataFromTitle = async (title) => {
    var movieMetadata;

    await axiosInstance
      .get(
        "http://www.omdbapi.com/?apikey=2212bf28" +
          "&t=" +
          title +
          "&type=movie"
      )
      .then(function (response) {
        // assign our watched collection (array)
        movieMetadata = response.data;
      })
      .catch(function (error) {
        // set the error
        console.log(error);
      });

    return movieMetadata;
  };

  const changeIDsToMovies = async (collectionOfIDs) => {
    // collectionOfIDs is an array - we want to map over each element and change it
    var idToTitlePromises = collectionOfIDs.map((id) => {
      return changeIDElementToMovieTitle(id);
    });
    Promise.all(idToTitlePromises).then(function (result) {
      // then set it again in the state
      setWatchListTitles(result);
    });
  };

  const changeTitlesToMovies = async (collectionOfTitles) => {
    var newMovieList;
    // Now we have a collection (array) of titles, so we want the movie instead
    var titleToMetadataPromises = collectionOfTitles.map((title) => {
      return returnMetadataFromTitle(title);
    });
    Promise.all(titleToMetadataPromises).then(function (result) {
      // then set it again in the state
      newMovieList = result.map((movie, index) => {
        movie.mongoID = watchListIDs[index];
        return movie;
      });
      setWatchListMovies(newMovieList);
    });
  };

  const removeFromFavourites = async (idToRemove) => {
    // remove favourite using URL

    const url = "http://localhost:5000/collections/movies/watching/update/";

    await axios
      .put(
        url,
        {
          "type": "remove",
          "movieID": idToRemove,
        },
        { headers: { "Content-Type": "application/json", "Method": "PUT" } },
        { withCredentials: true }
      )
      .then(function (response) {
        NotificationManager.success(
          "Successfully Removed from the Shows Watching Collection!",
          "Action Complete",
          2000
        );
      })
      .catch(function (error) {
        NotificationManager.error(
          "A technical error has occurred, please check browser console for more info!",
          "Action Unsuccessful",
          2000
        );
        console.log(error);
      });
  };

  useEffect(() => {
    fetchWatchListMovies();
  }, []);

  useEffect(() => {
    changeIDsToMovies(watchListIDs);
  }, [watchListIDs]);

  useEffect(() => {
    changeTitlesToMovies(watchListTitles);
  }, [watchListTitles]);

  useEffect(() => {
    fetchWatchListMovies();
  }, [watchListMovies]);

  if (watchListMovies.length > 0) {
    return (
      <>
        <MediaList
          type="movie"
          contents={watchListMovies}
          heading={MediaHeading}
          handleFavouritesClick={removeFromFavourites}
          favouriteComponent={RemoveFavourites}
        />
        <NotificationContainer />
      </>
    );
  } else {
    return (
      <div className="empty-collection">
        <h3>
          Either nothing is in your collection yet or we cannot access it :(
        </h3>
        <p>
          Add something via the home page when searching, refresh or log in!
        </p>
      </div>
    );
  }
};

export default WatchingMoviesList;
