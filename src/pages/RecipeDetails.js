import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mountRecipeDetailsAPI } from '../redux/actions/RecipesDetailsAPI';
import { filterIngredients,
  filterIngredientsQuantity } from '../tests/helpers/filterIngredients';

function RecipeDetails({ history, dispatch, recipeDetails }) {
  const [ingredients, setIngredients] = useState([]);
  const [IngredientsQuantity, setIngredientsQuantity] = useState([]);
  const [toSliceNumbers] = useState({
    toSliceNumMeals: 6,
    toSliceNumDrinks: 7,
  });
  useEffect(() => {
    if (!recipeDetails.meals && !recipeDetails.drinks) {
      dispatch(mountRecipeDetailsAPI(history));
    } else {
      setIngredients(filterIngredients(recipeDetails));
      setIngredientsQuantity(filterIngredientsQuantity(recipeDetails));
    }
  }, [recipeDetails]);

  const { location: { pathname } } = history;
  const { toSliceNumMeals, toSliceNumDrinks } = toSliceNumbers;

  function renderIngredientsMap(ingredient, index) {
    return (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ `${index}${ingredient}` }
      >
        {`${ingredient} - ${IngredientsQuantity[index]}`}
      </li>
    );
  }

  if (pathname.slice(1, toSliceNumMeals) === 'meals' && recipeDetails.meals) {
    return (
      <section>
        { recipeDetails.meals.map((meal) => (
          <div key={ meal.idDrink }>
            <div>
              <h1 data-testid="recipe-title">{meal.strMeal}</h1>
              <h3 data-testid="recipe-category">{meal.strCategory}</h3>
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid="recipe-photo"
              />
              <ul>
                { ingredients
                  .map((ingredient, index) => renderIngredientsMap(ingredient, index)) }
              </ul>
              <p data-testid="instructions">
                {meal.strInstructions}
              </p>
              <div>
                <video data-testid="video" width="320" height="240" controls>
                  <source src={ meal.strYoutube } type="video/webm" />
                  <track
                    default
                    kind="captions"
                    srcLang="en"
                    src=""
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )) }
        <div>
          <button data-testid="share-btn" type="button">Share</button>
          <button data-testid="favorite-btn" type="button">Favorite</button>
        </div>
      </section>
    );
  }

  if (pathname.slice(1, toSliceNumDrinks) === 'drinks' && recipeDetails.drinks) {
    return (
      <section>
        { recipeDetails.drinks.map((drink) => (
          <div key={ drink.idDrink }>
            <div>
              <h1 data-testid="recipe-title">{drink.strDrink}</h1>
              <h3 data-testid="recipe-category">{drink.strAlcoholic}</h3>
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid="recipe-photo"
              />
              <ul>
                { ingredients
                  .map((ingredient, index) => renderIngredientsMap(ingredient, index)) }
              </ul>
              <p data-testid="instructions">
                {drink.strInstructions}
              </p>
            </div>
          </div>
        )) }
        <button data-testid="share-btn" type="button">Share</button>
        <button data-testid="favorite-btn" type="button">Favorite</button>
      </section>
    );
  }
  return <h1>Carregando..</h1>;
}

const mapStateToProps = (state) => ({
  recipeDetails: state.renderRecipeDetails.recipeDetail,
});

RecipeDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape().isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  recipeDetails: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(RecipeDetails);
