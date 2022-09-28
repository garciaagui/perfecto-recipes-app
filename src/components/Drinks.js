import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import useGetFirstRecipes from '../hooks/useGetFirstRecipes';

function Drinks({ recipes, dispatch, history }) {
  const { drinks } = recipes;
  const { location: { pathname } } = history;

  useGetFirstRecipes(dispatch, pathname);

  const renderInMap = (drink, index) => (
    <Link
      to={ `/drinks/${drink.idDrink}` }
      key={ drink.idDrink }
    >
      <div
        data-testid={ `${index}-recipe-card` }
        className="recipe-card"
      >
        <img
          src={ drink.strDrinkThumb }
          alt={ drink.strDrink }
          data-testid={ `${index}-card-img` }
        />
        <h2 data-testid={ `${index}-card-name` }>{drink.strDrink}</h2>
      </div>
    </Link>
  );

  if (drinks === null) {
    global
      .alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  // if (drinks !== null && drinks !== undefined && recipes !== false && drinks.length > 1) {
  if (drinks !== null && drinks !== undefined && recipes !== false) {
    const maxLength = 12;
    const recipesLengthValid = drinks.length > maxLength;
    return (
      <section>
        { recipesLengthValid
          ? (
            drinks.slice(0, maxLength).map((drink, index) => renderInMap(drink, index))
          )
          : (
            drinks.map((drink, index) => renderInMap(drink, index))
          ) }
      </section>
    );
  } return null;
}

const mapStateToProps = (state) => ({
  recipes: state.mainReducer.recipes,
});

Drinks.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape().isRequired,
  recipes: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Drinks);
