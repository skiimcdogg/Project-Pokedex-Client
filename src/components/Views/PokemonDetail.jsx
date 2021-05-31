import React from "react";
// import axios from "axios";
import FormFav from "../Forms/FormFav";
import FormTeam from "../Forms/FormTeam";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";

class PokemonDetail extends React.Component {
  state = {
    pokemon: null,
    user: null,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    //  axios
    //   .get(process.env.REACT_APP_BACKEND_URL + `api/pokemons/${id}`)
    apiHandler
      .getPokemonDetails(id)
      .then((response) => {
        console.log("RESPONSE", response);
        this.setState({ pokemon: response });
      })
      .catch((error) => {
        console.log(error);
      });

    // axios.get(process.env.REACT_APP_BACKEND_URL + "api/user", {
    //   withCredentials: true,
    // });

    apiHandler
      .getUser()
      .then((response) => {
        console.log("RESPONSE DB", response);
        // this.setState({ user: response.data });
        this.setState({ user: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log("I am upodating, look at my beautiful props changing !", this.props.match.params.id, "what do i do with this ?")

    if (prevProps.match.params.id !== this.props.match.params.id) {
      let id = this.props.match.params.id;

      // axios
      //   .get(process.env.REACT_APP_BACKEND_URL + `api/pokemons/${id}`)

        apiHandler
      .getPokemonDetails(id)
        .then((response) => {
          this.setState({ pokemon: response });
        })
        .catch((error) => {
          console.log(error);
        });

        // axios
      //   .get(process.env.REACT_APP_BACKEND_URL + "api/user", {
      //     withCredentials: true,
      //   })
        apiHandler
        .getUser()
        .then((response) => {
          console.log("RESPONSE DB", response);
          this.setState({ user: response });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    if (this.state.pokemon === null) {
      return <div>Loading...</div>;
    }
    // console.log("DATA", this.state.pokemon.data.types, this.state.pokemon.data.types[0].type.name);
    console.log("STATE", this.state)
    return (
      <div>
        <FormFav pokemon={this.state.pokemon} />
        <FormTeam pokemon={this.state.pokemon} user={this.state.user} />
        <div>
          <img
            src={this.state.pokemon.sprites.front_default}
            alt={this.state.pokemon.name}
          />
          <h2 className="single-pokemon">{this.state.pokemon.name}</h2>
          {this.state.pokemon.types.map((item) => (
            <p key={item.type.name}>{item.type.name}</p>
          ))}
        </div>
      </div>
    );
  }
}
export default withRouter(PokemonDetail);
