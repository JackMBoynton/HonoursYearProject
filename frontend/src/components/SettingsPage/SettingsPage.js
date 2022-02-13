import React, { useEffect, useState } from "react";
import "../../styles/SettingsPage/main.css";

// Components
import SettingsForm from "./SettingsForm";

const SettingsPage = (props) => {
  return (
    <div className="container">
      <SettingsForm history={props.history} />
    </div>
  );
};

export default SettingsPage;
