import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { getFavoriteRecipesLocalStorage } from '../helpers/localStorage';
import FavoriteCard from '../components/FavoriteCard';
import setRecipesFavorite from '../redux/actions/favoriteRecipes';
import '../styles/favoritesrecipes.css';

function FavoriteRecipes({ history, favoriteRecipes, dispatch }) {
  useEffect(() => {
    const receitas = getFavoriteRecipesLocalStorage();
    dispatch(setRecipesFavorite(receitas));
  }, []);

  function deleteFilters() {
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
    <section>
      <Header history={ history } />
      <section className="main-container-favorites">
        <section className="container-btns">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            className="btn btn-outline-secondary"
            onClick={ () => deleteFilters() }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-meal-btn"
            className="btn btn-outline-secondary"
            onClick={ () => mealFilters() }
          >
            Meals
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            className="btn btn-outline-secondary"
            onClick={ () => drinkFilters() }
          >
            Drinks
          </button>
        </section>
        {favoriteRecipes.length > 0
          ? favoriteRecipes.map((recipe, index) => (
            <FavoriteCard
              key={ index }
              recipe={ recipe }
              index={ index }
              history={ history }
            />
          ))
          : <span>No favorite recipes found</span>}
      </section>
    </section>
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
