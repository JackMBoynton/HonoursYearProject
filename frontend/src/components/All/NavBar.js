import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/All/NavBar.css";
const axios = require("axios");

// make with credentials = true
axios.defaults.withCredentials = true;

const NavBar = () => {
  // Special state for Navbar to work
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  // Another state for execution
  const [userAuth, setUserAuth] = useState(false);
  const [userDisplayName, setUserDisplayName] = useState("");

  const checkUserStatus = async () => {
    await axios
      .get("http://localhost:5000/auth/user/isAuthed", {
        withCredentials: true,
      })
      .then(function (response) {
        if (response.data.Status === true) {
          setUserAuth(true);
          setUserDisplayName(response.data.Name);
        }
        console.log(userDisplayName);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    checkUserStatus();
  }, []);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Cinesearch
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded={!isNavCollapsed ? true : false}
        aria-label="Toggle navigation"
        onClick={handleNavCollapse}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
        id="navbarTogglerDemo02"
      >
        {!userAuth ? (
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/signup">
                Sign Up
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Log In
              </a>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link">Welcome, {userDisplayName}!</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout">
                Log Out
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
