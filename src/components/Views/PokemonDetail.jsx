import React from "react";
import axios from "axios";
// import apiHandler from "../api/apiHandler";
import { withRouter } from "react-router-dom";


class PokemonDetail extends React.Component {
  state = {
    pokemon: null,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `api/pokemons/${id}`)
      .then((response) => {
          
        this.setState({ pokemon: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState){
    // console.log("I am upodating, look at my beautiful props changing !", this.props.match.params.id, "what do i do with this ?")

    if (prevProps.match.params.id !== this.props.match.params.id){
      let id = this.props.match.params.id;
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `api/pokemons/${id}`)
      .then((response) => {
          
        this.setState({ pokemon: response });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }

  render() 
 
  {
    if (this.state.pokemon === null) {
      return <div>Loading...</div>;
    }
    // console.log("DATA", this.state.pokemon.data.types, this.state.pokemon.data.types[0].type.name);
    return (
      <div >
          
        <div >
          <img
            src={this.state.pokemon.data.sprites.front_default}
            alt={this.state.pokemon.data.name}
          />
          <h2 className="single-pokemon">{this.state.pokemon.name}</h2>
          {this.state.pokemon.data.types.map((item)=> <p key={item.type.name}>{item.type.name}</p>)}
         


          
        </div>
      </div>
    );
  }
}
export default withRouter(PokemonDetail);
