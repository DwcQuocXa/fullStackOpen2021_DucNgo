import React, { useState, useEffect } from "react";
import axios from "axios";
import RenderCountries from "./component/RenderCountries";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  console.log(countries);

  const handleFilter = (event) => {
    const filteredCountries = countries.filter((person) =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilter(filteredCountries);
  };

  return (
    <div>
      <span>
        find countries <input value={filter.name} onChange={handleFilter} />
      </span>
      <RenderCountries filter={filter} />
    </div>
  );
}

export default App;
