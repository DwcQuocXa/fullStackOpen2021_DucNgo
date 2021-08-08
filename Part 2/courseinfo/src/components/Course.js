import React from "react";
import Part from "./Part";

function Course({ course, key }) {
  const total = course.parts.reduce((s, p) => s + p.exercises, 0);
  return (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <Part key={key} name={part.name} exercise={part.exercises} />
      ))}
      <h2>Number of exercises {total}</h2>
    </div>
  );
}

export default Course;
