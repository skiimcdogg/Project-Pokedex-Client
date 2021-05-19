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

  componentDidMount() {
    apiHandler
      .getPokemons
      .then((response) => {

        //NOT MUTATING THE STATE DIRECTLY
        this.setState({ pokemons: response.dbRes });
      })
      .catch((error) => {
        console.log(error);
      });
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
        <PokemonsList pokemons={this.state.pokemons}/>
        <PokemonDetail />

    </div>
    );
  }
}

export default Pokedex;
