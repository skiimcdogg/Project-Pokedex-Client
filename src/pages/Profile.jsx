import React, { Component } from 'react';

import NavMain from '../components/NavMain';
import UserDetail from './../components/UserDetail';
import PokemonsTeam from './../components/PokemonsTeam';
import FavoritesPokemons from './../components/FavoritesPokemons';
import EditUser from './../components/Forms/EditUser';
import apiHandler from '../api/apiHandler';
import './../styles/profile.css';
import './../styles/user.css';

class Profile extends Component {
  state = {
    user: null,
    formVisibile: false,
    pseudo: '',
    email: '',
    region: '',
    avatar: '',
  };

  componentDidMount() {
    apiHandler
      .getUser()
      .then((response) => {
        this.setState({
          user: response,
          email: response.email,
          pseudo: response.pseudo,
          region: response.region,
          avatar: response.avatar,
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
    this.setState({ avatar: file });
  };

  handleChange = (event) => {
    const key = event.target.name;
    this.setState({ [key]: event.target.value });
  };

  handleSelect = (event) => {
    this.setState({ region: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { pseudo, email, region, avatar, user } = this.state;
    const formUpdateData = new FormData();

    formUpdateData.append('pseudo', pseudo);
    formUpdateData.append('email', email);
    formUpdateData.append('region', region);
    formUpdateData.append('avatar', avatar);

    let id = user._id;

    apiHandler
      .handleEditUser(id, formUpdateData)
      .then((response) => {
        this.setState({ user: response });
        this.handleDisplayForm();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { pseudo, email, region, avatar, user, formVisibile } = this.state;

    if (user === null) {
      return <div>Fetching your infos...</div>;
    }
    return (
      <div>
        <NavMain />
        <div className='user-container'>
          <UserDetail user={user} />
          <button className='display-btn' onClick={this.handleDisplayForm}>
            Update your infos
          </button>
          {formVisibile && (
            <div>
              <EditUser
                // props //
                pseudo={pseudo}
                email={email}
                region={region}
                avatar={avatar}
                // functions //
                handleImage={this.handleImage}
                handleChange={this.handleChange}
                handleSelect={this.handleSelect}
                handleSubmit={this.handleSubmit}
              />
            </div>
          )}
          <PokemonsTeam team={user.pokeTeam} />
          <FavoritesPokemons favorites={user.pokeFav} />
        </div>
      </div>
    );
  }
}

export default Profile;
