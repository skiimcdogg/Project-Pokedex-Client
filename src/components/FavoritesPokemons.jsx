import React, { Component } from 'react';

import PokemonBoxFav from './PokemonBoxFav';
import apiHandler from '../api/apiHandler';

class FavoritesPokemons extends Component {
  state = {
    favorites: [],
    formVisibile: false,
  };

  componentDidMount() {
    const { favorites } = this.props;
    this.setState({ favorites: this.props.favorites });
  }

  deletePokemon = (id) => {
    apiHandler
      .handleDeleteFav(id)

      .then((response) => {
        this.setState({ favorites: response.pokeFav });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleDisplayForm = () => {
    const { formVisibile } = this.state;
    this.setState({ formVisibile: !formVisibile });
  };

  render() {

    const { favorites } = this.state;

    if (favorites === []) {
      return <div>You have no favorite Pokemon</div>;
    }

    return (
      <div className='team-container'>
        <h1 className='styling-title'>Your favorites</h1>
        <div className='team-pokemon'>
          {favorites.map((item, index) => (
            <PokemonBoxFav
              key={index}
              pokemon={item}
              deletePokemon={this.deletePokemon}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default FavoritesPokemons;
