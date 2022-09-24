import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Recipes({ history }) {
  return (
    <div>
      Recipes
      <Header history={ history } />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Recipes;
