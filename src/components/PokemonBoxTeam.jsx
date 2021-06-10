import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import EditPokemon from './Forms/EditPokemon';
import apiHandler from '../api/apiHandler';
import './../styles/pokemonBox.css';
import trashLogo from './../styles/images/trash.png';
import brushLogo from './../styles/images/edit.png';

class PokemonBoxTeam extends Component {
  state = {
    formVisibile: false,
    pokemon: this.props.pokemon,
    name: this.props.pokemon.name,
  };

  handleDisplayForm = () => {
    const { formVisibile } = this.state;

    this.setState({ formVisibile: !formVisibile });
  };

  handleChange = (valueFromChange) => {
    this.setState({ name: valueFromChange });
  };

  handleSubmit = (event) => {
    const { pokemon } = this.props;
    const { name } = this.state;
    let id = pokemon._id;

    apiHandler
      .handleEditPokemon(id, { name: name })
      .then((response) => {
        this.setState({ pokemon: response });
        this.handleDisplayForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { pokemon, deletePokemon } = this.props;

    return (
      <div className='pokemon-box'>
        <img src={pokemon.image} alt='' />
        <h2>{pokemon.name} </h2>
        <button className="no-style-btn" onClick={this.handleDisplayForm}>
          <img
            className="brush-logo"
            src={brushLogo}
            alt="delete logo"
          />
        </button>
        {this.state.formVisibile && (
          <div>
            <EditPokemon
              name={this.state.name}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        )}
        <button
          className="no-style-btn"
          onClick={() => deletePokemon(pokemon._id)}
        >
          <img
            className="trash-logo"
            src={trashLogo}
            alt="logo de supression pokemon"
          />
        </button>
      </div>
    );
  }
}

export default withRouter(PokemonBoxTeam);
