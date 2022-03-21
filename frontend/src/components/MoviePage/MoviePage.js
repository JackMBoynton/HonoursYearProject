import React, { useEffect, useState } from "react";
const axios = require("axios");

// import media showcase
import MediaShowcase from "../All/MediaShowcase";

const MoviePage = (props) => {
  // States
  const [media, setMedia] = useState({});
  // Rating States
  const [imdb, setImdb] = useState("");
  const [rottenTomatoes, setRottenTomatoes] = useState("");
  const [metacritic, setMetacritic] = useState("");

  // Create separate Axios Instance as we need withCredentials to be false for External API requests
  // However, default Axios requests need to contain withCredentials for internals
  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: false,
  });

  // get the URL params
  const mediaTitle = props.match.params.title;

  // method to send the request for show information
  const sendRequest = async () => {
    const url = `http://www.omdbapi.com/?apikey=2212bf28&t=${mediaTitle}&type=movie`;

    await axiosInstance
      .get(url)
      .then(function (response) {
        // assign our media
        setMedia(response.data);
        if (response.data.Response === "True") {
          processRatings(response.data.Ratings);
        }
      })
      .catch(function (error) {
        // set the error
        console.log(error);
      });
  };

  const processRatings = async (ratings) => {
    var ratingsArray = [];
    await ratings.forEach((rating) => {
      ratingsArray.push(rating.Value);
    });
    setImdb(ratingsArray[0]);
    setRottenTomatoes(ratingsArray[1]);
    setMetacritic(ratingsArray[2]);
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <div>
      <MediaShowcase
        media={media}
        imdb={imdb}
        metacritic={metacritic}
        rottenTomatoes={rottenTomatoes}
      />
    </div>
  );
};

export default MoviePage;
