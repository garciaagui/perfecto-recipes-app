import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import smallLogotipo from '../images/logotipo-small-black.jpg';
import '../styles/header.css';

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
      <header>
        <img src={ smallLogotipo } alt="small-logotipo" className="small" />
        <h1 data-testid="page-title">Meals</h1>
        <section className="container-header-btns">
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile Icon"
              className="brightness"
            />
          </Link>
          <button
            data-testid="buttonSearch"
            type="button"
            onClick={ handleClickToSearch }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search Icon"
            />
          </button>
        </section>
        { searchBarRender(searching) }
      </header>
    );
  case '/drinks':
    return (
      <header>
        <img src={ smallLogotipo } alt="small-logotipo" className="small" />
        <h1 data-testid="page-title">Drinks</h1>
        <section className="container-header-btns">
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile Icon"
            />
          </Link>
          <button
            data-testid="buttonSearch"
            type="button"
            onClick={ handleClickToSearch }
          >
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search Icon"
            />
          </button>
        </section>
        { searchBarRender(searching) }
      </header>
    );
  case '/profile':
    return (
      <header>
        <h1 data-testid="page-title">Profile</h1>
        <section className="container-header-btns">
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile Icon"
            />
          </Link>
        </section>
      </header>
    );
  case '/done-recipes':
    return (
      <header>
        <h1 data-testid="page-title">Done Recipes</h1>
        <section className="container-header-btns">
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile Icon"
            />
          </Link>
        </section>
      </header>
    );
  case '/favorite-recipes':
    return (
      <header>
        <h1 data-testid="page-title">Favorite Recipes</h1>
        <section className="container-header-btns">
          <Link to="/profile">
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile Icon"
            />
          </Link>
        </section>
      </header>
    );
  default: return null;
  }
}

Header.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Header;
