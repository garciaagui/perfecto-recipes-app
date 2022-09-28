import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Meals from '../components/Meals';
import Drinks from '../components/Drinks';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import getCategories from '../redux/actions/getCategories';

function Recipes({ history, dispatch }) {
  const { location: { pathname } } = history;

  useEffect(() => {
    dispatch(getCategories(pathname));
  }, [pathname]);

  const locationValid = pathname === '/meals';

  return (
    <div>
      <Header history={ history } />
      <Categories history={ history } />
      { locationValid ? <Meals history={ history } /> : <Drinks history={ history } /> }
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect()(Recipes);
