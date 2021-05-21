import React from 'react'

const FilterSearchBar = ({ search, handleSearchFn, handleChange, electric }) => {
 return (
    <div>
        <input
        onChange={(event) => handleSearchFn(event.target.value)}
        type="text"
        name="search"
        value={search}
        />
        
        {/* <input
type="checkbox"
defaultChecked={electric}
onChange={handleChange}
/>
         */}
    </div>
 )
}

export default FilterSearchBar;
