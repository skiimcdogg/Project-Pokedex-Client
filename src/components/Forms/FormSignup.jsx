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

  handleFileUpload = (event) => {
    console.log("The file to be uploaded is: ", event.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("avatar", event.target.files[0]);

    apiHandler
    .handleUpload(uploadData)
    .then((response) => {
      this.setState({ avatar: response.secure_url})
    })
    .catch((err) => {
      console.log("File upload error:", err);
    });
  }


  handleSelect = (event) => {
    this.setState({ region: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        console.log("APIHANDLER signup",data);
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
      <form onSubmit={this.handleSubmit}>        
        <label htmlFor="avatar">Avatar</label>
        <input
          onChange={this.handleFileUpload}
          type="file"
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

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default withRouter(withUser(FormSignup));
