import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Carousel from '../components/Carousel';
import BtnFavorite from '../components/BtnFavorite';
import getRecipeDetails from '../redux/actions/getRecipeDetails';
import getRecommendedRecipes from '../redux/actions/getRecommendedRecipes';
import { checkDoneRecipesLocalStorage,
  checkInProgressRecipesLocalStorage } from '../helpers/localStorage';
import ButtonShare from '../components/ButtonShare';
import '../styles/recipedetails.css';

function RecipeDetails({ history, dispatch,
  recipeDetails, ingredientsList, ingredientsQuantity }) {
  const { location: { pathname } } = history;
  const { idReceita } = useParams();

  const type = (pathname.includes('meals')) ? 'meals' : 'drinks';
  const id = (pathname.includes('meals')) ? 'idMeal' : 'idDrink';
  const str = (pathname.includes('meals')) ? 'strMeal' : 'strDrink';
  const strThumb = (pathname.includes('meals')) ? 'strMealThumb' : 'strDrinkThumb';
  const buttonType = (pathname.includes('meals')) ? 'meal' : 'drink';

  useEffect(() => {
    dispatch(getRecipeDetails(pathname, idReceita));
    dispatch(getRecommendedRecipes(pathname));
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
    <section className="main-container-details">
      {/* <div> */}
      <h2>Recipe Details</h2>
      <h1 data-testid="recipe-title">{recipeDetails[str]}</h1>
      <h4 data-testid="recipe-category">
        {type === 'meals'
          ? `Category: ${recipeDetails.strCategory}` : recipeDetails.strAlcoholic}
      </h4>
      <img
        src={ recipeDetails[strThumb] }
        alt={ recipeDetails[str] }
        data-testid="recipe-photo"
      />
      <h3>Ingredients</h3>
      <ul>
        { ingredientsList
          .map((ingredient, index) => renderIngredientsMap(ingredient, index)) }
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions">
        {recipeDetails.strInstructions}
      </p>
      { type === 'meals'
        ? (
      // <video data-testid="video" width="320" height="240" controls>
      //   <source src={ recipeDetails.strYoutube } type="video/webm" />
      //   <track default kind="captions" srcLang="en" src="" />
      //   Your browser does not support the video tag.
      // </video>
          <iframe
            title={ `${recipeDetails[str]} video` }
            data-testid="video"
            src={ recipeDetails.strYoutube
                && recipeDetails.strYoutube.replace('watch?v=', 'embed/') }
          />
        )
        : null}
      {/* </div> */}
      <h3>Recommendations</h3>
      <Carousel history={ history } />
      <div className="useful-btns">
        <BtnFavorite history={ history } />
        <ButtonShare
          history={ history }
          dataTestId="share-btn"
          type={ buttonType }
          id={ idReceita }
        />
      </div>
      { checkDoneRecipesLocalStorage(recipeDetails[id])
        ? null
        : (
          <button
            data-testid="start-recipe-btn"
            type="button"
            className={ checkInProgressRecipesLocalStorage(recipeDetails[id], type)
              ? 'start-recipe-btn btn btn-warning'
              : 'start-recipe-btn btn btn-success' }
            onClick={
              () => history
                .push(`${pathname}/in-progress`)
            }
          >
            {checkInProgressRecipesLocalStorage(recipeDetails[id], type)
              ? 'Continue Recipe'
              : 'Start Recipe'}
          </button>
        )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  recipeDetails: state.detailsReducer.recipeDetails,
  ingredientsList: state.detailsReducer.ingredientsList,
  ingredientsQuantity: state.detailsReducer.ingredientsQuantity,
});

RecipeDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    push: PropTypes.func.isRequired,
  }).isRequired,
  recipeDetails: PropTypes.shape().isRequired,
  ingredientsList: PropTypes
    .arrayOf(PropTypes.string.isRequired).isRequired,
  ingredientsQuantity: PropTypes
    .arrayOf(PropTypes.string.isRequired).isRequired,
};

export default connect(mapStateToProps)(RecipeDetails);
