import React, { Component } from 'react';
// import axios from 'axios';
import apiHandler from "../../api/apiHandler";

class EditUser extends Component {
  state = {
    name: this.props.pokemon.name
    
  }

  handleChange = (event) => {
    const key = event.target.name
    this.setState({ [key]: event.target.value })
  }

    handleSubmit = (event) => {
    // event.preventDefault()
     console.log("clicked!")
     console.log(this.props.pokemon._id)
    let id = this.props.pokemon._id
    

    // axios
    //   .patch(process.env.REACT_APP_BACKEND_URL + `api/user/edit/${id}/pokemon`, {
    //     name: this.state.name,
       
    //   },{
    //     withCredentials: true,
    //   })

      apiHandler
      .handleEditPokemon(id, {name: this.state.name})
      .then((response) => {
        console.log(response)
        
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
       console.log(this.props.pokemon)
      return(
    <form onSubmit={this.handleSubmit}>
        <h2>Edit your pokemon's name</h2>


    <label htmlFor="name">Name</label>
        <input
          onChange={this.handleChange}
          name="name"
          type="text"
          value={this.state.name}
          id="name"
        />

        <button>Send</button>

    </form>
    )
  }
}

export default EditUser;