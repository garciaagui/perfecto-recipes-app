import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function MealsX({ recipes }) {
  const { meals } = recipes;

  const renderInMap = (meal, index) => (
    <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
      <img
        src={ meal.strMealThumb }
        alt={ meal.strMeal }
        data-testid={ `${index}-card-img` }
      />
      <h2 data-testid={ `${index}-card-name` }>{meal.strMeal}</h2>
    </div>
  );

  if (meals === null) {
    global
      .alert('Sorry, we haven\'t found any recipes for these filters.');
  }

  if (meals !== null && recipes !== false && meals.length > 1) {
    const maxLength = 12;
    const recipesLengthValid = meals.length > maxLength;
    return (
      <section>
        { recipesLengthValid
          ? (
            meals.slice(0, maxLength).map((meal, index) => renderInMap(meal, index))
          )
          : (
            meals.map((meal, index) => renderInMap(meal, index))
          ) }
      </section>
    );
  } return null;
}

const mapStateToProps = (state) => ({
  recipes: state.renderRecipes.recipes,
});

MealsX.propTypes = {
  recipes: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(MealsX);
