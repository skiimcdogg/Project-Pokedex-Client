import React from "react";
import NavMain from "../components/NavMain";
import FilterSearchBar from "../components/FilterSearchBar";
import PokemonsList from "../components/Views/PokemonsList";
import PokemonDetail from "../components/Views/PokemonDetail";

class Pokedex extends React.Component {
  state = {
    pokemons: [],
    search: '',
  }

  handleSearch = (valueFromSearch) => {
    this.setState({ search: valueFromSearch });
  };

  render() {
const {search} = this.state;

    return (
    <div>
        <NavMain />
        <FilterSearchBar search={search} handleSearchFn={this.handleSearch}/>
        <PokemonsList />
        <PokemonDetail />

    </div>
    );
  }
}

export default Pokedex;
