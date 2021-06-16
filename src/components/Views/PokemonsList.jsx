import React from 'react';
import { Link } from 'react-router-dom';

import './../../styles/pokedex.css';

function PokemonsList(props) {
  const { pokemons } = props;

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

  return (
    <div className='one-pokemon'>
      <Link to={`/pokedex/${pokemons.id}`}>
        <div className='pokemon-image'>
          <img src={pokemons.sprites.front_default} alt=''/>
        </div>
        <p className='name'>{capitalize(pokemons.name)}</p>
        <p className='id'>#{pokemons.id}</p>
      </Link>
    </div>
  );
}

export default PokemonsList;
