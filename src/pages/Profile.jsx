import React, { Component } from 'react'
import NavMain from '../components/NavMain'
import UserDetail from './../components/UserDetail'
import PokemonsTeam from './../components/PokemonsTeam'
import FavoritesPokemons from './../components/FavoritesPokemons'
import EditUser from './../components/Forms/EditUser'
// import axios from "axios";
import apiHandler from '../api/apiHandler'


class Profile extends Component{
  state = {
    user: null,
    formVisibile: false,
  };

  componentDidMount() {
       apiHandler
     .getUser()
      .then((response) => {
            console.log("RESPONSE DB",response)
        // this.setState({ user: response.data });
        this.setState({ user: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDisplayForm = () => {
    this.setState({ formVisibile: !this.state.formVisibile });
  };

  render() {
    if (this.state.user === null) {
      return <div>Loading...</div>;
    }
// console.log("profile", this.state.user);
    return (
      <div>
        <NavMain />
        <UserDetail user={this.state.user}/>
        <button onClick={this.handleDisplayForm}>
          Update your infos
        </button>
        {this.state.formVisibile && (
          <div>
            <EditUser user={this.state.user} />
          </div>
        )}
        <PokemonsTeam team={this.state.user.pokeTeam}/>
        <FavoritesPokemons favorites={this.state.user.pokeFav}/>
      </div>
    );
  }
};

export default Profile;
