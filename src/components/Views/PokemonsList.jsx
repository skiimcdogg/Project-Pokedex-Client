import React from "react";
import { Link } from "react-router-dom";
import "./../../styles/pokedex.css";

function PokemonsList(props) {
  //  console.log("PROPS", props.pokemons)

  return (
    <div className="one-pokemon">
      <Link to={`/pokedex/${props.pokemons.id}`}>
        <img src={props.pokemons.sprites.front_default} alt="" />
      </Link>
      <p className="name">{props.pokemons.name}</p>
      <div className="types">
      {props.pokemons.types.map((item) => (
          <p key={item.type.name}>{item.type.name}</p>
          ))}
          </div>
    </div>
  );
}

export default PokemonsList;
