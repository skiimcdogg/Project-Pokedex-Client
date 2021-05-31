import React from "react";
import { Switch, Route } from "react-router-dom";
// import NavMain from "./components/NavMain";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
// import PokemonDetail from "./components/Views/PokemonDetail";
import Pokedex from "./pages/Pokedex"
import "./styles/pokedex.css"

function App() {
  return (
    <div className="App">
      {/* <Home /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/pokedex" component={Pokedex} />
        {/* <Route exact path={"/pokedex/:id"} component={PokemonDetail}/> */}
        <ProtectedRoute exact path="/profile" component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
