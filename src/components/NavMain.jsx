import React from 'react';
import { NavLink } from 'react-router-dom';

import { withUser } from '../components/Auth/withUser';
import apiHandler from '../api/apiHandler';
import '../styles/NavMain.css';
import pokedexLogo from './../styles/images/pokedex-logo.png';

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <nav className='nav-main'>
      <div className='first-div'>
        <NavLink exact to='/'>
          <h3 className='link-home'>Home</h3>
        </NavLink>
        ||
        <NavLink exact to='/pokedex'>
          <div className='pokeball-logo'>
            <h3 className='link-pokedex'>Pokedex</h3>

            <img src={pokedexLogo} alt='pokedex-logo' />
          </div>
        </NavLink>
      </div>

      <div className='signin-signup'>
        <ul className='nav-list'>
          {context.isLoggedIn && (
            <React.Fragment>
              <li>
                <NavLink to='/profile'>
                  {context.user && (
                    <img
                      className='profile-img'
                      src={context.user.avatar}
                      alt='avatar'
                    />
                  )}
                </NavLink>
              </li>
              <li>
                <p className='logout' onClick={handleLogout}>
                  Logout
                </p>
              </li>
            </React.Fragment>
          )}
          <div className='signin-snippet'>
            {!context.isLoggedIn && (
              <React.Fragment>
                <li>
                  <p className='account'>
                    {' '}
                    <NavLink to='/signin'>Log in</NavLink>{' '}
                  </p>
                </li>
                <b>||</b>
                <li>
                  <NavLink to='/signup'>Create account</NavLink>
                </li>
              </React.Fragment>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default withUser(NavMain);
