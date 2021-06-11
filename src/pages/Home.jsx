import React from 'react';

import NavMain from '../components/NavMain';
import Footer from '../components/Footer';
import PokemonRandom from '../components/Views/PokemonRandom';
import apiHandler from '../api/apiHandler';

class Home extends React.Component {
  state = {
    pokemon: null,
  };

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
        this.setState({ pokemon: response });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { pokemon } = this.state;

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
        </div>
        <Footer randomPokemon={this.randomPokemon} />
      </div>
    );
  }
}

export default Home;
