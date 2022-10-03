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
    console.log(receitas);
  }, []);

  function deleteFilters() {
    console.log('xablau');
    const receitas = getFavoriteRecipesLocalStorage();
    dispatch(setRecipesFavorite(receitas));
  }

  function mealFilters() {
    const receitas = getFavoriteRecipesLocalStorage();
    const receitasFilter = receitas.filter((receit) => receit.type === 'meal');
    dispatch(setRecipesFavorite(receitasFilter));
  }

  function drinkFilters() {
    const receitas = getFavoriteRecipesLocalStorage();
    const receitasFilter = receitas.filter((receit) => receit.type === 'drink');
    dispatch(setRecipesFavorite(receitasFilter));
  }

  return (
    <div>
      <Header history={ history } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => deleteFilters() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => mealFilters() }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => drinkFilters() }
      >
        Drinks
      </button>
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
