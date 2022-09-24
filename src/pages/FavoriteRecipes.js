import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function FavoriteRecipes({ history }) {
  return (
    <div>
      FavoriteRecipes
      <Header history={ history } />
    </div>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default (FavoriteRecipes);
