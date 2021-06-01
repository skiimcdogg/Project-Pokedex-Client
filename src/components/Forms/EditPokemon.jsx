import React from 'react';

const EditUser = (props) => {

      return(
    <form onSubmit={props.handleSubmit}>
        <h2>Edit your pokemon's name</h2>

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
    )
}

export default EditUser;