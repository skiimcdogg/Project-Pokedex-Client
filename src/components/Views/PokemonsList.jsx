import React from "react";
import { Link } from "react-router-dom";


function PokemonsList(props) {
    // console.log("PROPS", props)

  return (
    <div>
      <div className="pokemons">
        {props.pokemons.map((onePokemon) => {
          return (
            <div key={onePokemon._id} className="one-pokemon">
              <Link to={`/pokedex/${onePokemon._id}`}>
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
