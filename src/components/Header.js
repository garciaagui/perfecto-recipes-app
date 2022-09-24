import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ history }) {
  const { location: { pathname } } = history;
  switch (pathname) {
  case '/meals':
    return (
      <section>
        <h1 data-testid="page-title">Meals</h1>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src="src/images/profileIcon.svg"
            alt="Profile Icon"
          />
        </Link>
        <img
          data-testid="search-top-btn"
          src="src/images/searchIcon.svg"
          alt="search Icon"
        />
      </section>
    );
  case '/drinks':
    return (
      <section>
        <h1 data-testid="page-title">Drinks</h1>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src="src/images/profileIcon.svg"
            alt="Profile Icon"
          />
        </Link>
        <img
          data-testid="search-top-btn"
          src="src/images/searchIcon.svg"
          alt="search Icon"
        />
      </section>
    );
  case '/profile':
    return (
      <section>
        <h1 data-testid="page-title">Profile</h1>
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src="src/images/profileIcon.svg"
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
            src="src/images/profileIcon.svg"
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
            src="src/images/profileIcon.svg"
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
