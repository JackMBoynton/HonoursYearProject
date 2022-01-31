import React, { useEffect, useState } from "react";
import "../../styles/ProfilePage/main.css";

// Components
import WatchedMoviesList from "./WatchedMoviesList";
import WatchingMoviesList from "./WatchingMoviesList";
import WatchedShowsList from "./WatchedShowsList";
import WatchingShowsList from "./WatchingShowsList";

const ProfilePage = () => {
  return (
    <div className="container">
      <WatchedMoviesList />
      <WatchingMoviesList />
      <WatchedShowsList />
      <WatchingShowsList />
    </div>
  );
};

export default ProfilePage;
