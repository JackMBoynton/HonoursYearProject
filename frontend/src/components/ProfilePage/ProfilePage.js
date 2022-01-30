import React, { useEffect, useState } from "react";
import "../../styles/ProfilePage/main.css";

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
