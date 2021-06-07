import React from "react";

import "./../../styles/pokemonBox.css"

const EditUser = (props) => {
  return (
    <form className="edit-pokemon" onSubmit={props.handleSubmit}>
      <h2>Edit name</h2>
      <label htmlFor="name">Name</label>
      <input
        onChange={(event) => props.handleChange(event.target.value)}
        name="name"
        type="text"
        value={props.name}
        id="name"
      />
      <button>Send</button>
    </form>
  );
};

export default EditUser;
