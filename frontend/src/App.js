import React from "react";
import { Route, Switch } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
const axios = require("axios");

// components to import
import NavBar from "./components/All/NavBar";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import SignupPage from "./components/SignupPage/SignupPage";
import LogoutPage from "./components/LogoutPage/LogoutPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import MoviePage from "./components/MoviePage/MoviePage";
import ShowPage from "./components/ShowPage/ShowPage";
import SettingsPage from "./components/SettingsPage/SettingsPage";

const App = () => {
  return (
    <div className="App">
      <CookiesProvider>
        <NavBar />
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignupPage} />
          <Route exact path="/logout" component={LogoutPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/account-settings" component={SettingsPage} />
          <Route exact path="/movie/:title" component={MoviePage} />
          <Route exact path="/show/:title" component={ShowPage} />
        </Switch>
      </CookiesProvider>
    </div>
  );
};

export default App;
