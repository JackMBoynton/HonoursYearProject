import React from "react";

const ShowPage = (props) => {
  // get the URL params
  const params = props.match.params;

  return <div>{params.title}</div>;
};

export default ShowPage;
