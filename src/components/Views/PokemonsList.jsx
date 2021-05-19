import React from "react";

function PokemonsList(props) {
  return (
    <div>
      <div className="pokemons">
        {props.pokemons.map((onePokemon) => {
          return (
            <div key={onePokemon._id} className="one-pokemon">
              <Link to={`/pokemons/${onePokemon._id}`}>
                <img src={onePokemon.pictureUrl} alt="" />
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
