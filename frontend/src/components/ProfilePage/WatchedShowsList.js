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

const WatchedShowsList = (props) => {
  // Create separate Axios Instance as we need withCredentials to be false for External API requests
  // However, default Axios requests need to contain withCredentials for internals
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: false,
  });

  // States
  const [watchedListIDs, setWatchedListIDs] = useState([]);
  const [watchedListTitles, setWatchedListTitles] = useState([]);
  const [watchedListShows, setWatchedListShows] = useState([]);

  // Methods
  // This method fetches the array of Watched Movie IDs
  const fetchWatchedShows = async () => {
    const url = "http://localhost:5000/collections/shows/watched";

    await axios
      .get(
        url,
        {},
        { headers: { "Content-Type": "application/json", "Method": "GET" } },
        { withCredentials: true }
      )
      .then(function (response) {
        // assign our watched collection (array)
        setWatchedListIDs(response.data.WatchedList.Watched);
      })
      .catch(function (error) {
        // set the error
        console.log(error);
      });
  };

  const changeIDElementToShowTitle = async (id) => {
    var showToReturn;

    const url = "http://localhost:5000/shows/search/id";

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
        const showArray = Object.values(response.data.result[0]);
        showToReturn = showArray[2];
      })
      .catch(function (error) {
        // set the error
        console.log(error);
      });

    return showToReturn;
  };

  const returnMetadataFromTitle = async (title) => {
    var showMetadata;

    await axiosInstance
      .get(
        "http://www.omdbapi.com/?apikey=2212bf28" +
          "&t=" +
          title +
          "&type=series"
      )
      .then(function (response) {
        // assign our watched collection (array)
        showMetadata = response.data;
      })
      .catch(function (error) {
        // set the error
        console.log(error);
      });

    return showMetadata;
  };

  const changeIDsToShows = async (collectionOfIDs) => {
    // collectionOfIDs is an array - we want to map over each element and change it
    var idToTitlePromises = collectionOfIDs.map((id) => {
      return changeIDElementToShowTitle(id);
    });
    Promise.all(idToTitlePromises).then(function (result) {
      // then set it again in the state
      setWatchedListTitles(result);
    });
  };

  const changeTitlesToShows = async (collectionOfTitles) => {
    var newShowList;
    // Now we have a collection (array) of titles, so we want the movie instead
    var titleToMetadataPromises = collectionOfTitles.map((title) => {
      return returnMetadataFromTitle(title);
    });
    Promise.all(titleToMetadataPromises).then(function (result) {
      // then set it again in the state
      newShowList = result.map((show, index) => {
        show.mongoID = watchedListIDs[index];
        return show;
      });
      setWatchedListShows(newShowList);
    });
  };

  const removeFromFavourites = async (idToRemove) => {
    // remove favourite using URL

    const url = "http://localhost:5000/collections/shows/watched/update/";

    await axios
      .put(
        url,
        {
          "type": "remove",
          "showID": idToRemove,
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
    fetchWatchedShows();
  }, []);

  useEffect(() => {
    changeIDsToShows(watchedListIDs);
  }, [watchedListIDs]);

  useEffect(() => {
    changeTitlesToShows(watchedListTitles);
  }, [watchedListTitles]);

  useEffect(() => {
    fetchWatchedShows();
  }, [watchedListShows]);

  if (watchedListShows.length > 0) {
    return (
      <>
        <MediaList
          type="show"
          contents={watchedListShows}
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
        <h2>
          Either nothing is in your collection yet or we cannot access it :(
        </h2>
        <p>
          Add something via the home page when searching, refresh or log in!
        </p>
      </div>
    );
  }
};

export default WatchedShowsList;
