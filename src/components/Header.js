import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ history }) {
  const { location: { pathname } } = history;
  const [searching, setSearching] = useState(false);

  const searchBarRender = (clicked) => {
    if (clicked === true) {
      return <SearchBar history={ history } />;
    } return null;
  };

  const handleClickToSearch = () => {
    if (searching === false) setSearching(true);
    else setSearching(false);
  };

  switch (pathname) {
  case '/meals':
    return (
      <section>
        <h1 data-testid="page-title">Meals</h1>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />
        </Link>
        <button data-testid="buttonSearch" type="button" onClick={ handleClickToSearch }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search Icon"
          />
        </button>
        { searchBarRender(searching) }
      </section>
    );
  case '/drinks':
    return (
      <section>
        <h1 data-testid="page-title">Drinks</h1>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />
        </Link>
        <button data-testid="buttonSearch" type="button" onClick={ handleClickToSearch }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search Icon"
          />
        </button>
        { searchBarRender(searching) }
      </section>
    );
  case '/profile':
    return (
      <section>
        <h1 data-testid="page-title">Profile</h1>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />
        </Link>
      </section>
    );
  case '/done-recipes':
    return (
      <section>
        <h1 data-testid="page-title">Done Recipes</h1>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />
        </Link>
      </section>
    );
  case '/favorite-recipes':
    return (
      <section>
        <h1 data-testid="page-title">Favorite Recipes</h1>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="Profile Icon"
          />
        </Link>
      </section>
    );
  default: return null;
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape().isRequired,
  }).isRequired,
};

export default Header;
