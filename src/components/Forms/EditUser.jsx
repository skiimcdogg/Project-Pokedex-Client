import React, { Component } from 'react';
import { withUser } from "../Auth/withUser";
import axios from 'axios';

class EditUser extends Component {
  state = {
    pseudo: "",
    email: "",
    avatar: "",
    region: ""
  }

  handleChange = (event) => {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

    handleSubmit = (event) => {
    event.preventDefault()

    let id = this.props.user._id
    axios
      .patch(process.env.REACT_APP_BACKEND_URL + `api/user/edit/${id}`, {
        pseudo: this.state.pseudo,
        email: this.state.email,
        avatar: this.state.avatar,
        region: this.state.region
      })
      .then((response) => {
        console.log(response.data)
        this.props.context.setUser(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    //   console.log(this.props.user._id)
      return(
    <form onSubmit={this.handleSubmit}>
        <h2>Edit your profile</h2>

    <label>Pseudo</label>
        <input
          onChange={this.handleChange}
          name="pseudo"
          type="text"
          value={this.state.pseudo}
          placeholder="Ash"
        />

    <label>Mail</label>
        <input
          onChange={this.handleChange}
          name="email"
          type="email"
          value={this.state.email}
        />

    <label>Avatar</label>
        <input
          onChange={this.handleChange}
          name="avatar"
          type="file"
          value={this.state.avatar}
          placeholder="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/899c4dc5-bb82-45ae-a4ab-aa2d6bf0e4a0/dd0ea01-af1e8204-e412-4abb-8814-61fd8260dbe4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg5OWM0ZGM1LWJiODItNDVhZS1hNGFiLWFhMmQ2YmYwZTRhMFwvZGQwZWEwMS1hZjFlODIwNC1lNDEyLTRhYmItODgxNC02MWZkODI2MGRiZTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VkvdSEQYAvd9kvpmKFBVxvjRyczrzVhCl0_wnjK6Qac"
        alt="your-avatar"/>

        <button>Send</button>

    </form>
    )
  }
}

export default withUser(EditUser);
