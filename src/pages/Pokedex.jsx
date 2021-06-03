import React from "react";
import NavMain from "../components/NavMain";
import FilterSearchBar from "../components/FilterSearchBar";
import PokemonsList from "../components/Views/PokemonsList";
import PokemonDetail from "../components/Views/PokemonDetail";
import apiHandler from "../api/apiHandler";
import { Route } from "react-router-dom";
import Filters from "../components/Filters";

class Pokedex extends React.Component {
  state = {
    pokemons: [],
    search: "",
    types: [],
    typesChecked: [],
    detailClicked: false,
  };

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

  handleDetailClick = () => {
    this.setState({ detailClicked: !this.state.detailClicked });
  };

  handleSearch = (valueFromSearch) => {
    this.setState({ search: valueFromSearch });
  };

  handleChangeInput = (event) => {
    const target = event.target;
    if (target.checked) {
      // console.log("SALUT BÉBÉ");
      const array = this.state.typesChecked;
      array.push(target.name);
      // console.log(array);
      this.setState({ typesChecked: array });
    } else {
      // console.log("BYE LE GROS");
      const array = this.state.typesChecked;
      const toRemove = array.indexOf(target.name);
      array.splice(toRemove, 1);
      // console.log(array);
      this.setState({ typesChecked: array });
    }
  };

  render() {
    console.log("state detail clicked", this.state.detailClicked);
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
              <p className="message">Please select only two types at once</p>
            )}
            {newPokemonArray.length === 0 && (
              <p className="message">No match</p>
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
            this.state.detailClicked ? { width: "30%", marginLeft:"10%" } : { width: "100%" }
          }
        >
          {newPokemonArray.map((item, index) => (
            <PokemonsList key={index} pokemons={item} />
          ))}
        </div>

        {/* <Route exact path={"/pokedex/:id"} component={PokemonDetail} /> */}

        <Route
          exact
          path={"/pokedex/:id"}
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
