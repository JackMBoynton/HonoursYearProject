import React, { useEffect, useState } from "react";
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
  const [searchChoice, setSearchChoice] = useState(""); // hook for setting show or movie

  // Methods
  // Method for sending our query for searching for a movie
  const getRequest = async (searchValue, searchChoice) => {
    var url;

    if (searchChoice === "show") {
      url = "http://localhost:5000/shows/search";
    } else if (searchChoice === "movie") {
      url = "http://localhost:5000/movies/search";
    }

    if (searchValue.length >= 3) {
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
    getRequest(searchValue, searchChoice);
  }, [
    searchValue,
    netflixChoice,
    huluChoice,
    disneyChoice,
    amazonChoice,
    searchChoice,
  ]);

  // Run our set choice method when choice is undefined
  useEffect(() => {
    setSearchChoice("movie");
  }, []);

  return (
    <div id="div-content" className="d-flex p-2">
      <h5>Search for your Movie / TV Show here:</h5>
      <SearchBox
        setChoiceValue={setSearchChoice}
        setSearchValue={setSearchValue}
      />
      <Selections
        setNetflixChoice={setNetflixChoice}
        setHuluChoice={setHuluChoice}
        setDisneyChoice={setDisneyChoice}
        setAmazonChoice={setAmazonChoice}
      />
      <ResultsTable results={results} mediaType={searchChoice} />
    </div>
  );
};

export default MainPage;
