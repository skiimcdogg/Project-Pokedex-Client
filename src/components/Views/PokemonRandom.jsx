import React from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter, Link } from "react-router-dom";


import "./../../styles/random.css"

class PokemonRandom extends React.Component {
  state = {
    pokemon: null,
    user: null,
  };

  componentDidMount() {

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); 
    }
  let randompokemon = getRandomIntInclusive(1,900)
  console.log(randompokemon)
    let id = randompokemon;
    apiHandler
      .getPokemonDetails(id)
      .then((response) => {
        // console.log("RESPONSE", response);
        this.setState({ pokemon: response });
        
      })
      .catch((error) => {
        console.log(error);
      }); 
    
  }

  render() {
    if (this.state.pokemon === null) {
      return <div>Loading...</div>;
    }
    const convertWeight = Number(this.state.pokemon.weight) / 10;
    
    return (
      // <Link exact to="/">
      <div className="pokemon-random-card">
        
          <img
            src={this.state.pokemon.sprites.front_default}
            alt={this.state.pokemon.name}
          />
          
          <h2 className="single-pokemon-random">{this.state.pokemon.name}</h2>

          <div className="random-pokemon-types">
          {this.state.pokemon.types.map((item, index) => (
            // <span >
             <div key={index}> <img src={`/images/${item.type.name}.png`} alt={`${item.type.name}`}/> </div>
              /* </span> */
            
          ))}
          </div>

          <div className="random-height-weight">
          <p><b>height:</b> {this.state.pokemon.height}0cm</p>
          <p><b>weight:</b> {convertWeight}kg</p>
          </div>

      </div>
      // </Link>
    );
  }
}
export default withRouter(PokemonRandom);
