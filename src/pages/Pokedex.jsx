import React from "react";
import NavMain from "../components/NavMain";
import FilterSearchBar from "../components/FilterSearchBar";
import PokemonsList from "../components/Views/PokemonsList";
import PokemonDetail from "../components/Views/PokemonDetail";
import apiHandler from "../api/apiHandler";
import { Switch, Route } from "react-router-dom";
import Filters from "../components/Filters";
// import axios from "axios";

class Pokedex extends React.Component {
  state = {
    pokemons:[],
    search:'',
    electric: false,
    types:[],
    typesChecked: []
  }

  componentDidMount() {
    apiHandler
      .getPokemons()
      .then((response) => {
        // console.log("RESPONSE DB",response)
        this.setState({ pokemons: response });
      })
      .catch((error) => {
        console.log(error);
      });

      apiHandler
      .getTypes()
      .then((response) => {
        // console.log("TYPES",response)
        this.setState({ types: response });
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

  handleChangeInput = (event) => {
    const target = event.target
    if(target.checked) {
      console.log("SALUT BÉBÉ")
      const array = this.state.typesChecked;
      array.push(target.name);
      console.log(array)
      this.setState({typesChecked: array})
    }
    else {
      console.log("BYE LE GROS")
      const array = this.state.typesChecked;
      const toRemove = array.indexOf(target.name);
      array.splice(toRemove, 1);
      console.log(array)
      this.setState({typesChecked: array})
    }
  }


  render() {
const  { search } = this.state;
const { pokemons } = this.state;
const { electric } = this.state;
const  { types } = this.state;
const { typesChecked } = this.state;
// console.log(electric);
if (this.state.pokemons === []) {
  return <div>Loading...</div>;
} 
    return (
    <div>
        <NavMain />
        <Filters types={types} handleChangeInput={this.handleChangeInput}/>
        <FilterSearchBar search={search} electric={electric} handleChange={this.handleChange} handleSearchFn={this.handleSearch}/>
        {pokemons
        .filter((item) => {
          item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())

          let typeNames =[]
          for (let i=0;i<item.types.length;i++){
           typeNames.push(item.types[i].type.name)
           console.log(typeNames)
          }
        
          typeNames.includes(typesChecked)
          
        }
        
        )
        .map((item, index) => <PokemonsList electric={electric} key={index} pokemons={item}/>)
        }

{/* {pokemons
        .filter((item) => 
        item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) && item.types[0].type.name.includes(typesChecked))
        .map((item, index) => <PokemonsList electric={electric} key={index} pokemons={item}/>)
        } */}
        
        <Route exact path={"/pokedex/:id"} component={PokemonDetail}/>
        
        

    </div>
    );
  }
}

export default Pokedex;
