import React, { useEffect, useState } from "react";
import "../../styles/SignupPage/main.css";

// Components
import LoginForm from "./LoginForm";

const LoginPage = (props) => {
  return (
    <div className="container">
      <LoginForm history={props.history} />
    </div>
  );
};

export default LoginPage;
