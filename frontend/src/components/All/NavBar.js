import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/All/NavBar.css";

const NavBar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

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
      </div>
    </nav>
  );
};

export default NavBar;
