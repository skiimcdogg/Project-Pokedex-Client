import React from 'react';
import { withRouter } from 'react-router-dom';

import apiHandler from '../../api/apiHandler';

function FormFav(props) {

  const { pokemon } = props;

  let typesArray = pokemon.types.map((item) => item.type.name);
  let statsArray = pokemon.stats.map((item) => item.stat.name);
  let baseStatsArray = pokemon.stats.map((item) => item.base_stat);
  let movesArray = pokemon.moves.map((item) => item.move.name);

  //WHEN USER CLICKS ON SUBMIT SENDS THE DATA TO THE DATABASE THROUGH AXIOS CALL
  let handleSubmit = (event) => {
    event.preventDefault();

    const Body = {
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      image: pokemon.sprites.front_default,
      types: typesArray,
      stats: statsArray,
      base_stat: baseStatsArray,
      moves: movesArray,
    };

    apiHandler
      .handleFavSubmit(Body)
      .then((response) => {
        //REDIRECT FRONT END
        // history.push(`/profile`);
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <div>
        <button>FAVORITE</button>
      </div>
    </form>
  );
}

export default withRouter(FormFav);
