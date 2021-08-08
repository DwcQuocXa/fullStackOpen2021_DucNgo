import React from "react";

function StatisticLine({ text, value }) {
  return (
    <tbody>
      <tr>
        <td>
          {text} {value}
        </td>
      </tr>
    </tbody>
  );
}

export default StatisticLine;
