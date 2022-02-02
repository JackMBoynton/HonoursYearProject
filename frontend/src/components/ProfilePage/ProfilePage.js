import React, { useEffect, useState } from "react";
import "../../styles/ProfilePage/main.css";

// Components
import WatchedMoviesList from "./WatchedMoviesList";
import WatchingMoviesList from "./WatchingMoviesList";
import WatchedShowsList from "./WatchedShowsList";
import WatchingShowsList from "./WatchingShowsList";
import MovieListHeading from "./MovieListHeading";

const ProfilePage = () => {
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Watched Movies Collection" />
      </div>
      <div className="row">
        <WatchedMoviesList />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Watching Movies Collection" />
      </div>
      <div className="row">
        <WatchingMoviesList />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Watched TV Shows Collection" />
      </div>
      <div className="row">
        <WatchedShowsList />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Watching TV Shows Collection" />
      </div>
      <div className="row">
        <WatchingShowsList />
      </div>
    </div>
  );
};

export default ProfilePage;
