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

  // <div className="pokemons-list">
  //   {listItems.map((pokemon) => (
  //     <div key={pokemon.id} className='one-pokemon'>
  //     <Link to={`/pokedex/${pokemon.id}`}>
  //       <div className='pokemon-image'>
  //         <img src={pokemon.sprites.front_default} alt='pokemon-sprite'/>
  //       </div>
  //       <p className='name'>{capitalize(pokemon.name)}</p>
  //       <p className='id'>#{pokemon.id}</p>
  //     </Link>
  //     </div>
  //   ))}
  //   {isFetching && 'Fetching more list items...'}
  // </div>
  );
}

export default PokemonsList;
