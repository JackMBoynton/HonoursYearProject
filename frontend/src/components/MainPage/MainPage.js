import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/MainPage/main.css";
const axios = require("axios");

// components to import
import SearchBox from "./SearchBox";

const MainPage = () => {
  // Document Title
  const pageTitle = "Honours Year Project";

  // States
  const [results, setResults] = useState([]); // hook for setting results from search box
  const [searchValue, setSearchValue] = useState(""); // hook for setting search value

  // Methods
  // Method for sending our query for searching
  const getMovieRequest = async (searchValue) => {
    const url = `http://localhost:5000/movies/search`;

    axios
      .post(url, {
        search: searchValue,
        netflix: false,
        hulu: false,
        disney: false,
        amazon: false,
      })
      .then(function (response) {
        setResults(response.data.results);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(results);
  };

  // Run our method when our searchValue changes
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <>
      <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
    </>
  );
};

export default MainPage;
