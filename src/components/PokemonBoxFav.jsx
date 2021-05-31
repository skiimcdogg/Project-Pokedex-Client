import React, { Component } from "react";
import EditPokemon from "./Forms/EditPokemon";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { withUser } from "./Auth/withUser";

class PokemonBoxFav extends Component {
  // state = {
  //   formVisibile: false,
  // };

  refreshPage = () => {
    window.location.reload(false);
  };

  deletePokemon = (id) => {
    console.log("ID FROM DELETE:", id);
    console.log("props", this.props);

    axios
      .delete(
        process.env.REACT_APP_BACKEND_URL + `api/user/deleteFav/${id}/pokemon`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        // console.log(response.data);

        this.refreshPage();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <h2>{this.props.pokemon.name} </h2>
        <img src={this.props.pokemon.image} alt="" />

        <button
          className="button"
          onClick={() => this.deletePokemon(this.props.pokemon._id)}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default withRouter(withUser(PokemonBoxFav));
