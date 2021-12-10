import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">
        Cinesearch
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <a class="nav-link" href="/signup">
              Sign Up
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">
              Log In
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
