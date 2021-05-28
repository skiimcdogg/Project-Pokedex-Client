import React, { Component } from 'react';
import { withUser } from "../Auth/withUser";
import axios from 'axios';

class EditUser extends Component {
  state = {
    pseudo: "",
    email: "",
    id: "",
  }

 

  handleChange = (event) => {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  handleSelect = (event) => {
    this.setState({ region: event.target.value })
  }

  componentDidMount() {
    // console.log(this.props.context.user)

  this.setState({ email: this.props.context.user.email,
                  pseudo: this.props.context.user.pseudo,
                  region: this.props.context.user.region,
                  id: this.props.context.user._id })
}

    handleSubmit = (event) => {
    // event.preventDefault()

    let id = this.state.id
    axios
      .patch(process.env.REACT_APP_BACKEND_URL + `api/user/edit/${id}`, {
        pseudo: this.state.pseudo,
        email: this.state.email,
        region: this.state.region,
        // avatar: this.state.avatar,
      })
      .then((response) => {
        console.log("------------",response.data)
        this.props.context.setUser(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
      console.log(this.props.context.user._id)
    // console.log(this.props.context.user)
    if (this.state.user === null) {
      return <div>Loading...</div>;
    }
      return(
    <form onSubmit={this.handleSubmit}>
        <h2>Edit your profile</h2>

    <label htmlFor="pseudo">Pseudo</label>
        <input
          onChange={this.handleChange}
          name="pseudo"
          type="text"
          id="pseudo"
          value={this.state.pseudo}
        />

    <label htmlFor="email">Mail</label>
        <input
          onChange={this.handleChange}
          name="email"
          type="email"
          id="email"
          value={this.state.email}
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

    {/* <label>Avatar</label>
        <input
          onChange={this.handleChange}
          name="avatar"
          type="file"
          value={this.state.avatar}
          placeholder="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/899c4dc5-bb82-45ae-a4ab-aa2d6bf0e4a0/dd0ea01-af1e8204-e412-4abb-8814-61fd8260dbe4.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzg5OWM0ZGM1LWJiODItNDVhZS1hNGFiLWFhMmQ2YmYwZTRhMFwvZGQwZWEwMS1hZjFlODIwNC1lNDEyLTRhYmItODgxNC02MWZkODI2MGRiZTQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.VkvdSEQYAvd9kvpmKFBVxvjRyczrzVhCl0_wnjK6Qac"
        alt="your-avatar"/> */}

        <button>Send</button>

    </form>
    )
  }
}

export default withUser(EditUser);
