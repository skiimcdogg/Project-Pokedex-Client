import React from 'react';
import { withRouter } from 'react-router-dom';
import { withUser } from '../Auth/withUser';

import apiHandler from '../../api/apiHandler';

class FormTeam extends React.Component {
  state = {
    user: null,
  };

  typesArray = this.props.pokemon.types.map((item) => item.type.name);
  statsArray = this.props.pokemon.stats.map((item) => item.stat.name);
  baseStatsArray = this.props.pokemon.stats.map((item) => item.base_stat);
  movesArray = this.props.pokemon.moves.map((item) => item.move.name);

  componentDidMount() {
    apiHandler
      .getUser()
      .then((response) => {
        this.setState({ user: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.user !== this.state.user) {
  //     this.setState({ pokeCount: this.props.user.pokeTeam.length });
  //   }
  // }

  //Vous avez le droit d’appeler setState() directement dans componentDidUpdate() mais notez bien que vous devez l’enrober dans une condition, comme dans l’exemple ci-dessus, 
  //ou vous obtiendrez l’équivalent d’une boucle infinie. Là aussi, vous déclencherez un rendu supplémentaire qui, même s’il n’est pas perceptible par l’utilisateur, 
  //peut affecter la performance du composant. Si vous essayez de « refléter » dans l’état local une prop venant de plus haut, voyez si vous ne pouvez pas plutôt utiliser
  // directement la prop. Vous pouvez en apprendre davantage sur les raisons pour lesquelles copier des props dans l’état local est source de bugs.

  // setState() ne met pas toujours immédiatement le composant à jour.
  //  Il peut regrouper les mises à jour voire les différer. En conséquence, 
  //  lire la valeur de this.state juste après avoir appelé setState() est une mauvaise idée.
 // Utilisez plutôt componentDidUpdate ou la fonction de rappel de 
 // setState (setState(updater, callback)), les deux bénéficiant d’une garantie
 //  de déclenchement après que la mise à jour aura été appliquée. 
 //  Si vous avez besoin de mettre à jour l’état sur base de sa valeur précédente, 
 //  lisez plus bas comment fonctionne l’argument updater.

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
        this.setState({ user: response });
      })
      .catch((error) => {
        console.log('ERROR', error);
      });
  };

  render() {
    
    if (this.state.user === null) {
      return <div>Loading...</div>;
    }
    
    console.log('USER', this.state.user.pokeTeam);
    return (
      <div>
        <React.Fragment>
          {this.state.user.pokeTeam.length < 6 && (
            <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
              <div>
                <button>TEAM</button>
              </div>
            </form>
          )}
          {this.state.user.pokeTeam.length >= 6 && <p>Full Team !</p>}
        </React.Fragment>
      </div>
    );
  }
}

export default withRouter(withUser(FormTeam));
