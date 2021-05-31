import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";

function FormFav (props) {
 

 let typesArray= props.pokemon.types.map((item)=>item.type.name)
 console.log(typesArray)

 let statsArray= props.pokemon.stats.map((item)=>item.stat.name)
 console.log(statsArray)

 let baseStatsArray= props.pokemon.stats.map((item)=>item.base_stat)
 console.log(baseStatsArray)

 let movesArray= props.pokemon.moves.map((item)=>item.move.name)
 console.log(movesArray)

 

  //WHEN USER CLICKS ON SUBMIT SENDS THE DATA TO THE DATABASE THROUGH AXIOS CALL
  let handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle submit is working");
   

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "api/pokemons/createFav", {
        name:props.pokemon.name,
        height:props.pokemon.height,
        weight:props.pokemon.weight,
        image:props.pokemon.sprites.front_default,
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* ENCTYPE MULTIPART HANDLES FILE UPLOAD  */}
        <div>
          
          <button>Submit Fav</button>
        </div>
      </form>
    );
  }


export default withRouter(FormFav);
