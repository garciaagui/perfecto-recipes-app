import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mountRecipeDetailsAPI } from '../redux/actions/RecipesDetailsAPI';
import { filterIngredients,
  filterIngredientsQuantity } from '../tests/helpers/filterIngredients';
import { getfavoriteRecipes, setfavoriteRecipes,
  checkDoneRecipes, checkInProgresRecipes } from '../tests/helpers/localStorage';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import getRecommendedRecipes from '../redux/actions/getRecommendedRecipes';
import Carousel from '../components/Carousel';

function RecipeDetails({ history, dispatch, recipeDetails }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { location: { pathname } } = history;
  const type = (pathname.includes('meals')) ? 'meals' : 'drinks';
  const id = (pathname.includes('meals')) ? 'idMeal' : 'idDrink';
  const str = (pathname.includes('meals')) ? 'strMeal' : 'strDrink';
  const strThumb = (pathname.includes('meals')) ? 'strMealThumb' : 'strDrinkThumb';
  const ingredients = filterIngredients(recipeDetails);
  const ingredientsQuantity = filterIngredientsQuantity(recipeDetails);

  useEffect(() => {
    dispatch(mountRecipeDetailsAPI(pathname));
    dispatch(getRecommendedRecipes(pathname));
  }, []);

  function checkFavorite() {
    const local = getfavoriteRecipes();
    if (recipeDetails) {
      const exis = local.some((receita) => receita.id === recipeDetails[id]);
      setIsFavorite(exis);
    }
  }

  function setFavoriteDrinks(item) {
    const { idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb } = item;
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
      strMeal, strMealThumb, strArea } = item;
    const meal = {
      id: idMeal,
      type: 'meal',
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

  useEffect(() => {
    if (recipeDetails) {
      checkFavorite();
    }
  }, [checkFavorite, recipeDetails]);

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
          style={ { height: '360px', width: '360px' } }
        />
        <ul>
          { ingredients
            .map((ingredient, index) => renderIngredientsMap(ingredient, index)) }
        </ul>
        <p data-testid="instructions">
          {recipeDetails.strInstructions}
        </p>
        { type === 'meals'
          ? (
            <video data-testid="video" width="320" height="240" controls>
              <source src={ recipeDetails.strYoutube } type="video/webm" />
              <track default kind="captions" srcLang="en" src="" />
              Your browser does not support the video tag.
            </video>
          )
          : null}
      </div>
      <Carousel history={ history } />
      <div className="useful-btns">
        <button data-testid="share-btn" type="button">Share</button>
        <button
          alt="icone favorite"
          type="button"
          onClick={ () => {
            if (type === 'meals') setFavoriteMeal(recipeDetails);
            else setFavoriteDrinks(recipeDetails);
          } }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            data-testid="favorite-btn"
            alt="icone favorite"
          />
        </button>
      </div>
      { checkDoneRecipes(recipeDetails[id])
        ? null
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
