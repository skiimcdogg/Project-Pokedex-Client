import React from "react";
import { withRouter } from "react-router-dom";

const EditUser = (props) => {
  return (
    <div className='user-container'>
      <h2 className='styling-title'>Edit your profile</h2>
      <form className='user-form' onSubmit={props.handleSubmit}>
        <label htmlFor='pseudo'>Pseudo:</label>
        <input
          onChange={props.handleChange}
          name='pseudo'
          type='text'
          id='pseudo'
          value={props.pseudo}
        />

        <label htmlFor='email'>Mail:</label>
        <input
          onChange={props.handleChange}
          name='email'
          type='email'
          id='email'
          value={props.email}
        />

        <label>Region:</label>
        <select
          className='select-region'
          value={props.region}
          onChange={props.handleSelect}
        >
          <option value='Kanto'>Kanto</option>
          <option value='Johto'>Johto</option>
          <option value='Hoenn'>Hoenn</option>
          <option value='Sinnoh'>Sinnoh</option>
          <option value='Unys'>Unys</option>
          <option value='Kalos'>Kalos</option>
          <option value='Alola'>Alola</option>
          <option value='Galar'>Galar</option>
        </select>

        <label htmlFor='avatar'>Avatar</label>
        <input
          className='edit-avatar'
          onChange={props.handleImage}
          name='avatar'
          type='file'
          id='avatar'
        />
        <button className='send-btn'>Send</button>
      </form>
    </div>
  );
};

export default withRouter(EditUser);
