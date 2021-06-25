import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import NavMain from '../components/NavMain';
import FilterSearchBar from '../components/FilterSearchBar';
import PokemonsList from '../components/Views/PokemonsList';
import PokemonDetail from '../components/Views/PokemonDetail';
import apiHandler from '../api/apiHandler';
import Filters from '../components/Filters';
import InfiniteScroll from "./../components/InfiniteScroll";

const typesChecked = [];

function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState([]);
  const [, setRefreshTypes] = useState(true);
  const [detailClicked, setDetailClicked] = useState(false);
  const [message, setMessage] = useState("Loading...");
  const [src, setSrc] = useState("/images/mew-loading.gif");
  const [sliceValue, setSliceValue] = useState(150);
  const [isFetching, setIsFetching] = InfiniteScroll(fetchMoreListItems);

  const newPokemonArray = pokemons
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

  const filtredArr = Array.from(newPokemonArray.slice(0, sliceValue));
  


  useEffect(() => {
    apiHandler
      .getPokemons()
      .then((response) => {
        setPokemons(response);
      })
      .catch((error) => {
        console.log(error);
        setMessage("Loading failed");
        setSrc("/images/nothing_2.png");
      });   

    apiHandler
      .getTypes()
      .then((response) => {
        setTypes(response)
      })
      .catch((error) => {
        console.log(error);
      });
  },[])
  
  function fetchMoreListItems() {
    setSliceValue(sliceValue + 100);
      setIsFetching(false);
  }

  const handleDetailClick = () => {
    setDetailClicked(!detailClicked)
  };

  const handleSearch = (valueFromSearch) => {
    setSearch(valueFromSearch)
  };

  const handleChangeInput = (event) => {
    const target = event.target;
    if (target.checked) {
      typesChecked.push(target.name);
      setRefreshTypes(e => !e);
    } else {
      const toRemove = typesChecked.indexOf(target.name);
      typesChecked.splice(toRemove, 1);
      setRefreshTypes(e => !e);
    }
  };
 
    return (
      <div>
        <NavMain />
        <div className="flex-filters">
          <div>
            <Filters
              types={types}
              handleChangeInput={handleChangeInput}
              checkedArr={typesChecked}
            />
            {typesChecked.length === 3 && (
              <div className="message-box">
                <p className="message">Please select only two types at once</p>
              </div>
            )}
            {typesChecked.length === 2 &&
              filtredArr.length === 0 && (
                <div className="message-box">
                  <p className="message">No match</p>
                </div>
              )}
          </div>

          <div className="flex-search">
            <FilterSearchBar
              search={search}
              handleSearchFn={handleSearch}
            />
          </div>
        </div>

        {typesChecked.length === 0 && filtredArr.length === 0
        ? <div className="loading-box">
          <img className="loading-img" src={src} alt="loading"/>
          <p>{message}</p>
          </div>
        : <div
          className="scroll pokemons-list"
          style={
            detailClicked
              ? { width: '45%', marginLeft: '5%', overflowY: 'scroll', height: '70vh' }
              : { width: '100%' }
          }>
            {filtredArr.map((item, index) => (
            <PokemonsList key={index} pokemons={item} />
          ))}
          {isFetching && 'Fetching more list items...'}
          {/* <PokemonsList pokemons={newPokemonArray} /> */}
        </div>
        }

        <Route
          exact
          path={'/pokedex/:id'}
          render={(props) => (
            <PokemonDetail
              {...props}
              handleDetailClick={handleDetailClick}
            />
          )}
        />
      </div>
    );
}

export default Pokedex;
