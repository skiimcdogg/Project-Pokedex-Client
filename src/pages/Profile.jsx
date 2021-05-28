import React, { Component } from 'react'
import NavMain from '../components/NavMain'
import UserDetail from './../components/UserDetail'
import PokemonsTeam from './../components/PokemonsTeam'
import FavoritesPokemons from './../components/FavoritesPokemons'
import EditUser from './../components/Forms/EditUser'
import axios from "axios";


class Profile extends Component{
  state = {
    user: null,
    formVisibile: false,
  };

  componentDidMount() {
      // console.log(this.props.context.user)
      axios
      .get(process.env.REACT_APP_BACKEND_URL + "api/user",{
        withCredentials: true,
      })
      .then((response) => {
            // console.log("RESPONSE DB",response)
        this.setState({ user: response.data });
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
