import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MealsX from '../components/MealsX';
import Drinks from '../components/Drinks';
import Footer from '../components/Footer';

function Recipes({ history }) {
  const locationValid = history.location.pathname === '/meals';

  return (
    <div>
      <Header history={ history } />
      { locationValid ? <MealsX history={ history } /> : <Drinks history={ history } /> }
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Recipes;
