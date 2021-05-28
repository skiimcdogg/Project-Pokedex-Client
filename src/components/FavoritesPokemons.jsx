import React, { Component } from "react";
import PokemonBoxFav from './PokemonBoxFav'

class FavoritesPokemons extends Component {
  state = {
    favorites: null,
    formVisibile: false
  
  };

  componentDidMount() {
    console.log(this.props.favorites);

    this.setState({ favorites: this.props.favorites });
  }

  handleDisplayForm = () => {
    this.setState({ formVisibile: !this.state.formVisibile });
  };

  render() {
    if (this.state.favorites === null) {
      return <div>You have no favorite Pokemon</div>;
    }

    return (
      <div>
        <h1>Your favorites:</h1>

        {this.props.favorites
          .map((item, index) => <PokemonBoxFav key={index} pokemon={item}/>)
        }
      </div> 
    );
  }
}

export default FavoritesPokemons;
