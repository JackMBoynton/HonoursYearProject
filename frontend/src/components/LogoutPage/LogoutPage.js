import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
const axios = require("axios");

const LogoutPage = (props) => {
  var message = "";

  const sendLogoutRequest = async () => {
    const url = "http://localhost:5000/auth/logout";

    await axios
      .get(
        url,
        {},
        { headers: { "Content-Type": "application/json", "Method": "GET" } },
        { withCredentials: true }
      )
      .then(function (response) {
        props.history.push("/");
        props.history.go();
      })
      .catch(function (error) {
        // set the error
        console.log(error);
      });
  };

  useEffect(() => {
    sendLogoutRequest();
  }, []);

  return <div className="container"></div>;
};

export default LogoutPage;
