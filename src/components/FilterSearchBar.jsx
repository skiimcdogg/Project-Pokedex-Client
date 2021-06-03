import React from "react";
import "../styles/searchBar.css"

const FilterSearchBar = ({ search, handleSearchFn }) => {
  return (
    <div  className="container">
      <input
        onChange={(event) => handleSearchFn(event.target.value)}
        type="text"
        name="search"
        value={search}
        placeholder="Search..."
      />
      <div className="search"></div>
    </div>
 

    
  );
};

export default FilterSearchBar;
