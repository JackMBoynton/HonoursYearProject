import React, { useEffect, useState } from "react";
import "../../styles/SignupPage/SignupForm.css";
const axios = require("axios");

// make with credentials = true
axios.defaults.withCredentials = true;

const SignupForm = (props) => {
  // States
  const [errors, setErrors] = useState({ "email": "", "password": "" });

  // Methods for Signing Up
  const sendSignupRequest = async (event) => {
    // cancel the original event
    event.preventDefault();

    // all form fields
    const email = event.target.elements.email.value;
    const dn = event.target.elements.displayName.value;
    const pwd = event.target.elements.password.value;

    // The URL to send to
    const url = "http://localhost:5000/auth/signup";

    await axios
      .post(
        url,
        {
          email: email,
          displayName: dn,
          password: pwd,
        },
        { headers: { "Content-Type": "application/json", "Method": "POST" } },
        { withCredentials: true }
      )
      .then(function (response) {
        props.history.push("/");
        props.history.go();
      })
      .catch(function (error) {
        // set the error
        setErrors(error.response.data.errors);
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center container"
      id="form-div"
    >
      <div className="col-md-3">
        <form onSubmit={sendSignupRequest}>
          <h1>Sign Up</h1>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              className="form-control bg-dark"
              id="email"
              placeholder="Enter email here"
            />
            <div className="text-danger">{errors.email}</div>
          </div>
          <div className="form-group">
            <label htmlFor="email">Display Name</label>
            <input
              type="text"
              className="form-control bg-dark"
              id="displayName"
              placeholder="Enter Display Name here"
            />
            <div className="text-danger">{errors.displayName}</div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control bg-dark"
              id="password"
              placeholder="Enter Password here"
            />
            <div className="text-danger">{errors.password}</div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
