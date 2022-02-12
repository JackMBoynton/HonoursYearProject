import React from "react";
import { Link } from "react-router-dom";

const MediaHeading = ({ type, mediaTitle }) => {
  if (type === "movie") {
    return (
      <>
        <Link to={`/movie/${mediaTitle}`}>{mediaTitle}</Link>
      </>
    );
  } else {
    return (
      <>
        <Link to={`/show/${mediaTitle}`}>{mediaTitle}</Link>
      </>
    );
  }
};

export default MediaHeading;
