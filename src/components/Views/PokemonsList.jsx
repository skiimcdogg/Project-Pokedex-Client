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
      <p className="id">#{props.pokemons.id}</p>
    </div>
  );
}

export default PokemonsList;
