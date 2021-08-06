import React from "react";

function Part({ name, exercise }) {
  return (
    <div>
      <h2>{name}</h2>
      <h4>{exercise}</h4>
    </div>
  );
}

export default Part;
