import React from "react";
import StatisticLine from "./StatisticLine";

function Statistics({ good, bad, neutral, average, positive, all }) {
  if (all) {
    return (
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={all} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive} />
      </table>
    );
  }
  return (
    <div>
      {" "}
      <p>No feedback given</p>
    </div>
  );
}

export default Statistics;
