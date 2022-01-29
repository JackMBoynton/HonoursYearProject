import React from "react";
import "../../styles/MainPage/SearchBox.css";

const SearchBox = (props) => {
  return (
    <div className="col col-sm-4">
      <div className="col">
        <input
          id="darkFormInput"
          className="form-control bg-dark"
          value={props.value}
          onChange={(event) => props.setSearchValue(event.target.value)}
          placeholder="Type to search..."
        />
      </div>
      <div className="col">
        <select
          className="bg-dark"
          name="type"
          id="type"
          onChange={(event) => props.setChoiceValue(event.target.value)}
        >
          <option value="movie">Movie / Film</option>
          <option value="show">TV Show</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBox;
