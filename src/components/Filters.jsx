import React from 'react';

import '../styles/filters.css';

function Filters(props) {
  const { types, checkedArr } = props;

  function handleChange(event) {
    props.handleChangeInput(event);
  }

  if (types.results === undefined) {
    return <div className="loading-box">Fetching types...</div>;
  }
  return (
    <div>
      <div className='filter-box'>
        {types.results.slice(0, -2).map((type) => {
          return (
            <div className='filter' key={type.name}>
              <label htmlFor={type.name}>
                <img src={`/images/${type.name}.png`} alt={`${type.name}`} />
                {checkedArr.includes(`${type.name}`) && (
                  <p className='tick'>✓</p>
                )}
              </label>
              <input
                id={type.name}
                type='checkbox'
                name={type.name}
                onChange={handleChange}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Filters;
