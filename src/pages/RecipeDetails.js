import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mountRecipeDetailsAPI } from '../redux/actions/RecipesDetailsAPI';
import { filterIngredients,
  filterIngredientsQuantity } from '../tests/helpers/filterIngredients';
import { getfavoriteRecipes, setfavoriteRecipes } from '../tests/helpers/localStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails({ history, dispatch, recipeDetails }) {
  const [ingredients, setIngredients] = useState([]);
  const [IngredientsQuantity, setIngredientsQuantity] = useState([]);
  const [toSliceNumbers] = useState({
    toSliceNumMeals: 6,
    toSliceNumDrinks: 7,
  });
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (!recipeDetails.meals && !recipeDetails.drinks) {
      dispatch(mountRecipeDetailsAPI(history));
    } else {
      setIngredients(filterIngredients(recipeDetails));
      setIngredientsQuantity(filterIngredientsQuantity(recipeDetails));
    }
  }, [recipeDetails]);

  function checkFavorite() {
    const local = getfavoriteRecipes();
    const reitMeals = recipeDetails.meals;
    const reitDrinks = recipeDetails.drinks;
    if (reitMeals !== undefined) {
      const exis = local.some((receita) => receita.id === reitMeals[0].idMeal);
      setIsFavorite(exis);
    } if (reitDrinks !== undefined) {
      const exis = local.some((receita) => receita.id === reitDrinks[0].idDrink);
      setIsFavorite(exis);
    }
  }

  useEffect(() => {
    if (recipeDetails.meals !== undefined) {
      checkFavorite();
    }
    if (recipeDetails.drinks !== undefined) {
      checkFavorite();
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

  function setFavoriteDrinks(item) {
    const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = item[0];
    const drink = {
      id: idDrink,
      type: 'drink',
      nationality: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    const local = getfavoriteRecipes();
    const exist = local.some((receita) => receita.id === drink.id);
    if (exist === false) {
      local.push(drink);
      setfavoriteRecipes(local);
      checkFavorite();
    } else {
      const localFilter = local.filter((iten) => iten.id !== drink.id);
      setfavoriteRecipes(localFilter);
      checkFavorite();
    }
  }

  function setFavoriteMeal(item) {
    const { idMeal, strCategory,
      strMeal, strMealThumb, strArea } = item[0];
    const meal = {
      id: idMeal,
      type: 'drink',
      nationality: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    const local = getfavoriteRecipes();
    const exist = local.some((receita) => receita.id === meal.id);
    if (exist === false) {
      local.push(meal);
      setfavoriteRecipes(local);
      checkFavorite();
    } else {
      const localFilter = local.filter((iten) => iten.id !== meal.id);
      setfavoriteRecipes(localFilter);
      checkFavorite();
    }
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
          <button
            data-testid="favorite-btn"
            type="button"
            onClick={ () => setFavoriteMeal(recipeDetails.meals) }
          >
            <img
              src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              alt="icone favorite"
            />
          </button>
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
        <button
          data-testid="favorite-btn"
          type="button"
          onClick={ () => setFavoriteDrinks(recipeDetails.drinks) }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="icone favorite"
          />
        </button>
      </section>
    );
  }
  return <h1>Carregando...</h1>;
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
