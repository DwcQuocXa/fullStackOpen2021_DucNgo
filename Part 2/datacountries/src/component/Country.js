import React, { useState, useEffect } from "react";
import axios from "axios";

function Country({ country }) {
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState("");

  const apiWeatherKey = process.env.REACT_APP_API_KEY;
  console.log(apiWeatherKey);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiWeatherKey}&query=${country.capital}`
      )
      .then((response) => setWeather(response.data));
  }, [apiWeatherKey, country]);

  console.log(weather);

  return (
    <div>
      <h2>{country.name}</h2>
      {show ? (
        <span>
          <p>capital {country.capital}</p>
          <p>population {country.population}</p>
          <h3>languages</h3>
          <ul>
            {country.languages.map((language) => (
              <li>{language.name}</li>
            ))}
          </ul>
          <img src={country.flag} alt={country.name} width="100" />
          <h2>Weather in {country.capital}</h2>
          <p>
            <strong>temperature:</strong> {weather.current.temperature} Celsius
          </p>
          <img src={weather.current.weather_icons} alt="weather" width="100" />
          <p>
            <strong>wind: </strong>
            {weather.current.wind_speed} mph direction{" "}
            {weather.current.wind_dir}
          </p>
        </span>
      ) : (
        <p></p>
      )}
      <button onClick={() => setShow(!show)}>{!show ? "show" : "hide"}</button>
    </div>
  );
}

export default Country;
