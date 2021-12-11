import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/MainPage/main.css";
const axios = require("axios");

// components to import
import SearchBox from "./SearchBox";
import ResultsTable from "./ResultsTable";
import Selections from "./Selections";

const MainPage = () => {
  // Document Title
  const pageTitle = "Honours Year Project";

  // States
  const [results, setResults] = useState([]); // hook for setting results from search box
  const [searchValue, setSearchValue] = useState(""); // hook for setting search value
  const [netflixChoice, setNetflixChoice] = useState(false); // hook for checkbox netflix
  const [huluChoice, setHuluChoice] = useState(false); // hook for checkbox netflix
  const [disneyChoice, setDisneyChoice] = useState(false); // hook for checkbox netflix
  const [amazonChoice, setAmazonChoice] = useState(false); // hook for checkbox netflix

  // Methods
  // Method for sending our query for searching
  const getMovieRequest = async (searchValue) => {
    const url = `http://localhost:5000/movies/search`;

    if (searchValue.length >= 3) {
      console.log({
        searchValue,
        netflixChoice,
        huluChoice,
        disneyChoice,
        amazonChoice,
      });
      axios
        .post(url, {
          search: searchValue,
          netflix: netflixChoice,
          hulu: huluChoice,
          disney: disneyChoice,
          amazon: amazonChoice,
        })
        .then(function (response) {
          setResults(response.data.results);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setResults([]);
    }
  };

  // Run our method when our searchValue or choices changes
  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue, netflixChoice, huluChoice, disneyChoice, amazonChoice]);

  return (
    <div id="div-content" className="d-flex p-2">
      <h5>Search for your Movie / TV Show here:</h5>
      <SearchBox setSearchValue={setSearchValue} />
      <Selections
        setNetflixChoice={setNetflixChoice}
        setHuluChoice={setHuluChoice}
        setDisneyChoice={setDisneyChoice}
        setAmazonChoice={setAmazonChoice}
      />
      <ResultsTable results={results} />
    </div>
  );
};

export default MainPage;
