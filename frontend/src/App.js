import React, { useEffect, useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const axios = require("axios");

// components to import
import NavBar from "./components/All/NavBar";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import SignupPage from "./components/SignupPage/SignupPage";

const App = () => {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
    </div>
  );
};

export default App;
