import React from "react";
import NavMain from "../components/NavMain";
import FilterSearchBar from "../components/FilterSearchBar";
import PokemonsList from "../components/Views/PokemonsList";
import PokemonDetail from "../components/Views/PokemonDetail";

class Pokedex extends React.Component {
  render() {
    return (
    <div>
        <NavMain />
        <FilterSearchBar />
        <PokemonsList />
        <PokemonDetail />

    </div>
    );
  }
}

export default Pokedex;
