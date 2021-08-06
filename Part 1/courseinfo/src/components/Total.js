import React from "react";

function Total({ parts }) {
  const partsExercise = parts.map((part) => part.exercises);
  let sum = 0;
  for (let i = 0; i < partsExercise.length; i++) {
    sum += partsExercise[i];
  }
  return (
    <div>
      <h2>Number of exercises {sum}</h2>
    </div>
  );
}

export default Total;
