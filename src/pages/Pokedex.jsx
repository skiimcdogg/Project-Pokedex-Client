import React from 'react';
import { Route } from 'react-router-dom';

import NavMain from '../components/NavMain';
import FilterSearchBar from '../components/FilterSearchBar';
import PokemonsList from '../components/Views/PokemonsList';
import PokemonDetail from '../components/Views/PokemonDetail';
import apiHandler from '../api/apiHandler';
import Filters from '../components/Filters';

class Pokedex extends React.Component {
  state = {
    pokemons: [],
    search: '',
    types: [],
    typesChecked: [],
    detailClicked: false,
  };

  componentDidMount() {
    apiHandler
      .getPokemons()
      .then((response) => {
        this.setState({ pokemons: response });
      })
      .catch((error) => {
        console.log(error);
      });

    apiHandler
      .getTypes()
      .then((response) => {
        this.setState({ types: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDetailClick = () => {
    this.setState({ detailClicked: !this.state.detailClicked });
  };

  handleSearch = (valueFromSearch) => {
    this.setState({ search: valueFromSearch });
  };

  handleChangeInput = (event) => {
    const { typesChecked } = this.state;
    const target = event.target;
    if (target.checked) {
      const array = typesChecked;
      array.push(target.name);
      this.setState({ typesChecked: array });
    } else {
      const array = typesChecked;
      const toRemove = array.indexOf(target.name);
      array.splice(toRemove, 1);
      this.setState({ typesChecked: array });
    }
  };

  render() {
    const { search, pokemons, types, typesChecked } = this.state;

    let newPokemonArray = pokemons
      .filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      )
      .filter((item) =>
        item.types.length === 2 &&
        typesChecked.length === 2 &&
        !item.types[0].type.name.includes(typesChecked[0])
          ? item.types[0].type.name.includes(typesChecked[1]) &&
            item.types[1].type.name.includes(typesChecked[0])
          : item.types.length === 2 && typesChecked.length === 2
          ? item.types[0].type.name.includes(typesChecked[0]) &&
            item.types[1].type.name.includes(typesChecked[1])
          : item.types.length === 2 && typesChecked.length === 1
          ? item.types[0].type.name.includes(typesChecked) ||
            item.types[1].type.name.includes(typesChecked)
          : item.types[0].type.name.includes(typesChecked)
      );

    if (this.state.pokemons === []) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <NavMain />
        <div className="flex-filters">
          <div>
            <Filters
              types={types}
              handleChangeInput={this.handleChangeInput}
              checkedArr={typesChecked}
            />
            {this.state.typesChecked.length === 3 && (
              <div className="message-box">
                <p className="message">Please select only two types at once</p>
              </div>
            )}
            {this.state.typesChecked.length === 2 &&
              newPokemonArray.length === 0 && (
                <div className="message-box">
                  <p className="message">No match</p>
                </div>
              )}
          </div>

          <div className="flex-search">
            <FilterSearchBar
              search={search}
              handleSearchFn={this.handleSearch}
            />
          </div>
        </div>
        <div
          className="pokemons-list"
          style={
            this.state.detailClicked
              ? { width: '45%', marginLeft: '5%', overflowY: 'scroll' }
              : { width: '100%' }
          }
        >
          {newPokemonArray.map((item, index) => (
            <PokemonsList key={index} pokemons={item} />
          ))}
        </div>

        <Route
          exact
          path={'/pokedex/:id'}
          render={(props) => (
            <PokemonDetail
              {...props}
              handleDetailClick={this.handleDetailClick}
            />
          )}
        />
      </div>
    );
  }
}

export default Pokedex;
