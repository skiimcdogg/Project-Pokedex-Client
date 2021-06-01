import React, { Component } from "react";
import PokemonBoxFav from './PokemonBoxFav'
import apiHandler from "../api/apiHandler";

class FavoritesPokemons extends Component {
  state = {
    favorites: [],
    formVisibile: false
  };

  componentDidMount() {
    // console.log(this.props.favorites);
    this.setState({ favorites: this.props.favorites });
  }

  deletePokemon = (id) => {
    apiHandler
      .handleDeleteFav(id)

      .then((response) => {
        // console.log(response);
        this.setState({ favorites: response.pokeFav });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDisplayForm = () => {
    this.setState({ formVisibile: !this.state.formVisibile });
  };

  render() {
    if (this.state.favorites === []) {
      return <div>You have no favorite Pokemon</div>;
    }

    return (
      <div>
        <h1>Your favorites:</h1>

        {this.state.favorites
          .map((item, index) => <PokemonBoxFav key={index} pokemon={item} deletePokemon={this.deletePokemon}/>)
        }
      </div> 
    );
  }
}

export default FavoritesPokemons;
