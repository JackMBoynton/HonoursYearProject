import React from "react";

const BasicComponent = (props) => {
  return (
    <>
      <div>
        <h1>Hello {props.name}</h1>
      </div>
    </>
  );
};

export default BasicComponent;
