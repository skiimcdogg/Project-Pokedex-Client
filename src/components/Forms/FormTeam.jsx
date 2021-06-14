import React from 'react';
import { withRouter } from 'react-router-dom';
import { withUser } from '../Auth/withUser';

import apiHandler from '../../api/apiHandler';

class FormTeam extends React.Component {
state = {
  pokeCount: 0,
  user: null,
}

 typesArray = this.props.pokemon.types.map((item) => item.type.name);
 statsArray = this.props.pokemon.stats.map((item) => item.stat.name);
 baseStatsArray = this.props.pokemon.stats.map((item) => item.base_stat);
 movesArray = this.props.pokemon.moves.map((item) => item.move.name);

  componentDidMount() {
    {  this.props.user &&
      (this.setState({ user: this.props.user,
                    pokeCount: this.props.user.pokeTeam }))}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user !== this.state.user) {
      this.setState({ pokeCount: this.props.user.pokeTeam.length })
    }
  }

  //WHEN USER CLICKS ON SUBMIT SENDS THE DATA TO THE DATABASE THROUGH AXIOS CALL
  handleSubmit = (event) => {
    event.preventDefault();
    const Body = {
      name: this.props.pokemon.name,
      height: this.props.pokemon.height,
      weight: this.props.pokemon.weight,
      image: this.props.pokemon.sprites.front_default,
      types: this.typesArray,
      stats: this.statsArray,
      base_stat: this.baseStatsArray,
      moves: this.movesArray,
    };

    apiHandler
      .handleTeamSubmit(Body)
      .then((response) => {
        //REDIRECT FRONT END
        // props.history.push(`/profile`);
        console.log(response);
        this.setState({ pokeCount: response.pokeTeam.length})
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  };

  render() {
    console.log("POKECOUNT",this.state.pokeCount);
    console.log("USER",this.state.user);

    if (this.props.user === null) {
     return <div>
        Loading...
      </div>
    }

    return (
      <div>
        <React.Fragment>
          {this.state.pokeCount === [] && (
            <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
              <div>
                <button>TEAM</button>
              </div>
            </form>
          )}
          {/* {this.state.pokeCount.lenght < 6 && (
            <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
              <div>
                <button>TEAM</button>
              </div>
            </form>
          )} */}
          {this.state.pokeCount.length === 6 && (
            <p>
              Full Team !
            </p>
          )}
        </React.Fragment>
      </div>
    );
  }
}

export default withRouter(withUser(FormTeam));
