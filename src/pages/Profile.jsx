import React, { Component } from 'react'
import NavMain from '../components/NavMain'
import UserDetail from './../components/UserDetail'
import PokemonsTeam from './../components/PokemonsTeam'
import FavoritesPokemons from './../components/FavoritesPokemons'
import { withUser } from "./../components/Auth/withUser"

class Profile extends Component{
  state = {
    user: null,
  };

  componentDidMount() {
          console.log(this.props.context.user)

    this.setState({ user: this.props.context.user})
  }

  render() {
    if (this.state.user === null) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <NavMain />
        <UserDetail user={this.state.user}/>
        <PokemonsTeam team={this.state.user.pokeTeam}/>
        <FavoritesPokemons favorites={this.state.user.pokeFav}/>
      </div>
    );
  }
};

export default withUser(Profile);
