import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";

class FormSignup extends Component {
  state = {
    avatar: "",
    pseudo: "",
    region: "Kanto",
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    this.setState({ [key]: value });
  };

  selectFile = (event) => {
    console.log(event.target.files[0])
    this.setState({ avatar: event.target.files[0] })
  }

  handleSelect = (event) => {
    this.setState({ region: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // alert(`Fichier sélectionné - ${this.state.avatar}`);

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.props.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.props.context.user) {
      return <Redirect to="/" />;
    }
console.log(this.state);
    return (
      <form onSubmit={this.handleSubmit} encType="multipart/form-data">        
        <label htmlFor="avatar">Avatar</label>
        <input
          onChange={this.selectFile}
          type="file"
          id="avatar"
          name="avatar"
        />
        <label htmlFor="pseudo">Pseudo</label>
        <input
          onChange={this.handleChange}
          value={this.state.pseudo}
          type="text"
          id="pseudo"
          name="pseudo"
        />
        <label htmlFor="select">Region:</label>
        <select value={this.state.region} onChange={this.handleSelect}>
          <option value="Kanto">Kanto</option>
          <option value="Johto">Johto</option>
          <option value="Hoenn">Hoenn</option>
          <option value="Sinnoh">Sinnoh</option>
          <option value="Unys">Unys</option>
          <option value="Kalos">Kalos</option>
          <option value="Alola">Alola</option>
          <option value="Galar">Galar</option>
        </select>

        <label htmlFor="email">Email</label>
        <input
          onChange={this.handleChange}
          type="email"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
        />

        <button>Submit</button>
      </form>
    );
  }
}

export default withRouter(withUser(FormSignup));
