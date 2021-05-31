import React, { Component } from "react";

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
        {this.props.types.results.map((type) => {
          return (
            <div style={{display: "flex"}} key={type.name}>
              <label><img src={`/images/${type.name}.png`} alt={`${type.name}`}/></label>
              <input
                type="checkbox"
                name={type.name}
                onChange={this.handleChange}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Filters;
