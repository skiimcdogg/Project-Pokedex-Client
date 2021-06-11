import React, { Component } from 'react';

import PokemonBoxTeam from './PokemonBoxTeam';
import apiHandler from '../api/apiHandler';

class PokemonsTeam extends Component {
  state = {
    team: [],
  };

  componentDidMount() {
    this.setState({ team: this.props.team });
  }

  deletePokemon = (id) => {
    apiHandler
      .handleDeleteTeam(id)
      .then((response) => {
        console.log(response);
        this.setState({ team: response.pokeTeam });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {


    if (this.state.team === []) {
      return <div>You have no pokemon in your team yet</div>;
    }
    return (
      <div className='team-container'>
        <h1 className='styling-title'>Your team</h1>
        <div className='team-pokemon'>
          {this.state.team.map((item, index) => (
            <PokemonBoxTeam
              key={index}
              pokemon={item}
              deletePokemon={this.deletePokemon}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PokemonsTeam;
