import React from 'react';
import { Link } from 'react-router-dom';

import './../../styles/pokedex.css';

function PokemonsList(props) {
  const { pokemons } = props;
  return (
    <div className='one-pokemon'>
      <Link to={`/pokedex/${pokemons.id}`}>
        <div className='pokemon-image'>
          <img src={pokemons.sprites.front_default} alt=''/>
        </div>
        <p className='name'>{pokemons.name}</p>
        <p className='id'>#{pokemons.id}</p>
      </Link>
    </div>
  );
}

export default PokemonsList;
