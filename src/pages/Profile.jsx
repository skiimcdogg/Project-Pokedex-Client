import React, { Component } from 'react'
import NavMain from '../components/NavMain'
import UserDetail from './../components/UserDetail'
import PokemonsTeam from './../components/PokemonsTeam'
import FavoritesPokemons from './../components/FavoritesPokemons'
import EditUser from './../components/Forms/EditUser'
import apiHandler from '../api/apiHandler'

import "./../styles/profile.css"

class Profile extends Component{
  state = {
    user: null,
    formVisibile: false,
    pseudo: "",
    email: "",
    region: "",
    avatar: ""
  };

  componentDidMount() {
       apiHandler
     .getUser()
      .then((response) => {
            // console.log("RESPONSE DB",response)
            this.setState({
              user: response,
              email: response.email,
              pseudo: response.pseudo,
              region: response.region,
              avatar: response.avatar
            });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDisplayForm = () => {
    this.setState({ formVisibile: !this.state.formVisibile });
  };

    handleImage = (event) => {
    const file = event.target.files[0];
    // console.log(file, "this is the file");
    this.setState({ avatar: file });
  };

  handleChange = (event) => {
    console.log("value change", event.target.value);
    const key = event.target.name;
    this.setState({ [key]: event.target.value });
  };

  handleSelect = (event) => {
    console.log("valueFromChange", event.target.value);
    this.setState({ region: event.target.value });
  };

    handleSubmit = (event) => {
    event.preventDefault()
    const formUpdateData = new FormData();

    formUpdateData.append("pseudo", this.state.pseudo);
    formUpdateData.append("email", this.state.email);
    formUpdateData.append("region", this.state.region);
    formUpdateData.append("avatar", this.state.avatar);

    let id = this.state.user._id;
    
    apiHandler
      .handleEditUser(id, formUpdateData)
      .then((response) => {
        console.log("------------", response);
        this.setState({ user: response });
        this.handleDisplayForm()
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    if (this.state.user === null) {
      return <div>Fetching your infos...</div>;
    }
    return (
      <div>
        <NavMain />
        <UserDetail user={this.state.user}/>
        <button onClick={this.handleDisplayForm}>
          Update your infos
        </button>
        {this.state.formVisibile && (
          <div>
            <EditUser
            // props //
            pseudo={this.state.pseudo}
            email={this.state.email}
            region={this.state.region}
            avatar={this.state.avatar}
            // functions //
            handleImage={this.handleImage}
            handleChange={this.handleChange}
            handleSelect={this.handleSelect}
            handleSubmit={this.handleSubmit}
            />
          </div>
        )}
        <PokemonsTeam team={this.state.user.pokeTeam}/>
        <FavoritesPokemons favorites={this.state.user.pokeFav}/>
      </div>
    );
  }
};

export default Profile;
