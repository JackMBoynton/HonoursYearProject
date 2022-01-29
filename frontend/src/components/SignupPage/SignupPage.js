import React, { useEffect, useState } from "react";
import "../../styles/SignupPage/main.css";
import { useHistory } from "react-router-dom";

// Components
import SignupForm from "./SignupForm";

const SignupPage = (props) => {
  return (
    <div className="container">
      <SignupForm history={props.history} />
    </div>
  );
};

export default SignupPage;
