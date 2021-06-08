import React, { Component } from 'react';
import EditPokemon from './Forms/EditPokemon';
import { withRouter } from 'react-router-dom';
import { withUser } from './Auth/withUser';
import apiHandler from '../api/apiHandler';

import './../styles/pokemonBox.css';
import trashLogo from './../styles/images/trash.png';
import brushLogo from './../styles/images/edit.png';

class PokemonBoxTeam extends Component {
  state = {
    formVisibile: false,
    pokemon: null,
    name: '',
  };

  handleDisplayForm = () => {
    this.setState({ formVisibile: !this.state.formVisibile });
  };

  handleChange = (valueFromChange) => {
    this.setState({ name: valueFromChange });
  };

  componentDidMount() {
    this.setState({
      pokemon: this.props.pokemon,
      name: this.props.pokemon.name,
    });
  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.name !== this.state.name) {
      console.log("PREVSTATE",prevState);
      

  this.handleSubmit = (event) => {
    // event.preventDefault();
    let id = this.props.pokemon._id;

        apiHandler
        .handleEditPokemon(id, { name: this.state.name })
        .then((response) => {
          console.log(response);
          this.setState({ pokemon: response });
          this.handleDisplayForm();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  };

  render() {
    if (this.state.name === "") {
      return <div>Loading...</div>;
    }
    return (
      <div className="pokemon-box">
        <img src={this.props.pokemon.image} alt="" />
        <h2>{this.props.pokemon.name} </h2>
        <button className="no-style-btn" onClick={this.handleDisplayForm}>
          <img
            className="brush-logo"
            src={brushLogo}
            alt="logo de supression pokemon"
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
          onClick={() => this.props.deletePokemon(this.props.pokemon._id)}
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

export default withRouter(withUser(PokemonBoxTeam));
