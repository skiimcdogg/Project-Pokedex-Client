import React from "react";
import NavMain from "../components/NavMain";
import FilterSearchBar from "../components/FilterSearchBar";
import PokemonsList from "../components/Views/PokemonsList";
import PokemonDetail from "../components/Views/PokemonDetail";
import apiHandler from "../api/apiHandler";
import { Switch, Route } from "react-router-dom";
// import axios from "axios";

class Pokedex extends React.Component {
  state = {
    pokemons:[],
    search:'',
  }

  componentDidMount() {
    apiHandler
      .getPokemons()
      .then((response) => {

        //NOT MUTATING THE STATE DIRECTLY
        // console.log("RESPONSE DB",response)
        this.setState({ pokemons: response });
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
if (this.state.pokemons === []) {
  return <div>Loading...</div>;
} 
    return (
    <div>
        <NavMain />
        <FilterSearchBar search={search} handleSearchFn={this.handleSearch}/>
        <PokemonsList pokemons={this.state.pokemons}/>
        <Route exact path={"/pokedex/:id"} component={PokemonDetail}/>
        
        

    </div>
    );
  }
}

export default Pokedex;
