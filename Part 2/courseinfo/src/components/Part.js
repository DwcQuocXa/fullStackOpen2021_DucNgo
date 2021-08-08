import React from "react";

function Part({ name, exercise }) {
  return (
    <div>
      <p>
        {name} {exercise}
      </p>
    </div>
  );
}

export default Part;
