import React, { Component } from 'react';
// import { withUser } from "../Auth/withUser";
import { withRouter } from "react-router-dom";
import axios from 'axios';

class EditUser extends Component {
  state = {
    pseudo: "",
    email: "",
    id: "",
    region:"",
    avatar:""
  }

  handleImage = (event) => {
    const file = event.target.files[0]; // Get the value of file input
    
    console.log(file, "this is the file");
    this.setState({ avatar: file });
   

  };
  handleChange = (event) => {
    const name = event.target.name
    this.setState({ [name]: event.target.value })
  }

  handleSelect = (event) => {
    this.setState({ region: event.target.value })
  }

  componentDidMount() {
    // console.log(this.props.context.user)

  this.setState({ email: this.props.user.email,
                  pseudo: this.props.user.pseudo,
                  region: this.props.user.region,
                  id: this.props.user._id,
                   avatar:this.props.user.avatar 
                })
}

    handleSubmit = (event) => {
    // event.preventDefault()
    const formUpdateData = new FormData();

    formUpdateData.append("pseudo", this.state.pseudo);
    formUpdateData.append("email", this.state.email);
    formUpdateData.append("region", this.state.region);
    formUpdateData.append("avatar", this.state.avatar);
    
    let id = this.state.id
    axios
      .patch(process.env.REACT_APP_BACKEND_URL + `api/user/edit/${id}`, 
      // {
      //   pseudo: this.state.pseudo,
      //   email: this.state.email,
      //   region: this.state.region,
      //    avatar: this.state.avatar,
      // }, 
      formUpdateData,
      {
        withCredentials: true,
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
    console.log("avatar",this.state.avatar)
      // console.log(this.props.context.user._id)
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

    <label >Region:</label>
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

    <label htmlFor="avatar">Avatar</label>
        <input
          onChange={this.handleImage}
          name="avatar"
          type="file"
          id="avatar"
          //  value={this.state.avatar}
          />

        <button>Send</button>

    </form>
    )
  }
}

export default withRouter(EditUser);
