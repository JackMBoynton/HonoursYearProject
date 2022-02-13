import React, { useEffect, useRef, useState } from "react";
import "../../styles/SettingsPage/main.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const axios = require("axios");

// make with credentials = true
axios.defaults.withCredentials = true;

const SettingsForm = (props) => {
  // Setting Refs for DOM manipulation
  const netflixInput = useRef(null);
  const huluInput = useRef(null);
  const disneyInput = useRef(null);
  const amazonInput = useRef(null);

  // need method for getting current settings and populating
  const getSettings = async () => {
    // The URL to send to
    const url = "http://localhost:5000/user/preferences/get";

    await axios
      .get(
        url,
        { headers: { "Content-Type": "application/json", "Method": "GET" } },
        { withCredentials: true }
      )
      .then(function (response) {
        // populate checkboxes from response
        if (response.data.Preferences.Netflix === true) {
          netflixInput.current.checked = true;
        }
        if (response.data.Preferences.Hulu === true) {
          huluInput.current.checked = true;
        }
        if (response.data.Preferences.Disney === true) {
          disneyInput.current.checked = true;
        }
        if (response.data.Preferences.Amazon === true) {
          amazonInput.current.checked = true;
        }

        // show notification to show what happened
        NotificationManager.info(
          "Your current preferences have been loaded already for you",
          "Loading Complete",
          2000
        );
      })
      .catch(function (error) {
        // show notification to show what happened
        NotificationManager.error(
          "A technical error when loading your preferences has occurred! Please try again soon.",
          "Loading Unsuccessful",
          2000
        );
        console.log(error);
      });
  };

  // method for updating settings on submit
  const updateSettings = async (event) => {
    // cancel the original event
    event.preventDefault();

    // all form fields
    const netflix = event.target.elements.Netflix.checked;
    const hulu = event.target.elements.Hulu.checked;
    const disney = event.target.elements.Disney.checked;
    const prime = event.target.elements.Prime.checked;

    // The URL to send to
    const url = "http://localhost:5000/user/preferences/set";

    await axios
      .put(
        url,
        {
          "netflix": netflix,
          "hulu": hulu,
          "disney": disney,
          "amazon": prime,
        },
        { headers: { "Content-Type": "application/json", "Method": "PUT" } },
        { withCredentials: true }
      )
      .then(function (response) {
        NotificationManager.success(
          "Successfully saved your preferences for Streaming Services!",
          "Action Complete",
          2000
        );
      })
      .catch(function (error) {
        NotificationManager.error(
          "A technical error has occurred! Please try again soon.",
          "Action Unsuccessful",
          2000
        );
      });
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center container"
      id="form-div"
    >
      <div className="col-l-4">
        <form onSubmit={updateSettings}>
          <h1>Update Streaming Platform Subscriptions</h1>
          <div className="row">
            <div className="d-flex col-sm-3 ">
              <input
                ref={netflixInput}
                type="checkbox"
                name="Netflix"
                id="netflix"
              />
              <label htmlFor="Netflix">Netflix</label>
            </div>
            <div className="d-flex col-sm-2 hulu">
              <input ref={huluInput} type="checkbox" name="Hulu" id="hulu" />
              <label htmlFor="Hulu">Hulu</label>
            </div>
            <div className="d-flex col-sm-3 disney">
              <input
                ref={disneyInput}
                type="checkbox"
                name="Disney"
                id="disney"
              />
              <label htmlFor="Disney">Disney+</label>
            </div>
            <div className="d-flex col-sm-4 amazon">
              <input
                ref={amazonInput}
                type="checkbox"
                name="Prime"
                id="amazon"
              />
              <label htmlFor="Prime">Prime Video</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
      <NotificationContainer />
    </div>
  );
};

export default SettingsForm;
