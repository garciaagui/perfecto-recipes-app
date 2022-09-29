import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import getCategories from '../redux/actions/getCategories';
import getFirstRecipes from '../redux/actions/getFirstRecipes';
import RecipeCard from '../components/RecipeCard';

function Recipes({ history, dispatch }) {
  const { location: { pathname } } = history;

  useEffect(() => {
    dispatch(getFirstRecipes(pathname));
    dispatch(getCategories(pathname));
  }, [pathname]);

  return (
    <div>
      <Header history={ history } />
      <Categories history={ history } />
      <RecipeCard history={ history } />
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect()(Recipes);
