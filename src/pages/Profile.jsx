import React, { Component } from 'react'
import NavMain from '../components/NavMain'
import UserDetail from './../components/UserDetail'
import PokemonsTeam from './../components/PokemonsTeam'
import FavoritesPokemons from './../components/FavoritesPokemons'
import EditUser from './../components/Forms/EditUser'
import { withUser } from "./../components/Auth/withUser"

class Profile extends Component{
  state = {
    user: null,
    formVisibile: false
  };

  componentDidMount() {
      // console.log(this.props.context.user)

    this.setState({ user: this.props.context.user})
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
            <EditUser handleDisplayFormFn={this.handleDisplayForm} />
          </div>
        )}
        <PokemonsTeam team={this.state.user.pokeTeam}/>
        <FavoritesPokemons favorites={this.state.user.pokeFav}/>
      </div>
    );
  }
};

export default withUser(Profile);
