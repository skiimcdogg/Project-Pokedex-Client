import apiHandler from '../../api/apiHandler';
import React from 'react';
import { withRouter } from 'react-router-dom';

function FormFav(props) {
  let typesArray = props.pokemon.types.map((item) => item.type.name);

  let statsArray = props.pokemon.stats.map((item) => item.stat.name);

  let baseStatsArray = props.pokemon.stats.map((item) => item.base_stat);

  let movesArray = props.pokemon.moves.map((item) => item.move.name);

  //WHEN USER CLICKS ON SUBMIT SENDS THE DATA TO THE DATABASE THROUGH AXIOS CALL
  let handleSubmit = (event) => {
    event.preventDefault();
    console.log('handle submit is working');

    const Body = {
      name: props.pokemon.name,
      height: props.pokemon.height,
      weight: props.pokemon.weight,
      image: props.pokemon.sprites.front_default,
      types: typesArray,
      stats: statsArray,
      base_stat: baseStatsArray,
      moves: movesArray,
    };

    apiHandler
      .handleFavSubmit(Body)
      .then((response) => {
        //REDIRECT FRONT END
        props.history.push(`/profile`);
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {/* ENCTYPE MULTIPART HANDLES FILE UPLOAD  */}
      <div>
        <button>FAVORITE</button>
      </div>
    </form>
  );
}

export default withRouter(FormFav);
