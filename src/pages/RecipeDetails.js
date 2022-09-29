// import React, { useEffect, useState } from 'react';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mountRecipeDetailsAPI } from '../redux/actions/RecipesDetailsAPI';
import { filterIngredients,
  filterIngredientsQuantity } from '../tests/helpers/filterIngredients';
import { checkDoneRecipes, checkInProgresRecipes } from '../tests/helpers/localStorage';

function RecipeDetails({ history, dispatch, recipeDetails }) {
  // const [ingredients, setIngredients] = useState([]);
  // const [IngredientsQuantity, setIngredientsQuantity] = useState([]);
  // const [toSliceNumbers] = useState({
  //   toSliceNumMeals: 6,
  //   toSliceNumDrinks: 7,
  // });

  const { location: { pathname } } = history;
  // const { toSliceNumMeals, toSliceNumDrinks } = toSliceNumbers;
  const type = (pathname.includes('meals')) ? 'meals' : 'drinks';
  const id = (pathname.includes('meals')) ? 'idMeal' : 'idDrink';
  const str = (pathname.includes('meals')) ? 'strMeal' : 'strDrink';
  const strThumb = (pathname.includes('meals')) ? 'strMealThumb' : 'strDrinkThumb';
  const ingredients = filterIngredients(recipeDetails);
  const ingredientsQuantity = filterIngredientsQuantity(recipeDetails);

  useEffect(() => {
    dispatch(mountRecipeDetailsAPI(pathname));
  }, []);

  function renderIngredientsMap(ingredient, index) {
    return (
      <li
        data-testid={ `${index}-ingredient-name-and-measure` }
        key={ `${index}${ingredient}` }
      >
        {`${ingredient} - ${ingredientsQuantity[index]}`}
      </li>
    );
  }

  return (
    <section>
      <div>
        <h1 data-testid="recipe-title">{recipeDetails[str]}</h1>
        <h3 data-testid="recipe-category">
          {type === 'meals' ? recipeDetails.strCategory : recipeDetails.strAlcoholic}
        </h3>
        <img
          src={ recipeDetails[strThumb] }
          alt={ recipeDetails[str] }
          data-testid="recipe-photo"
        />
        <ul>
          { ingredients
            .map((ingredient, index) => renderIngredientsMap(ingredient, index)) }
        </ul>
        <p data-testid="instructions">
          {recipeDetails.strInstructions}
        </p>
        <video data-testid="video" width="320" height="240" controls>
          <source src={ recipeDetails.strYoutube } type="video/webm" />
          <track
            default
            kind="captions"
            srcLang="en"
            src=""
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      { checkDoneRecipes(recipeDetails[id])
        ? ''
        : (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className="start-recipe-btn"
            onClick={
              () => history
                .push(`${pathname}/in-progress`)
            }
          >
            {checkInProgresRecipes(recipeDetails[id], type)
              ? 'Continue Recipe'
              : 'Start Recipe'}
          </button>
        )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipeDetails: state.renderRecipeDetails.recipeDetails,
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
