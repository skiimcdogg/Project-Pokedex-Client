import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withUser } from "./Auth/withUser";

import trashLogo from "./../styles/images/trash.png"

class PokemonBoxFav extends Component {

  render() {
    return (
      <div className="pokemon-box">
        <img src={this.props.pokemon.image} alt="" />
        <h2>{this.props.pokemon.name} </h2>
        <button
          className="no-style-btn"
          onClick={() => this.props.deletePokemon(this.props.pokemon._id)}
        >
           <img className="trash-logo" src={trashLogo} alt="logo de supression pokemon"/>
        </button>
      </div>
    );
  }
}

export default withRouter(withUser(PokemonBoxFav));
