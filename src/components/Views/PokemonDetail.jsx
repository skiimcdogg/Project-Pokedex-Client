import React from "react";
import FormFav from "../Forms/FormFav";
import FormTeam from "../Forms/FormTeam";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";

import "./../../styles/pokemonDetail.css"

class PokemonDetail extends React.Component {
  state = {
    pokemon: null,
    user: null,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    apiHandler
      .getPokemonDetails(id)
      .then((response) => {
        // console.log("RESPONSE", response);
        this.setState({ pokemon: response });
        this.props.handleDetailClick()
      })
      .catch((error) => {
        console.log(error);
      });


    apiHandler
      .getUser()
      .then((response) => {
        // console.log("RESPONSE DB", response);
        // this.setState({ user: response.data });
        this.setState({ user: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevProps.match.params.id !== this.props.match.params.id) {
      let id = this.props.match.params.id;

        apiHandler
      .getPokemonDetails(id)
        .then((response) => {
          this.setState({ pokemon: response });
        })
        .catch((error) => {
          console.log(error);
        });

        apiHandler
        .getUser()
        .then((response) => {
          // console.log("RESPONSE DB", response);
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
    const convertWeight = Number(this.state.pokemon.weight) / 10;
    return (
      <div className="pokemon-card">
        
          <img
            src={this.state.pokemon.sprites.front_default}
            alt={this.state.pokemon.name}
          />
          
          <h2 className="single-pokemon">{this.state.pokemon.name}</h2>

          <div className="pokemon-types">
          {this.state.pokemon.types.map((item, index) => (
            <span key={index}>{item.type.name}</span>
          ))}
          </div>

          <div className="height-weight">
          <p><b>height:</b> {this.state.pokemon.height}0cm</p>
          <p><b>weight:</b> {convertWeight}kg</p>
          </div>

        <hr/>

          <div className="pokemon-stats">
            <div>
            {this.state.pokemon.stats.map((item, index) => (
            <p key={index}><span>{item.stat.name}</span></p>
            ))}
            </div>

            <div>
            {this.state.pokemon.stats.map((item, index) => (
            <p key={index}>{item.base_stat}</p>
            ))}
            </div>
          </div>

        <div className="pokemon-btns">
        <FormFav pokemon={this.state.pokemon} />
        <FormTeam pokemon={this.state.pokemon} user={this.state.user} />
        </div>

      </div>
    );
  }
}
export default withRouter(PokemonDetail);
