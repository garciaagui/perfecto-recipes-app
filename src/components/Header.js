import React from 'react';
import PropTypes from 'prop-types';

function Header({ history }) {
  const { location: { pathname } } = history;
  switch (pathname) {
  case '/meals':
    return (
      <section>
        <h1 data-testid="page-title">Meals</h1>
        <img
          data-testid="profile-top-btn"
          src="src/images/profileIcon.svg"
          alt="Profile Icon"
        />
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
        <img
          data-testid="profile-top-btn"
          src="src/images/profileIcon.svg"
          alt="Profile Icon"
        />
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
        <img
          data-testid="profile-top-btn"
          src="src/images/profileIcon.svg"
          alt="Profile Icon"
        />
      </section>
    );
  case '/done-recipes':
    return (
      <section>
        <h1 data-testid="page-title">Done Recipes</h1>
        <img
          data-testid="profile-top-btn"
          src="src/images/profileIcon.svg"
          alt="Profile Icon"
        />
      </section>
    );
  case '/favorite-recipes':
    return (
      <section>
        <h1 data-testid="page-title">Favorite Recipes</h1>
        <img
          data-testid="profile-top-btn"
          src="src/images/profileIcon.svg"
          alt="Profile Icon"
        />
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
