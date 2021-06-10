import React from 'react';
import { withRouter } from 'react-router-dom';

import { withUser } from './Auth/withUser';
import trashLogo from './../styles/images/trash.png';

function PokemonBoxFav(props) {
  const { pokemon, deletePokemon } = props;

  return (
    <div className='pokemon-box'>
      <img src={pokemon.image} alt='one of your favorite pokemons' />
      <h2>{pokemon.name} </h2>
      <button
        className='no-style-btn'
        onClick={() => deletePokemon(pokemon._id)}
      >
        <img
          className='trash-logo'
          src={trashLogo}
          alt='delete logo'
        />
      </button>
    </div>
  );
}

export default withRouter(withUser(PokemonBoxFav));
