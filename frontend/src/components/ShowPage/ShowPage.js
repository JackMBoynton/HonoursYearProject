import React from "react";

const ShowPage = (props) => {
  // get the URL params
  const params = props.match.params;

  return <div>{params.title} - Show</div>;
};

export default ShowPage;
