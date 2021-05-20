// import React from 'react'

// // function PokemonDetail(props) {
// //     console.log("PROPS DETAIL", props)
// //     return (
// //         <div>
            
// //         </div>
// //     )
// // }

// export default PokemonDetail;

import React from "react";
import axios from "axios";
// import apiHandler from "../api/apiHandler";
// import { withUser } from "../components/Auth/withUser";
import { withRouter } from "react-router-dom";


class PokemonDetail extends React.Component {
  state = {
    pokemon: null,
  };

  componentDidMount() {
    let id = this.props.match.params.id;
    axios
      .get(process.env.REACT_APP_BACKEND_URL + `/api/pokemons/${id}`)
      .then((response) => {
          
        this.setState({ pokemon: response });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() 
 
  {
    if (this.state.pokemon === null) {
      return <div>Loading...</div>;
    }
    console.log("FROM ONEPIECE this.state.artwork :", this.state.pokemon.data);
    return (
      <div >
          
        <div >
          <img
            src={this.state.pokemon.data.sprites.front_default}
            alt={this.state.pokemon.data.name}
          />
          <h2 className="single-pokemon">{this.state.pokemon.name}</h2>
          
          {/* <p className="single-page-description">
            {this.state.artwork.description}
          </p>
          <p className="single-page-description">
            Dimensions: width {this.state.artwork.dimensions[1]} cm, height{" "}
            {this.state.artwork.dimensions[0]} cm
          </p>
          <p className="single-page-description">
            {this.state.artwork.price} €
          </p> */}


          
        </div>
      </div>
    );
  }
}
export default withRouter(PokemonDetail);
