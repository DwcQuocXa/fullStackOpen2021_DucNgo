import React from "react";

function SearchFilter({ inputValue, handleFilter }) {
  return (
    <div>
      filter shown with
      <input value={inputValue} onChange={handleFilter} />
    </div>
  );
}

export default SearchFilter;
