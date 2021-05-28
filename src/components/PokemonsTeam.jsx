import React, { Component } from "react";
import PokemonBoxTeam from "./PokemonBoxTeam";

class PokemonsTeam extends Component {
  state = {
    team: null,
  };

  componentDidMount() {
    console.log(this.props.team);

    this.setState({ team: this.props.team });
  }

  render() {
    if (this.state.team === null) {
      return <div>You have no pokemon in your team yet</div>;
    }

    return (
      <div>
        <h1>Your team:</h1>
        {/* {this.props.team.map((pokemon) => {
                
                return (
                <div key={pokemon._id}>
                  <h2>{pokemon.name} </h2>
                  <img src={pokemon.image} alt=""/>
                  <span>{pokemon.types} </span>
                </div>
                )} 
              )} */}

        {this.props.team.map((item, index) => (
          <PokemonBoxTeam key={index} pokemon={item} />
        ))}
      </div>
    );
  }
}

export default PokemonsTeam;
