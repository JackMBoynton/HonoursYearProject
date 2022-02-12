import React, { useEffect, useState } from "react";
import "../../styles/ProfilePage/main.css";

// Components
import WatchedMoviesList from "./WatchedMoviesList";
import WatchingMoviesList from "./WatchingMoviesList";
import WatchedShowsList from "./WatchedShowsList";
import WatchingShowsList from "./WatchingShowsList";
import MediaListHeading from "./MediaListHeading";

const ProfilePage = (props) => {
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MediaListHeading heading="Watched Movies Collection" />
      </div>
      <div className="row">
        <WatchedMoviesList history={props.history} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MediaListHeading heading="Watching Movies Collection" />
      </div>
      <div className="row">
        <WatchingMoviesList history={props.history} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MediaListHeading heading="Watched TV Shows Collection" />
      </div>
      <div className="row">
        <WatchedShowsList history={props.history} />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MediaListHeading heading="Watching TV Shows Collection" />
      </div>
      <div className="row">
        <WatchingShowsList history={props.history} />
      </div>
    </div>
  );
};

export default ProfilePage;
