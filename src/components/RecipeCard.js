import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import useGetFirstRecipes from '../hooks/useGetFirstRecipes';

// function RecipeCard({ recipes, dispatch, history }) {
function RecipeCard({ recipes, history }) {
  const { location: { pathname } } = history;
  const id = (pathname === '/meals') ? 'idMeal' : 'idDrink';
  const str = (pathname === '/meals') ? 'strMeal' : 'strDrink';
  const strThumb = (pathname === '/meals') ? 'strMealThumb' : 'strDrinkThumb';

  // useGetFirstRecipes(dispatch, pathname);

  return (
    <section>
      {recipes.length
        // ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
        && recipes.map((recipe, index) => (
          <Link
            to={ `${pathname}/${recipe[id]}` }
            key={ recipe[id] }
          >
            <div
              data-testid={ `${index}-recipe-card` }
              className="recipe-card"
            >
              <img
                src={ recipe[strThumb] }
                alt={ recipe[str] }
                data-testid={ `${index}-card-img` }
              />
              <h2 data-testid={ `${index}-card-name` }>{recipe[str]}</h2>
            </div>
          </Link>

        ))}
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipes: state.mainReducer.recipes,
});

RecipeCard.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  recipes: PropTypes.arrayOf(PropTypes.shape().isRequired).isRequired,
};

export default connect(mapStateToProps)(RecipeCard);
