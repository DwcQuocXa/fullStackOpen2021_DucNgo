import React from "react";

function RenderAll({ filter, persons }) {
  return (
    <div>
      {filter
        ? filter.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))
        : persons.map((person) => (
            <p key={person.name}>
              {person.name} {person.number}
            </p>
          ))}
    </div>
  );
}

export default RenderAll;
