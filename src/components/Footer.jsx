import React from 'react';

import pokeballLogo4 from './../styles/images/pokeball-logo-4.png';

const Footer = (props) => {

    const { randomPokemon, handleDisplayMessage } = props;

  return (
    <div className='footer'>
      <div>
        <p>
          See the GitHub repo:
            <a
              href='https://github.com/skiimcdogg/Project-Pokedex-Client'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span> Client</span>
            </a>
        </p>
      </div>

      <div onClick={() => {
        randomPokemon();
        handleDisplayMessage();}} className='pokeball-footer'>
        <img src={pokeballLogo4} alt='logo' />
      </div>

      <div className='portfolios'>
        <p>See our portfolios:</p>
        <ul>
          <li>
            <a
              href='https://www.antoinestouff.fr/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span>Antoine</span>
            </a>
          </li>
          <li>
            <a
              href='https://www.clairesayart.fr/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span>Claire</span>
            </a>
          </li>
          <li>
            <a
              href='https://www.paulinebellaud.fr/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span>Pauline</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
