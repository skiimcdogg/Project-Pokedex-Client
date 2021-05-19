import React from "react";
import NavMain from '../components/NavMain'
import UserDetail from './../components/UserDetail'
import PokemonsTeam from './../components/PokemonsTeam'
import FavoritesPokemons from './../components/FavoritesPokemons'

class Profile extends React.Component{
  render() {
    return (
      <div>
        <h1>Protected profile</h1>
        <NavMain />
        <UserDetail />
        <PokemonsTeam />
        <FavoritesPokemons />
      </div>
    );
  }
};

export default Profile;
