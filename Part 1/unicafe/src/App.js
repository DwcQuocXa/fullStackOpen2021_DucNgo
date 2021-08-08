import React, { useState, useEffect } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [all, setAll] = useState(0);

  const handleGood = () => {
    setGood(good + 1);
  };
  const handleBad = () => {
    setBad(bad + 1);
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
  };

  useEffect(() => {
    const averageCalculator =
      (good * 1 + bad * -1 + neutral * 0) / (good + bad + neutral);
    setAverage(averageCalculator);
  }, [good, neutral, bad]);

  useEffect(() => {
    const positiveCalculator = (good / (good + bad + neutral)) * 100;
    setPositive(positiveCalculator);
  }, [good, neutral, bad]);

  useEffect(() => {
    const allCalculator = good + bad + neutral;
    setAll(allCalculator);
  }, [good, neutral, bad]);

  return (
    <div>
      <h2>give feedback</h2>
      <Button
        handleGood={handleGood}
        handleNeutral={handleNeutral}
        handleBad={handleBad}
      />
      <h2>Statistics</h2>
      <Statistics
        good={good}
        bad={bad}
        neutral={neutral}
        average={average}
        positive={positive + "%"}
        all={all}
      />
    </div>
  );
};

export default App;
