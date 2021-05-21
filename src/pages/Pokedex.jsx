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
    electric: false,
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

  handleChange = (event) => {
    this.setState({electric: !this.state.electric});
  }




  handleSearch = (valueFromSearch) => {
    this.setState({ search: valueFromSearch });
  };

  render() {
const  { search } = this.state;
const { pokemons } = this.state;
const { electric } = this.state;
console.log(electric);
if (this.state.pokemons === []) {
  return <div>Loading...</div>;
} 
    return (
    <div>
        <NavMain />
        <FilterSearchBar search={search} electric={electric} handleChange={this.handleChange} handleSearchFn={this.handleSearch}/>
        {pokemons
        .filter((item) =>
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        .map((item, index) => <PokemonsList electric={electric} key={index} pokemons={item}/>)
        }
        
        <Route exact path={"/pokedex/:id"} component={PokemonDetail}/>
        
        

    </div>
    );
  }
}

export default Pokedex;
