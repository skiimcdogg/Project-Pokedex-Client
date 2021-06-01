import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withUser } from "./Auth/withUser";

class PokemonBoxFav extends Component {

  render() {
    return (
      <div>
        <h2>{this.props.pokemon.name} </h2>
        <img src={this.props.pokemon.image} alt="" />

        <button
          className="button"
          onClick={() => this.props.deletePokemon(this.props.pokemon._id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default withRouter(withUser(PokemonBoxFav));
