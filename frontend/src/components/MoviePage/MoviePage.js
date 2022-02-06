import React from "react";

const MoviePage = (props) => {
  // get the URL params
  const params = props.match.params;

  return <div>{params.title} - Movie</div>;
};

export default MoviePage;
