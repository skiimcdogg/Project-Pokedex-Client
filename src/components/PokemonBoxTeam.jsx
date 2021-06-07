import React, { Component } from "react";
import EditPokemon from "./Forms/EditPokemon";
import { withRouter } from "react-router-dom";
import { withUser } from "./Auth/withUser";
import apiHandler from "../api/apiHandler";

import "./../styles/pokemonBox.css";

class PokemonBoxTeam extends Component {
  state = {
    formVisibile: false,
    pokemon: this.props.pokemon,
    name: this.props.pokemon.name
  };

  handleDisplayForm = () => {
    this.setState({ formVisibile: !this.state.formVisibile });
  };

  handleChange = (valueFromChange) => {
    this.setState({ name: valueFromChange })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let id = this.state.pokemon._id

      apiHandler
      .handleEditPokemon(id, {name: this.state.name})
      .then((response) => {
        console.log(response)
        this.setState({ pokemon: response })
        this.handleDisplayForm()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="pokemon-box">
        <img src={this.state.pokemon.image} alt="" />
        <h2>{this.state.pokemon.name} </h2>
        <button onClick={this.handleDisplayForm}>Update</button>
        {this.state.formVisibile && (
          <div>
            <EditPokemon
            name={this.state.name}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            />
          </div>
        )}
        <button
          className="button"
          onClick={() => this.props.deletePokemon(this.state.pokemon._id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default withRouter(withUser(PokemonBoxTeam));
