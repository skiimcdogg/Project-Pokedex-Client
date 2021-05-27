import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";

function FormTeam (props) {
 

 let typesArray= props.pokemon.data.types.map((item)=>item.type.name)
 console.log(typesArray)

 let statsArray= props.pokemon.data.stats.map((item)=>item.stat.name)
 console.log(statsArray)

 let baseStatsArray= props.pokemon.data.stats.map((item)=>item.base_stat)
 console.log(baseStatsArray)

 let movesArray= props.pokemon.data.moves.map((item)=>item.move.name)
 console.log(movesArray)

 

  //WHEN USER CLICKS ON SUBMIT SENDS THE DATA TO THE DATABASE THROUGH AXIOS CALL
  let handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle submit is working");
   

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "api/pokemons/createTeam", {
        name:props.pokemon.data.name,
        height:props.pokemon.data.height,
        weight:props.pokemon.data.weight,
        image:props.pokemon.data.sprites.front_default,
        types:typesArray,
        stats:statsArray,
        base_stat:baseStatsArray,
        moves:movesArray
      }, {
        withCredentials: true,
      })
      .then((response) => {
        //REDIRECT FRONT END
        props.history.push(`/profile`);
      })
      .catch((error) => {
        console.log("ERROR",error);
        
      });
  };



 
    return (
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        {/* ENCTYPE MULTIPART HANDLES FILE UPLOAD  */}
        <div>
          
          <button>Submit Team</button>
        </div>
      </form>
    );
  }


export default withRouter(FormTeam);
