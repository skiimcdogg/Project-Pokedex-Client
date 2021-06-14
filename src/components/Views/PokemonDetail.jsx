import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import FormFav from '../Forms/FormFav';
import FormTeam from '../Forms/FormTeam';
import apiHandler from '../../api/apiHandler';
import './../../styles/pokemonDetail.css';
import { withUser } from '../Auth/withUser';


class PokemonDetail extends React.Component {
  state = {
    pokemon: null,
    user: null,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    apiHandler
      .getPokemonDetails(id)
      .then((response) => {
        this.setState({ pokemon: response });
        this.props.handleDetailClick();
      })
      .catch((error) => {
        console.log(error);
      });

    apiHandler
      .getUser()
      .then((response) => {
        this.setState({ user: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      let id = this.props.match.params.id;

      apiHandler
        .getPokemonDetails(id)
        .then((response) => {
          this.setState({ pokemon: response });
        })
        .catch((error) => {
          console.log(error);
        });

      apiHandler
        .getUser()
        .then((response) => {
          this.setState({ user: response });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    if (this.state.pokemon === null) {
      return <div>Loading...</div>;
    }

    const { pokemon, user } = this.state;
    const { handleDetailClick } = this.props;
    const { context } = this.props;

    const convertWeight = Number(pokemon.weight) / 10;
    return (
      <div className='pokemon-card'>
        <Link onClick={handleDetailClick} to='/pokedex'>
          <div className='close-card'>
            <p>X</p>
          </div>
        </Link>

        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
        />

        <h2 className='single-pokemon'>{pokemon.name}</h2>

        <div className='pokemon-types'>
          {pokemon.types.map((item, index) => (
            <span key={index}>{item.type.name}</span>
          ))}
        </div>

        <div className='height-weight'>
          <p>
            <b>height:</b> {pokemon.height}0cm
          </p>
          <p>
            <b>weight:</b> {convertWeight}kg
          </p>
        </div>

        <hr />

        <div className='pokemon-stats'>
          <div>
            {pokemon.stats.map((item, index) => (
              <p key={index}>
                <span>{item.stat.name}</span>
              </p>
            ))}
          </div>

          <div>
            {pokemon.stats.map((item, index) => (
              <p key={index}>{item.base_stat}</p>
            ))}
          </div>
        </div>
            { context.isLoggedIn &&
          (<div className='pokemon-btns'>
          <FormFav pokemon={pokemon} />
          <FormTeam pokemon={pokemon} user={user} />
        </div>)
            }
      </div>
    );
  }
}
export default withUser(withRouter(PokemonDetail));
