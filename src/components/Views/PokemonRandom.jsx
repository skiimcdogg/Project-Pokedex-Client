import React from "react";
import { withRouter } from "react-router-dom";

import "./../../styles/random.css"

class PokemonRandom extends React.Component {
  
  componentDidMount() {
this.props.randomPokemon();
}

  render() {
    if (this.props.pokemon === null) {
      return <div>Loading...</div>;
    }
    const convertWeight = Number(this.props.pokemon.weight) / 10;
    
    return (
      <div className="pokemon-random-card">
        
          <img
            src={this.props.pokemon.sprites.front_default}
            alt={this.props.pokemon.name}
          />
          
          <h2 className="single-pokemon-random">{this.props.pokemon.name}</h2>

          <div className="random-pokemon-types">
          {this.props.pokemon.types.map((item, index) => (
             <div key={index}> <img src={`/images/${item.type.name}.png`} alt={`${item.type.name}`}/> </div>            
          ))}
          </div>

          <div className="random-height-weight">
          <p><b>height:</b> {this.props.pokemon.height}0cm</p>
          <p><b>weight:</b> {convertWeight}kg</p>
          </div>

      </div>
    );
  }
}
export default withRouter(PokemonRandom);
