import React from "react";
import NavMain from "../components/NavMain";
import Footer from "../components/Footer";

class Home extends React.Component {
  render() {
    return (
      <div>
        <NavMain />
      <div className="home-page">
        <h1>Home Page ∆</h1>
      </div>
        <Footer />
      </div>
    );
  }
}

export default Home;
