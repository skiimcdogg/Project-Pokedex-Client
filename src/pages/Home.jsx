import React from "react";
import NavMain from "../components/NavMain";
import Footer from "../components/Footer";
import PokemonRandom from "../components/Views/PokemonRandom"


class Home extends React.Component {
  render() {
    return (
      <div>
        <NavMain />
      <div className="home-page">
      <div className="random-container">
      <PokemonRandom />
        </div>
       
       </div> 
        <Footer />
      </div>
    );
  }
}

export default Home;
