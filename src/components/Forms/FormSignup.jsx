import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { withUser } from "../Auth/withUser";
import apiHandler from "../../api/apiHandler";
import  "../../styles/form.css"

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
      <div className="form-container">
      <form className="form" onSubmit={this.handleSubmit}>        
        <label htmlFor="avatar" className="avatar">Upload Avatar</label>
        <input
          id="avatar"
          onChange={this.handleFileUpload}
          type="file"
        />
        <label className="label" htmlFor="pseudo">Pseudo</label>
        <input
        className="input"
          onChange={this.handleChange}
          value={this.state.pseudo}
          type="text"
          id="pseudo"
          name="pseudo"
          placeholder="your pseudo..."
        />
        <label className="label" htmlFor="select">Region:</label>
        <select className="input" value={this.state.region} onChange={this.handleSelect}>
          <option value="Kanto">Kanto</option>
          <option value="Johto">Johto</option>
          <option value="Hoenn">Hoenn</option>
          <option value="Sinnoh">Sinnoh</option>
          <option value="Unys">Unys</option>
          <option value="Kalos">Kalos</option>
          <option value="Alola">Alola</option>
          <option value="Galar">Galar</option>
        </select>

        <label className="label" htmlFor="email">Email</label>
        <input
        className="input"
          onChange={this.handleChange}
          type="email"
          id="email"
          name="email"
          placeholder="your email..."
          
        />
        <label className="label" htmlFor="password">Password</label>
        <input
        className="input"
          onChange={this.handleChange}
          value={this.state.password}
          type="password"
          id="password"
          name="password"
          placeholder="your password..."
        />

        <button className="btn" type="submit">Submit</button>
      </form>
      </div>
    );
  }
}

export default withRouter(withUser(FormSignup));
