import React from "react";
import { Link } from "react-router-dom";

function PokemonsList(props) {
  //  console.log("PROPS", props.pokemons)

  return (
    <div>
      <div className="pokemons">
        <div className="one-pokemon">
          <Link to={`/pokedex/${props.pokemons.id}`}>
            <img src={props.pokemons.sprites.front_default} alt="" />
          </Link>
          <p>{props.pokemons.name}</p>
          {props.pokemons.types.map((item) => (
            <p key={item.type.name}>{item.type.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PokemonsList;
