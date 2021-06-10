import React from "react";

import "./../../styles/pokemonBox.css";

const EditPokemon = () => {
  
  const { handleSubmit, name, handleChange } = this.props;

  return (
    <form className='edit-pokemon' onSubmit={handleSubmit}>
      <h2>Edit name</h2>
      <label htmlFor='name'>Name</label>
      <input
        onChange={(event) => handleChange(event.target.value)}
        name='name'
        type='text'
        value={name}
        id='name'
      />
      <button className='style-btn'>Send</button>
    </form>
  );
};

export default EditPokemon;
