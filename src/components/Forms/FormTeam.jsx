import React from 'react';
import { withRouter } from 'react-router-dom';
import { withUser } from '../Auth/withUser';

import apiHandler from '../../api/apiHandler';

function FormTeam(props) {
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
      .handleTeamSubmit(Body)
      .then((response) => {
        //REDIRECT FRONT END
        // props.history.push(`/profile`);
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  };

  let teamFull;
  if (props.user === null) {
    teamFull = false;
  } else if (props.user.pokeTeam.length < 6) {
    teamFull = false;
  } else {
    teamFull = true;
  }

  return (
    <div>
      <React.Fragment>
        {!teamFull && (
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div>
              <button>TEAM</button>
            </div>
          </form>
        )}
        {teamFull && (
          <p>
            You already have 6 Pokemons in your team! You can edit your Team in
            your profile!(Link here)
          </p>
        )}
      </React.Fragment>
    </div>
  );
}

export default withRouter(withUser(FormTeam));
