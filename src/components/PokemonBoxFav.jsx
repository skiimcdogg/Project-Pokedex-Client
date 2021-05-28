import React, { Component } from "react";
import EditPokemon from './Forms/EditPokemon'
import axios from "axios";
import { withRouter } from "react-router-dom";
import { withUser } from "./Auth/withUser";

function PokemonBoxFav(props) {
   
  const refreshPage = ()=> {
        window.location.reload(false);
      }

    const deletePokemon = (id) => {
        console.log("ID FROM DELETE:", id)
        console.log("props",props);
       
      
        axios
          .delete(process.env.REACT_APP_BACKEND_URL + `api/user/deleteFav/${id}/pokemon`,{
            withCredentials: true,
          })
          .then((response) => {
            // console.log(response.data);
            
            refreshPage()
        
          })
          .catch((error) => {
            console.log(error);
          });
         
      };

    return (
      <div>
         
        <h2>{props.pokemon.name} </h2>
        <img src={props.pokemon.image} alt="" />
        
        <button className="button" onClick={() => deletePokemon(props.pokemon._id)}>
              Delete
            </button>
        
      </div>
    );
  }


export default withRouter(withUser(PokemonBoxFav));
