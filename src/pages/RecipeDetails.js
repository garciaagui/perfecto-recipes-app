import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card } from 'react-bootstrap';
import { mountRecipeDetailsAPI } from '../redux/actions/RecipesDetailsAPI';
import { filterIngredients,
  filterIngredientsQuantity } from '../tests/helpers/filterIngredients';
import getRecommendedRecipes from '../redux/actions/getRecommendedRecipes';

function RecipeDetails({ history, dispatch, recipeDetails, recommendedRecipes }) {
  const [ingredients, setIngredients] = useState([]);
  const [IngredientsQuantity, setIngredientsQuantity] = useState([]);
  const [toSliceNumbers] = useState({
    toSliceNumMeals: 6,
    toSliceNumDrinks: 7,
    toSliceRecommendedRecipes: 6,
  });
  useEffect(() => {
    if (!recipeDetails.meals && !recipeDetails.drinks) {
      dispatch(mountRecipeDetailsAPI(history));
      dispatch(getRecommendedRecipes(history));
    } else {
      setIngredients(filterIngredients(recipeDetails));
      setIngredientsQuantity(filterIngredientsQuantity(recipeDetails));
    }
  }, [recipeDetails]);

  const { location: { pathname } } = history;
  const { toSliceNumMeals, toSliceNumDrinks, toSliceRecommendedRecipes } = toSliceNumbers;

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

  if (pathname.slice(1, toSliceNumMeals) === 'meals' && recipeDetails.meals
  && recommendedRecipes.drinks) {
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
                style={ {
                  height: '360px',
                  width: '360px',
                } }
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
          <div
            style={ {
              height: '225px',
              width: '360px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              alignItems: 'stretch',
              flexWrap: 'nowrap',
              overflowX: 'scroll',
            } }
          >
            { recommendedRecipes.drinks.slice(0, toSliceRecommendedRecipes)
              .map((drink, index) => (
                <Card
                  key={ drink.idDrink }
                  data-testid={ `${index}-recommendation-card` }
                  style={ {
                    minWidth: '190px',
                  } }
                >
                  <Card.Img
                    variant="top"
                    src={ drink.strDrinkThumb }
                    style={ {
                      width: 'auto',
                    } }
                  />
                  <Card.Title
                    data-testid={ `${index}-recommendation-title` }
                    style={ {
                      width: 'auto',
                    } }
                  >
                    { drink.strDrink }
                  </Card.Title>
                </Card>
              )) }
          </div>
          <button data-testid="share-btn" type="button">Share</button>
          <button data-testid="favorite-btn" type="button">Favorite</button>
        </div>
      </section>
    );
  }

  if (pathname.slice(1, toSliceNumDrinks) === 'drinks' && recipeDetails.drinks
  && recommendedRecipes.meals) {
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
                style={ {
                  height: '360px',
                  width: '360px',
                } }
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
        <div
          style={ {
            height: '225px',
            width: '360px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            alignItems: 'stretch',
            flexWrap: 'nowrap',
            overflowX: 'scroll',
          } }
        >
          { recommendedRecipes.meals.slice(0, toSliceRecommendedRecipes)
            .map((meal, index) => (
              <Card
                key={ meal.idMeal }
                data-testid={ `${index}-recommendation-card` }
                style={ {
                  minWidth: '190px',
                } }
              >
                <Card.Img
                  variant="top"
                  src={ meal.strMealThumb }
                  style={ {
                    width: 'auto',
                  } }
                />
                <Card.Title
                  data-testid={ `${index}-recommendation-title` }
                  style={ {
                    width: 'auto',
                  } }
                >
                  { meal.strMeal }
                </Card.Title>
              </Card>
            )) }
        </div>
        <button data-testid="share-btn" type="button">Share</button>
        <button data-testid="favorite-btn" type="button">Favorite</button>
      </section>
    );
  }
  return <h1>Carregando...</h1>;
}

const mapStateToProps = (state) => ({
  recipeDetails: state.renderRecipeDetails.recipeDetail,
  recommendedRecipes: state.mainReducer.recommendedRecipes,
});

RecipeDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape().isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  recipeDetails: PropTypes.shape().isRequired,
  recommendedRecipes: PropTypes.shape().isRequired,
};

export default connect(mapStateToProps)(RecipeDetails);
