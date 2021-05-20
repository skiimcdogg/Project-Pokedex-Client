import React, { Component } from 'react'

class FavoritesPokemons extends Component {
    state = {
        favorites: null
      };

    render() {
        if (this.state.favorites === null) {
            return <div>You have no favorite Pokemon</div>;
          }

        return (
            <div>
                
                  <h1>Your favorites:</h1>
                  {this.props.team.map((pokemon) => {
                
                return (
                <div key={pokemon._id}>
                  <h2>{pokemon.name} </h2>
                  <img src={pokemon.image}/>
                </div>
                )} 
              )}

            </div>
        )
    }
}

export default FavoritesPokemons;
