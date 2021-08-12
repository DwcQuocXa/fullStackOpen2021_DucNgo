import React from "react";

function RenderAll({ filter, persons, handleDelete }) {
  return (
    <div>
      {filter
        ? filter.map((person) => (
            <div key={person.name}>
              <p>
                {person.name} {person.number}
              </p>
              <button onClick={() => handleDelete(person.id)}>Delete</button>
            </div>
          ))
        : persons.map((person) => (
            <div key={person.name}>
              <p>
                {person.name} {person.number}
              </p>
              <button onClick={() => handleDelete(person.id)}>Delete</button>
            </div>
          ))}
    </div>
  );
}

export default RenderAll;
