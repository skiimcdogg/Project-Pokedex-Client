import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";

function FormTeam(props) {
  let typesArray = props.pokemon.types.map((item) => item.type.name);
  console.log(typesArray);

  let statsArray = props.pokemon.stats.map((item) => item.stat.name);
  console.log(statsArray);

  let baseStatsArray = props.pokemon.stats.map((item) => item.base_stat);
  console.log(baseStatsArray);

  let movesArray = props.pokemon.moves.map((item) => item.move.name);
  console.log(movesArray);

  //WHEN USER CLICKS ON SUBMIT SENDS THE DATA TO THE DATABASE THROUGH AXIOS CALL
  let handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle submit is working");
    const Body = {name: props.pokemon.name,
      height: props.pokemon.height,
      weight: props.pokemon.weight,
      image: props.pokemon.sprites.front_default,
      types: typesArray,
      stats: statsArray,
      base_stat: baseStatsArray,
      moves: movesArray,}

      apiHandler
      .handleTeamSubmit(Body) 
    // axios
    //   .post(
    //     process.env.REACT_APP_BACKEND_URL + "api/pokemons/createTeam",Body,{withCredentials: true,}
    //   )
      .then((response) => {
        //REDIRECT FRONT END
        // props.history.push(`/profile`);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };


  console.log("context user", props.user);

  let teamFull;
  if (props.user === null) {
    teamFull = false;
  } else if (props.user.pokeTeam.length < 6) {
    teamFull = false;
  } else {
    teamFull = true;
  }


  return (
    //  <div>salut bébé</div>
    <div>
      <React.Fragment>
        {!teamFull && (
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            {/* ENCTYPE MULTIPART HANDLES FILE UPLOAD  */}
            <div>
              <button>Submit Team</button>
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
