import React, { Component } from "react";
import "../styles/filters.css";

class Filters extends Component {
  state = {
    typesChecked: [],
  };
  handleChange = (event) => {
    this.props.handleChangeInput(event);
  };
  render() {
    // console.log("props venant de pokedex", this.props.types.results);
    if (this.props.types.results === undefined) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <p>Select two types to filter pokemons</p>
        <div className="filter-box">
        {this.props.types.results.map((type) => {
          return (
            <div className="filter" key={type.name}>
              <label htmlFor={type.name}><img src={`/images/${type.name}.png`} alt={`${type.name}`}/></label>
              <input
                id={type.name}
                type="checkbox"
                name={type.name}
                onChange={this.handleChange}
              />
            </div>
          )
        })}
        </div>
      </div>
    )
  }
}

export default Filters;
