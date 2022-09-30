import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getFavoriteRecipesLocalStorage } from '../helpers/localStorage';
import FavoriteCard from '../components/FavoriteCard';
import setRecipesFavorite from '../redux/actions/favoriteRecipes';

function FavoriteRecipes({ history, favoriteRecipes, dispatch }) {
  useEffect(() => {
    const receitas = getFavoriteRecipesLocalStorage();
    dispatch(setRecipesFavorite(receitas));
  }, []);
  console.log(favoriteRecipes);
  return (
    <div>
      <Header history={ history } />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {favoriteRecipes.length > 0
        ? favoriteRecipes.map((recipe, index) => (
          <FavoriteCard
            key={ index }
            recipe={ recipe }
            index={ index }
          />
        ))
        : <p>opa! não temos receitas</p>}
    </div>
  );
}

FavoriteRecipes.propTypes = {
  favoriteRecipes: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func,
  }),
  history: PropTypes.any.isRequired,
}.isRequired;

const mapStateToProps = (state) => ({
  favoriteRecipes: state.recipeFavorite.favoriteRecipes,
});

export default connect(mapStateToProps)(FavoriteRecipes);
