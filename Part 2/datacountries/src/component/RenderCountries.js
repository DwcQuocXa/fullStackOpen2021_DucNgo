import React from "react";
import Country from "./Country";

function RenderCountries({ filter }) {
  if (filter.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  return (
    <div>
      {filter.map((country) => (
        <Country country={country} />
      ))}
    </div>
  );
}

export default RenderCountries;
