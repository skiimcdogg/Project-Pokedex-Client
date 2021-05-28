import React from "react";

const FilterSearchBar = ({ search, handleSearchFn }) => {
  return (
    <div>
      <input
        onChange={(event) => handleSearchFn(event.target.value)}
        type="text"
        name="search"
        value={search}
      />
    </div>
  );
};

export default FilterSearchBar;
