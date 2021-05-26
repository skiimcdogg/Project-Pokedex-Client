import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class FormFav extends Component {
  state = {
    name: '',
    types: [],
    height: 0,
    weight: 0,
    stats: [],
    base_stat: [],
    moves: [],
    image: ''
  };

  //TAKES THE VALUE THAT THE USER IS TYPING AND SETS IT IN THE STATE
  handleChange = (event) => {
    const key = event.target.name;
    this.setState({ [key]: event.target.value });
  };

  handleImage = (event) => {
    const file = event.target.files[0]; // Get the value of file input
    console.log(file);
    // console.log(file, "this is the file");
    this.setState({ image: file });
  };

  //WHEN USER CLICKS ON SUBMIT SENDS THE DATA TO THE DATABASE THROUGH AXIOS CALL
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle submit is working");
    const formData = new FormData();

    formData.append("name", this.state.name);
    formData.append("image", this.state.image);
    formData.append("height", this.state.height);
    

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "api/pokemons/createFav", formData, {
        withCredentials: true,
      })
      .then((response) => {
        //REDIRECT FRONT END
        this.props.history.push(`/profile`);
      })
      .catch((error) => {
        console.log("ERROR",error);
        this.setState({ message: error.response.data.message });
      });
  };

  handleEmailListChange= (index, event)=> {
    var types = this.state.types.slice(); // Make a copy of the emails first.
    types[index] = event.target.value; // Update it with the modified email.
    this.setState({types: types}); // Update the state.
}

  render() {
      console.log("POKEMON DE DETALS", this.props.pokemon)

    return (
      <form onSubmit={this.handleSubmit} enctype="multipart/form-data">
        {/* ENCTYPE MULTIPART HANDLES FILE UPLOAD  */}
        <div className="fav-form">
          
        <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              onChange={this.handleChange}
              value={this.props.pokemon.data.name}
              name="name"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="image">Image</label>
            <input
              id="image"
              name="image"
              value={this.props.pokemon.data.image}
              onChange={this.handleImage}
              type="file"
            />
          </div>
         
          <div>
            <label htmlFor="height">Height</label>
            <input
              id="height"
              onChange={this.handleChange}
              value={this.props.pokemon.data.height}
              name="height"
              type="number"
            />
          </div>
          <div>
        {
          this.props.pokemon.data.types.map((type) => {
            <div key={this.props.pokemon.id}>
              <button onClick={this.handleEmailListChange.bind(this,type.key)}/>
            </div>
          })
        }
      </div>
          
          
          <button>Submit</button>
        </div>
      </form>
    );
  }
}

export default withRouter(FormFav);
