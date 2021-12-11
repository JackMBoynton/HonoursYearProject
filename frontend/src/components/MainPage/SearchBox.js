import React from "react";
import "../../styles/MainPage/SearchBox.css";

const SearchBox = (props) => {
  return (
    <div className="col col-sm-4">
      <input
        id="darkFormInput"
        className="form-control bg-dark"
        value={props.value}
        onChange={(event) => props.setSearchValue(event.target.value)}
        placeholder="Type to search..."
      />
    </div>
  );
};

export default SearchBox;
