import React, { useEffect, useRef } from "react";
import "../../styles/MainPage/Selections.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const axios = require("axios");

const Selections = (props) => {
  // Setting Refs for DOM manipulation
  const netflixInput = useRef(null);
  const huluInput = useRef(null);
  const disneyInput = useRef(null);
  const amazonInput = useRef(null);

  // this is the method that is used to fetch user preferences
  const getPreferences = async () => {
    // The URL to send to
    const url = "http://localhost:5000/user/preferences/get";

    await axios
      .get(
        url,
        { headers: { "Content-Type": "application/json", "Method": "GET" } },
        { withCredentials: true }
      )
      .then(function (response) {
        // then populate checkboxes from response and set choices for search
        if (response.data.Preferences.Netflix === true) {
          netflixInput.current.checked = true;
          props.setNetflixChoice(true);
        }
        if (response.data.Preferences.Hulu === true) {
          huluInput.current.checked = true;
          props.setHuluChoice(true);
        }
        if (response.data.Preferences.Disney === true) {
          disneyInput.current.checked = true;
          props.setDisneyChoice(true);
        }
        if (response.data.Preferences.Amazon === true) {
          amazonInput.current.checked = true;
          props.setAmazonChoice(true);
        }
      })
      .catch(function (error) {
        // show notification to show what happened
        NotificationManager.info(
          "To automatically load your streaming service preferences next time, sign up today!",
          "Signing up can make life easier",
          2000
        );
        console.log(error);
      });
  };

  // execute this function on load
  useEffect(() => {
    getPreferences();
  }, []);

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
            ref={netflixInput}
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
            ref={huluInput}
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
            ref={disneyInput}
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
            ref={amazonInput}
          />
          <label htmlFor="Amazon Prime Video">Prime Video</label>
        </div>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default Selections;
