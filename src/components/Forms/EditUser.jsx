import React from "react";
import { withRouter } from "react-router-dom";

const EditUser = (props) => {
  
    return (
      <form onSubmit={props.handleSubmit}>
        <h2>Edit your profile</h2>

        <label htmlFor="pseudo">Pseudo</label>
        <input
          onChange={props.handleChange}
          name="pseudo"
          type="text"
          id="pseudo"
          value={props.pseudo}
        />

        <label htmlFor="email">Mail</label>
        <input
          onChange={props.handleChange}
          name="email"
          type="email"
          id="email"
          value={props.email}
        />

        <label>Region:</label>
        <select value={props.region} onChange={props.handleSelect}>
          <option value="Kanto">Kanto</option>
          <option value="Johto">Johto</option>
          <option value="Hoenn">Hoenn</option>
          <option value="Sinnoh">Sinnoh</option>
          <option value="Unys">Unys</option>
          <option value="Kalos">Kalos</option>
          <option value="Alola">Alola</option>
          <option value="Galar">Galar</option>
        </select>

        <label htmlFor="avatar">Avatar</label>
        <input
          onChange={props.handleImage}
          name="avatar"
          type="file"
          id="avatar"
        />
        <button>Send</button>
      </form>
    );
}

export default withRouter(EditUser);
