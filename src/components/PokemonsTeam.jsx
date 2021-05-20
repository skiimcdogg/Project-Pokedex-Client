import React, { Component } from 'react'

class PokemonsTeam extends Component {
    state = {
        team: null
      };

    render() {
        if (this.state.team === null) {
            return <div>You have no pokemon in your team yet</div>;
          }

        return (
            <div>
                
                  <h1>Your team:</h1>
                  {this.props.team.map((pokemon) => {
                
                return (
                <div key={pokemon._id}>
                  <h2>{pokemon.name} </h2>
                  <img src={pokemon.image}/>
                  <span>{pokemon.types} </span>
                </div>
                )} 
              )}

            </div>
        )
    }
}

export default PokemonsTeam;
