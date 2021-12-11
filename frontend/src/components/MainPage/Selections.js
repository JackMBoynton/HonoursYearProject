import React from "react";
import "../../styles/MainPage/Selections.css";

const Selections = (props) => {
  return (
    <div id="all-selections" className="col col-sm-4">
      <div className="row">
        <div className="d-flex col-sm-3 ">
          <input
            type="checkbox"
            name="Netflix"
            id="netflix"
            value={props.netflix}
            onChange={(event) => props.setNetflixChoice(event.target.checked)}
          />
          <label htmlFor="Netflix">Netflix</label>
        </div>
        <div className="d-flex col-sm-2 hulu">
          <input
            type="checkbox"
            name="Hulu"
            id="hulu"
            value={props.hulu}
            onChange={(event) => props.setHuluChoice(event.target.checked)}
          />
          <label htmlFor="Hulu">Hulu</label>
        </div>
        <div className="d-flex col-sm-3 disney">
          <input
            type="checkbox"
            name="Disney+"
            id="disney"
            value={props.disney}
            onChange={(event) => props.setDisneyChoice(event.target.checked)}
          />
          <label htmlFor="Disney+">Disney+</label>
        </div>
        <div className="d-flex col-sm-4 amazon">
          <input
            type="checkbox"
            name="Amazon Prime Video"
            id="amazon"
            value={props.amazon}
            onChange={(event) => props.setAmazonChoice(event.target.checked)}
          />
          <label htmlFor="Amazon Prime Video">Prime Video</label>
        </div>
      </div>
    </div>
  );
};

export default Selections;
