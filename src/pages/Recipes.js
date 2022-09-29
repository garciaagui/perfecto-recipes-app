import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
// import Meals from '../components/Meals';
// import Drinks from '../components/Drinks';
import Footer from '../components/Footer';
import Categories from '../components/Categories';
import getCategories from '../redux/actions/getCategories';
import useGetFirstRecipes from '../hooks/useGetFirstRecipes';
import RecipeCard from '../components/RecipeCard';

function Recipes({ history, dispatch }) {
  const { location: { pathname } } = history;

  useGetFirstRecipes(dispatch, pathname);

  useEffect(() => {
    dispatch(getCategories(pathname));
  }, [pathname]);

  // const locationValid = pathname === '/meals';

  return (
    <div>
      <Header history={ history } />
      <Categories history={ history } />
      <RecipeCard history={ history } />
      {/* { locationValid ? <Meals history={ history } /> : <Drinks history={ history } /> } */}
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
};

export default connect()(Recipes);
