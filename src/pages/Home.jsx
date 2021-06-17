import React from 'react';

import NavMain from '../components/NavMain';
import Footer from '../components/Footer';
import PokemonRandom from '../components/Views/PokemonRandom';
import apiHandler from '../api/apiHandler';

class Home extends React.Component {
  state = {
    pokemon: null,
    displayMessage: true,
  };

  handleDisplayMessage = () => {
    this.setState({ displayMessage: false })
  }

  randomPokemon = () => {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
    let randompokemon = getRandomIntInclusive(1, 898);
    let id = randompokemon;
    apiHandler
      .getPokemonDetails(id)
      .then((response) => {
        this.setState({ pokemon: response});
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { pokemon, displayMessage } = this.state;

    return (
      <div>
        <NavMain />
        <div className='home-page'>
          <div className='random-container'>
            <PokemonRandom
              pokemon={pokemon}
              randomPokemon={this.randomPokemon}
            />
          </div>
          <div className="click-me-msg">
          {displayMessage && 
          ( <p className="msg-p"> Click Me !</p> ) }
          </div>
        </div>
        <Footer handleDisplayMessage={this.handleDisplayMessage} randomPokemon={this.randomPokemon} />
      </div>
    );
  }
}

export default Home;
