import React from "react";
import { Link } from "react-router-dom";


function PokemonsList(props) {
    console.log("PROPS", props)

  return (
    <div>
      <div className="pokemons">
        {props.pokemons.map((onePokemon) => {
          return (
            <div key={onePokemon.id} className="one-pokemon">
              <Link exact to={`/pokedex/${onePokemon.id}`}>

               
                <img src={onePokemon.sprites.front_default} alt="" />
              </Link>
              <p>{onePokemon.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PokemonsList;
